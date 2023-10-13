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
import { isReview } from '../../external/OrgSchema/Review';
import { isEntryPoint } from '../../external/OrgSchema/EntryPoint';
import { isRating } from '../../external/OrgSchema/Rating';
import { isPropertyValueSpecification } from '../../external/OrgSchema/PropertyValueSpecification';

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
        // This is based from https://schema.org/docs/actions.html.
        const { resultReview, target } = reviewAction;

        // TODO: We could port validations to TypeScript-based validations.
        if (!target) {
          throw new Error('reviewAction.target must be set.');
        } else if (!(isEntryPoint(target, reviewAction['@context']) || target instanceof URL)) {
          throw new Error('reviewAction.target must be URL or of type "EntryPoint".');
        }

        let url: URL;

        if (target instanceof URL) {
          url = target;
        } else {
          if (!target.urlTemplate) {
            throw new Error(
              'When reviewAction.target is of type "EntryPoint", reviewAction.target.urlTemplate must be set.'
            );
          } else if (!isReview(resultReview, reviewAction['@context'])) {
            throw new Error(
              'When reviewAction.target is of type "EntryPoint", reviewAction.resultReview must be of type "Review".'
            );
          } else if (!isRating(resultReview.reviewRating, resultReview['@context'] || reviewAction['@context'])) {
            throw new Error(
              'When reviewAction.target is of type "EntryPoint", reviewAction.resultReview.reviewRating must be of type "Rating".'
            );
          }

          const ratingValueInput = resultReview?.reviewRating?.['ratingValue-input'];
          const urlTemplateInputs: Map<string, boolean | number | null | string> = new Map();

          if (ratingValueInput) {
            if (
              !isPropertyValueSpecification(
                ratingValueInput,
                resultReview.reviewRating['@context'] || resultReview['@context'] || reviewAction['@context']
              )
            ) {
              throw new Error(
                `When reviewAction.target is of type "EntryPoint", reviewAction.resultReview.reviewRating['ratingValue-input'] must be of type "Rating".`
              );
            }

            // TODO: We should expand this to support many `*-input`.
            ratingValueInput?.valueName && urlTemplateInputs.set(ratingValueInput.valueName, ratingRef.current || null);
          }

          url = new URL(parseTemplate(target.urlTemplate).expand(Object.fromEntries(urlTemplateInputs.entries())));
        }

        // TODO: We could potentially move this into a common utility and add support of REST API via https: protocol.
        if (url) {
          const { protocol, searchParams } = url;

          if (protocol === 'ms-directline-imback:') {
            const titleOrValue = searchParams.get('title') || searchParams.get('value');

            if (!titleOrValue) {
              throw new Error('When using "ms-directline-imback:" protocol, parameter "title" or "value" to be set.');
            }

            sendMessage(titleOrValue);
          } else if (protocol === 'ms-directline-messageback:') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let value: any;

            if (searchParams.has('value')) {
              const rawValue = searchParams.get('value') as string;

              try {
                value = JSON.parse(rawValue);
              } catch (error) {
                console.warn(
                  'botframework-webchat: When using "ms-directline-messageback:" protocol, parameter "value" should be complex type or omitted.'
                );

                value = rawValue;
              }
            }

            sendMessageBack(value, searchParams.get('text') || undefined, searchParams.get('displayText') || undefined);
          } else if (protocol === 'ms-directline-postback:') {
            const value = searchParams.get('value');

            sendPostBack(
              value &&
                // This is not conform to Bot Framework Direct Line specification.
                // However, this is what PVA is currently using.
                searchParams.get('valuetype') === 'application/json'
                ? JSON.parse(value)
                : value
            );
          } else {
            throw new Error(`reviewAction.target is using an unsupported protocol "${protocol}".`);
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
