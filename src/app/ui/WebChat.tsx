import './WebChat.css';

import { css } from '@emotion/css';
import { Components, createStore, hooks } from 'botframework-webchat';
import { memo, useEffect, useMemo, useState } from 'react';

import createDirectLineEmulator from '../createDirectLineEmulator';
import customerSatisfactoryMiddleware, {
  forScreenReader as customerSatisfactoryForScreenReaderMiddleware
} from './CustomerSatisfactory/customerSatisfactoryMiddleware';

const { BasicWebChat, Composer } = Components;
const { useStyleOptions } = hooks;

type Props = Readonly<{ activities: readonly unknown[] }>;

const _Chat = memo(function () {
  const [{ accent, markdownExternalLinkIconImage }] = useStyleOptions();

  const className = useMemo(
    () =>
      css({
        '--pva__accent-color': accent,
        '--pva__external-link-icon': markdownExternalLinkIconImage,
        '--pva__semantic-colors__link': accent
      }),
    [accent]
  );

  return <BasicWebChat className={className} />;
});

export default memo(function Chat({ activities }: Props) {
  const [ready, setReady] = useState(false);
  const store = useMemo(
    () =>
      // @ts-expect-error 7016
      createStore({}, () => next => action => {
        if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
          setReady(true);
        }

        return next(action);
      }),
    [setReady]
  );

  const { directLine } = useMemo(() => createDirectLineEmulator({ store }), [store]);

  useEffect(() => {
    activities && ready && activities.forEach(activity => directLine.emulateIncomingActivity(activity));
  }, [activities, directLine, ready]);

  useEffect(() => {
    const abortController = new AbortController();

    (async function () {
      const { signal } = abortController;

      for (; !signal.aborted; ) {
        const { resolveAll } = await directLine.actPostActivity(() => {});

        if (signal.aborted) {
          break;
        }

        const echoBackActivity = await resolveAll();

        console.log(echoBackActivity);

        await directLine.emulateIncomingActivity({
          ...(activities[activities.length - 1] || {}),
          replyToID: echoBackActivity.id
        });
      }
    })();

    return () => abortController.abort();
  }, [directLine]);

  const overrideLocalizedStrings = {
    CSAT_RATING_FEW_ALT: '$1 stars',
    '_CSAT_RATING_FEW_ALT.comment':
      'This is for customer satisfactory UI which shows 5 stars for rating. $1 is the number of stars. This is for plural rule of "few".',

    CSAT_RATING_MANY_ALT: '$1 stars',
    '_CSAT_RATING_MANY_ALT.comment':
      'This is for customer satisfactory UI which shows 5 stars for rating. $1 is the number of stars. This is for plural rule of "many".',

    CSAT_RATING_ONE_ALT: '$1 star',
    '_CSAT_RATING_ONE_ALT.comment':
      'This is for customer satisfactory UI which shows 5 stars for rating. $1 is the number of stars. This is for plural rule of "one".',

    CSAT_RATING_OTHER_ALT: '$1 stars',
    '_CSAT_RATING_OTHER_ALT.comment':
      'This is for customer satisfactory UI which shows 5 stars for rating. $1 is the number of stars. This is for plural rule of "other".',

    CSAT_RATING_TWO_ALT: '$1 stars',
    '_CSAT_RATING_TWO_ALT.comment':
      'This is for customer satisfactory UI which shows 5 stars for rating. $1 is the number of stars. This is for plural rule of "two".',

    CSAT_SUBMIT_BUTTON_TEXT: 'Submit',
    CSAT_SUBMITTED_TEXT: 'Submitted'
  };

  return (
    <div className="chat">
      <Composer
        attachmentMiddleware={customerSatisfactoryMiddleware}
        attachmentForScreenReaderMiddleware={customerSatisfactoryForScreenReaderMiddleware}
        directLine={directLine}
        overrideLocalizedStrings={overrideLocalizedStrings}
        store={store}
      >
        <_Chat />
      </Composer>
    </div>
  );
});
