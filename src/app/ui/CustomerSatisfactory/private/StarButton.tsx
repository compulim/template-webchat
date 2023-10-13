import { ReactEventHandler, useCallback } from 'react';
import { useRefFrom } from 'use-ref-from';
import classNames from 'classnames';

import Star from './Star';
import StarFilled from './StarFilled';
import useItemRef from '../../providers/RovingTabIndex/useItemRef';
import useStrings from './useStrings';

type Props = {
  checked?: boolean | undefined;
  className?: boolean | undefined;
  disabled?: boolean | undefined;
  onClick?: (index: 1 | 2 | 3 | 4 | 5) => void;
  rating: 1 | 2 | 3 | 4 | 5;
};

const StarButton = ({ checked, className, disabled, onClick, rating }: Props) => {
  const { getRatingAltText } = useStrings();
  const disabledRef = useRefFrom(disabled);
  const onClickRef = useRefFrom(onClick);
  const ratingRef = useRefFrom(rating);
  const ref = useItemRef<HTMLButtonElement>(rating - 1);

  const handleClickAndFocus = useCallback<ReactEventHandler>(
    event => {
      event.preventDefault();

      disabledRef.current || onClickRef.current?.(ratingRef.current);
    },
    [disabledRef, onClickRef, ratingRef]
  );

  return (
    <button
      aria-disabled={disabled}
      aria-label={getRatingAltText(rating)}
      aria-checked={checked}
      className={classNames(className, 'webchat__customer-satisfactory__star-button')}
      onClick={handleClickAndFocus}
      onFocus={handleClickAndFocus}
      ref={ref}
      role="radio"
      tabIndex={disabled ? -1 : undefined}
      type="button"
    >
      {checked ? <StarFilled /> : <Star />}
    </button>
  );
};

export default StarButton;
