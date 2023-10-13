import { hooks as apiHooks } from 'botframework-webchat-api';
import { hooks as componentHooks } from 'botframework-webchat-component';
import { parseTemplate } from 'url-template';
import { type FormEventHandler, Fragment, useCallback, useState } from 'react';
import { useRefFrom } from 'use-ref-from';
import { useStateWithRef } from 'use-state-with-ref';
import classNames from 'classnames';

import CustomerSatisfactoryStyle from './CustomerSatisfactoryStyle';
import RovingTabIndexComposer from '../providers/RovingTabIndex/RovingTabIndexComposer';
import StarBar from './private/StarBar';
import useUniqueId from './private/useUniqueId';
import Checkmark from './private/Checkmark';

const { useFocus, useSendMessage, useSendMessageBack, useSendPostBack } = componentHooks;
const { useLocalizer } = apiHooks;

declare global {
  interface URLSearchParams {
    entries(): Iterable<[string, string]>;
  }
}

// TODO: Add Schema.org.
type Props = {
  reviewAction: {
    '@context': 'https://schema.org';
    '@type': 'ReviewAction';
    actionStatus: 'PotentialActionStatus';
    description: string;
    target?: {
      '@type': 'EntryPoint';
      actionPlatform: 'https://directline.botframework.com';
      contentType: 'application/json';
      urlTemplate: string;
    };
    resultReview: {
      '@type': 'Review';
      reviewRating: {
        '@type': 'Rating';
        'ratingValue-input': {
          '@type': 'PropertyValueSpecification';
          valueName: 'rate';
          valueRequired: true;
        };
      };
    };
  };
};

const CustomerSatisfactory = ({ reviewAction }: Props) => {
  const [rating, setRating, ratingRef] = useStateWithRef<1 | 2 | 3 | 4 | 5 | undefined>(undefined);
  const [submitted, setSubmitted] = useState(false);
  const focus = useFocus();
  const labelId = useUniqueId('webchat__customer-satisfactory');
  const localize = useLocalizer();
  const sendMessage = useSendMessage();
  const sendMessageBack = useSendMessageBack();
  const sendPostBack = useSendPostBack();

  // TODO: We should use HTML Form Validation.
  const submitDisabled = typeof rating !== 'number' || submitted;

  const disabledRef = useRefFrom(submitDisabled);

  const handleSubmit = useCallback<FormEventHandler>(
    event => {
      event.preventDefault();

      if (disabledRef.current) {
        return;
      }

      try {
        // https://schema.org/docs/actions.html
        const { resultReview, target } = reviewAction;

        const ratingValueInput = resultReview?.reviewRating?.['ratingValue-input'];
        const inputs: Map<string, boolean | number | null | string> = new Map();

        ratingValueInput?.valueName && inputs.set(ratingValueInput.valueName, ratingRef.current || null);

        if (target) {
          const { protocol, searchParams } = new URL(
            parseTemplate(target.urlTemplate).expand(Object.fromEntries(inputs.entries()))
          );

          if (protocol === 'ms-directline-imback:') {
            const text = searchParams.get('text');

            text && sendMessage(text);
          } else if (protocol === 'ms-directline-messageback:') {
            const value = searchParams.has('value') && JSON.parse(searchParams.get('value') || '{}');

            sendMessageBack(value, searchParams.get('text') || undefined, searchParams.get('displayText') || undefined);
          } else if (protocol === 'ms-directline-postback:') {
            const value = searchParams.get('value');

            if (value) {
              // This is not conform to Bot Framework Direct Line specification.
              // However, this is what PVA is currently using.
              sendPostBack(target.contentType === 'application/json' ? JSON.parse(value) : value);
            }
          }
        }
      } catch (error) {
        console.error('botframework-webchat: Failed to send review action.', { error });
      }

      setSubmitted(true);
      focus('sendBox');
    },
    [disabledRef, setSubmitted]
  );

  return (
    <form
      className={classNames(
        'webchat__customer-satisfactory',
        { 'webchat__customer-satisfactory--submitted': submitted },
        CustomerSatisfactoryStyle
      )}
      onSubmit={handleSubmit}
    >
      <div aria-labelledby={labelId} className="webchat__customer-satisfactory__radio-group" role="radiogroup">
        <p className="webchat__customer-satisfactory__label" id={labelId}>
          {reviewAction.description}
        </p>
        <RovingTabIndexComposer>
          <StarBar disabled={submitted} onChange={setRating} rating={rating} />
        </RovingTabIndexComposer>
      </div>
      <button
        aria-disabled={submitDisabled}
        className="webchat__customer-satisfactory__submit-button"
        tabIndex={submitDisabled ? -1 : undefined}
        type="submit"
      >
        <span className="webchat__customer-satisfactory__submit-button-text">
          {submitted ? (
            <Fragment>
              <Checkmark />
              {localize('CSAT_SUBMITTED_TEXT')}
            </Fragment>
          ) : (
            localize('CSAT_SUBMIT_BUTTON_TEXT')
          )}
        </span>
      </button>
    </form>
  );
};

export default CustomerSatisfactory;
