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

        await directLine.emulateIncomingActivity({
          ...(activities[activities.length - 1] || {}),
          replyToID: echoBackActivity.id
        });
      }
    })();

    return () => abortController.abort();
  }, [directLine]);

  return (
    <div className="chat">
      <Composer
        attachmentMiddleware={customerSatisfactoryMiddleware}
        attachmentForScreenReaderMiddleware={customerSatisfactoryForScreenReaderMiddleware}
        directLine={directLine}
        store={store}
      >
        <_Chat />
      </Composer>
    </div>
  );
});
