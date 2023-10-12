import { useCallback } from 'react';
import { useRefFrom } from 'use-ref-from';
import classNames from 'classnames';

import Star from './Star';
import StarFilled from './StarFilled';
import useItemRef from '../../providers/RovingTabIndex/useItemRef';

type Props = {
  className?: boolean | undefined;
  disabled?: boolean | undefined;
  onClick?: (index: 1 | 2 | 3 | 4 | 5) => void;
  pressed?: boolean | undefined;
  rating: 1 | 2 | 3 | 4 | 5;
};

const StarButton = ({ className, disabled, onClick, pressed, rating }: Props) => {
  const onClickRef = useRefFrom(onClick);
  const ratingRef = useRefFrom(rating);
  const ref = useItemRef<HTMLButtonElement>(rating - 1);

  const handleClick = useCallback(() => onClickRef.current?.(ratingRef.current), [onClickRef, ratingRef]);

  return (
    <button
      aria-disabled={disabled}
      aria-label={`${rating} stars`}
      aria-pressed={pressed}
      className={classNames(className, 'webchat__customer-satisfactory__star-button')}
      disabled={disabled}
      onClick={disabled ? undefined : handleClick}
      ref={ref}
      tabIndex={disabled ? -1 : undefined}
      type="button"
    >
      {pressed ? <StarFilled /> : <Star />}
    </button>
  );
};

export default StarButton;
