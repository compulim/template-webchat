import { parseTemplate } from 'url-template';
import { type FormEventHandler, Fragment, useCallback, useState } from 'react';
import { useStateWithRef } from 'use-state-with-ref';
import classNames from 'classnames';

import CustomerSatisfactoryStyle from './CustomerSatisfactoryStyle';
import RovingTabIndexComposer from '../providers/RovingTabIndex/RovingTabIndexComposer';
import StarBar from './private/StarBar';
import useUniqueId from './private/useUniqueId';
import Checkmark from './private/Checkmark';
import { useRefFrom } from 'use-ref-from';

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
    result: {
      '@type': 'Review';
      reviewRating: {
        'ratingValue-input': 'required';
      };
    };
  };
};

const CustomerSatisfactory = ({ reviewAction }: Props) => {
  const [rating, setRating, ratingRef] = useStateWithRef<1 | 2 | 3 | 4 | 5 | undefined>(undefined);
  const [submitted, setSubmitted] = useState(false);
  const labelId = useUniqueId('webchat__customer-satisfactory');

  // TODO: We should use HTML Form Validation.
  const submitDisabled = typeof rating !== 'number' || submitted;

  const disabledRef = useRefFrom(submitDisabled);

  const handleSubmit = useCallback<FormEventHandler>(
    event => {
      event.preventDefault();

      if (disabledRef.current) {
        return;
      }

      const { result, target } = reviewAction;
      const reviewResult = result && {
        ...result,
        reviewRating: {
          ...result.reviewRating,
          ratingValue: ratingRef.current as number,
          'ratingValue-input': undefined
        }
      };

      if (reviewResult && target) {
        const url = new URL(parseTemplate(target.urlTemplate).expand({ reviewRating: ratingRef.current as number }));

        if (url.protocol === 'ms-direct-line-postback:') {
          const json = Object.fromEntries(Array.from(new URL(url).searchParams.entries()));

          console.log('SUBMIT!', { json, url });
        }
      }

      setSubmitted(true);
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
      onSubmit={submitted ? undefined : handleSubmit}
    >
      <p className="webchat__customer-satisfactory__body" id={labelId}>
        {reviewAction.description}
      </p>
      <RovingTabIndexComposer>
        <StarBar aria-labelledby={labelId} disabled={submitted} onChange={setRating} rating={rating} />
      </RovingTabIndexComposer>
      <button
        aria-disabled={submitDisabled}
        className="webchat__customer-satisfactory__submit-button"
        tabIndex={submitDisabled ? -1 : undefined}
        type="submit"
      >
        {submitted ? (
          <Fragment>
            <Checkmark />
            Submitted
          </Fragment>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
};

export default CustomerSatisfactory;
