import { hooks } from 'botframework-webchat-component';
import { parseTemplate } from 'url-template';
import { type FormEventHandler, Fragment, useCallback, useState } from 'react';
import { useRefFrom } from 'use-ref-from';
import { useStateWithRef } from 'use-state-with-ref';
import classNames from 'classnames';

import { ActionStatusType } from '../../external/OrgSchema/ActionStatusType';
import { type ReviewAction } from '../../external/OrgSchema/ReviewAction';
import Checkmark from './private/Checkmark';
import CustomerSatisfactoryStyle from './CustomerSatisfactoryStyle';
import RovingTabIndexComposer from '../providers/RovingTabIndex/RovingTabIndexComposer';
import StarBar from './private/StarBar';
import useStrings from './private/useStrings';
import useUniqueId from './private/useUniqueId';

const { useFocus, useSendMessage, useSendMessageBack, useSendPostBack } = hooks;

declare global {
  interface URLSearchParams {
    entries(): Iterable<[string, string]>;
  }
}

type Props = {
  initialReviewAction: ReviewAction;
};

const CustomerSatisfactory = ({ initialReviewAction }: Props) => {
  const [rating, setRating, ratingRef] = useStateWithRef<1 | 2 | 3 | 4 | 5 | undefined>(undefined);
  const [reviewAction, setReviewAction] = useState<ReviewAction>(initialReviewAction);
  const { submitButtonText, submittedText } = useStrings();
  const focus = useFocus();
  const labelId = useUniqueId('webchat__customer-satisfactory');
  const sendMessage = useSendMessage();
  const sendMessageBack = useSendMessageBack();
  const sendPostBack = useSendPostBack();

  const submitted = reviewAction.actionStatus === ActionStatusType.CompletedActionStatus;
  const markAsSubmitted = useCallback(
    () => setReviewAction({ ...reviewAction, actionStatus: ActionStatusType.CompletedActionStatus }),
    [setReviewAction]
  );

  const submissionDisabled = typeof rating !== 'number' || submitted;

  const submissionDisabledRef = useRefFrom(submissionDisabled);

  const handleSubmit = useCallback<FormEventHandler>(
    event => {
      event.preventDefault();

      if (submissionDisabledRef.current) {
        return;
      }

      try {
        // https://schema.org/docs/actions.html
        const { resultReview, target } = reviewAction;

        const ratingValueInput = resultReview?.reviewRating?.['ratingValue-input'];
        const inputs: Map<string, boolean | number | null | string> = new Map();

        // TODO: We should expand this to support many `*-input`.
        ratingValueInput?.valueName && inputs.set(ratingValueInput.valueName, ratingRef.current || null);

        if (target) {
          const url =
            target instanceof URL
              ? target
              : target.urlTemplate &&
                new URL(parseTemplate(target.urlTemplate).expand(Object.fromEntries(inputs.entries())));

          // TODO: We could potentially move this into a common utility and add support of REST API via https: protocol.
          if (url) {
            const { protocol, searchParams } = url;
            if (protocol === 'ms-directline-imback:') {
              const text = searchParams.get('text');

              text && sendMessage(text);
            } else if (protocol === 'ms-directline-messageback:') {
              const value = searchParams.has('value') && JSON.parse(searchParams.get('value') || '{}');

              sendMessageBack(
                value,
                searchParams.get('text') || undefined,
                searchParams.get('displayText') || undefined
              );
            } else if (protocol === 'ms-directline-postback:') {
              const value = searchParams.get('value');

              value &&
                sendPostBack(
                  // This is not conform to Bot Framework Direct Line specification.
                  // However, this is what PVA is currently using.
                  searchParams.get('type') === 'application/json' ? JSON.parse(value) : value
                );
            }
          }
        }
      } catch (error) {
        console.error('botframework-webchat: Failed to send review action.', { error });
      }

      markAsSubmitted();
      focus('sendBox');
    },
    [markAsSubmitted, submissionDisabledRef]
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
          {initialReviewAction.description}
        </p>
        <RovingTabIndexComposer>
          <StarBar disabled={submitted} onChange={setRating} rating={rating} />
        </RovingTabIndexComposer>
      </div>
      <button
        aria-disabled={submissionDisabled}
        className="webchat__customer-satisfactory__submit-button"
        tabIndex={submissionDisabled ? -1 : undefined}
        type="submit"
      >
        <span className="webchat__customer-satisfactory__submit-button-text">
          {submitted ? (
            <Fragment>
              <Checkmark />
              {submittedText}
            </Fragment>
          ) : (
            submitButtonText
          )}
        </span>
      </button>
    </form>
  );
};

export default CustomerSatisfactory;
