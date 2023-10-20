import { useCallback } from 'react';
import { useRefFrom } from 'use-ref-from';
import classNames from 'classnames';

import StarButton from './StarButton';

type Props = {
  className?: string | undefined;
  disabled?: boolean | undefined;
  onChange?: (value: 1 | 2 | 3 | 4 | 5) => void;
  rating?: 1 | 2 | 3 | 4 | 5 | undefined;
  titles?: [string, string, string, string, string] | undefined;
};

const StarBar = ({ className, disabled, onChange, rating, titles }: Props) => {
  const onChangeRef = useRefFrom(onChange);

  const handleStarButtonClick = useCallback(
    (rating: 1 | 2 | 3 | 4 | 5) => onChangeRef.current?.(rating),
    [onChangeRef]
  );

  return (
    <div className={classNames(className, 'webchat__customer-satisfactory__star-bar')}>
      <StarButton
        checked={rating && rating >= 1}
        disabled={disabled}
        onClick={handleStarButtonClick}
        rating={1}
        title={titles?.[0]}
      />
      <StarButton
        checked={rating && rating >= 2}
        disabled={disabled}
        onClick={handleStarButtonClick}
        rating={2}
        title={titles?.[1]}
      />
      <StarButton
        checked={rating && rating >= 3}
        disabled={disabled}
        onClick={handleStarButtonClick}
        rating={3}
        title={titles?.[2]}
      />
      <StarButton
        checked={rating && rating >= 4}
        disabled={disabled}
        onClick={handleStarButtonClick}
        rating={4}
        title={titles?.[3]}
      />
      <StarButton
        checked={rating && rating >= 5}
        disabled={disabled}
        onClick={handleStarButtonClick}
        rating={5}
        title={titles?.[4]}
      />
      <div className="webchat__customer-satisfactory__rating-value">{rating}</div>
    </div>
  );
};

export default StarBar;
