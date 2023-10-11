import { useCallback } from 'react';
import { useRefFrom } from 'use-ref-from';
import classNames from 'classnames';

import StarButton from './StarButton';

type Props = {
  'aria-labelledby'?: string;
  className?: string | undefined;
  disabled?: boolean | undefined;
  onChange?: (value: 1 | 2 | 3 | 4 | 5) => void;
  rating?: 1 | 2 | 3 | 4 | 5 | undefined;
};

const StarBar = ({ 'aria-labelledby': ariaLabelledBy, className, disabled, onChange, rating }: Props) => {
  const onChangeRef = useRefFrom(onChange);

  const handleStarButtonClick = useCallback(
    (rating: 1 | 2 | 3 | 4 | 5) => onChangeRef.current?.(rating),
    [onChangeRef]
  );

  return (
    <div
      aria-labelledby={ariaLabelledBy}
      aria-valuemin={1}
      aria-valuemax={5}
      aria-valuenow={rating}
      aria-valuetext={rating && `${rating} stars`}
      className={classNames(className, 'webchat__customer-satisfactory__star-bar')}
      role="meter"
    >
      <StarButton disabled={disabled} onClick={handleStarButtonClick} pressed={rating && rating >= 1} rating={1} />
      <StarButton disabled={disabled} onClick={handleStarButtonClick} pressed={rating && rating >= 2} rating={2} />
      <StarButton disabled={disabled} onClick={handleStarButtonClick} pressed={rating && rating >= 3} rating={3} />
      <StarButton disabled={disabled} onClick={handleStarButtonClick} pressed={rating && rating >= 4} rating={4} />
      <StarButton disabled={disabled} onClick={handleStarButtonClick} pressed={rating && rating >= 5} rating={5} />
      <div className="webchat__customer-satisfactory__rating-value">{rating}</div>
    </div>
  );
};

export default StarBar;
