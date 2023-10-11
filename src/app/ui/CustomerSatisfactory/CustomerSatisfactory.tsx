import classNames from 'classnames';

import { type FormEventHandler, Fragment, useCallback, useState } from 'react';
import CustomerSatisfactoryStyle from './CustomerSatisfactoryStyle';
import RovingTabIndexComposer from '../providers/RovingTabIndex/RovingTabIndexComposer';
import StarBar from './private/StarBar';
import useUniqueId from './private/useUniqueId';
import Checkmark from './private/Checkmark';

const CustomerSatisfactory = () => {
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5 | undefined>(undefined);
  const [submitted, setSubmitted] = useState(false);
  const labelId = useUniqueId('webchat__customer-satisfactory');

  // TODO: We should use HTML Form Validation.
  const canSubmit = typeof rating === 'number' && !submitted;

  const handleSubmit = useCallback<FormEventHandler>(
    event => {
      event.preventDefault();

      console.log('SUBMIT!');

      setSubmitted(true);
    },
    [setSubmitted]
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
        Great! Please rate your experience.
      </p>
      <RovingTabIndexComposer>
        <StarBar aria-labelledby={labelId} disabled={submitted} onChange={setRating} rating={rating} />
      </RovingTabIndexComposer>
      <button
        className="webchat__customer-satisfactory__submit-button"
        disabled={!canSubmit}
        tabIndex={submitted ? -1 : undefined}
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
