import { hooks } from 'botframework-webchat-component';
import { parseTemplate } from 'url-template';
import { type FormEventHandler, Fragment, useCallback, useState } from 'react';
import { useRefFrom } from 'use-ref-from';
import { useStateWithRef } from 'use-state-with-ref';
import classNames from 'classnames';

import { ActionStatusType } from '../../external/OrgSchema/ActionStatusType';
import { isEntryPoint } from '../../external/OrgSchema/EntryPoint';
import { isPropertyValueSpecification } from '../../external/OrgSchema/PropertyValueSpecification';
import { isRating } from '../../external/OrgSchema/Rating';
import { isReview } from '../../external/OrgSchema/Review';
import { type ReviewAction } from '../../external/OrgSchema/ReviewAction';
import Checkmark from './private/Checkmark';
import CustomerSatisfactoryStyle from './CustomerSatisfactoryStyle';
import RovingTabIndexComposer from '../providers/RovingTabIndex/RovingTabIndexComposer';
import StarBar from './private/StarBar';
import useOpenURL from '../../hooks/useOpenURL';
import useStrings from './private/useStrings';
import useUniqueId from './private/useUniqueId';

const { useFocus } = hooks;

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
  const openURL = useOpenURL();

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
        } else if (!(isEntryPoint(target, reviewAction['@context']) || typeof target === 'string')) {
          throw new Error('reviewAction.target must be URL or of type "EntryPoint".');
        }

        let url: URL;

        if (typeof target === 'string') {
          url = new URL(target);
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

        url && openURL(url);
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
          <StarBar
            disabled={submitted}
            onChange={setRating}
            rating={rating}
            titles={initialReviewAction.resultReview?.reviewRating?.description}
          />
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
