import { hooks } from 'botframework-webchat-api';
import { ReactEventHandler, useCallback } from 'react';
import { useRefFrom } from 'use-ref-from';
import classNames from 'classnames';

import Star from './Star';
import StarFilled from './StarFilled';
import useItemRef from '../../providers/RovingTabIndex/useItemRef';

const { useLocalizer } = hooks;

type Props = {
  checked?: boolean | undefined;
  className?: boolean | undefined;
  disabled?: boolean | undefined;
  onClick?: (index: 1 | 2 | 3 | 4 | 5) => void;
  rating: 1 | 2 | 3 | 4 | 5;
};

const StarButton = ({ checked, className, disabled, onClick, rating }: Props) => {
  const disabledRef = useRefFrom(disabled);
  const onClickRef = useRefFrom(onClick);
  const ratingRef = useRefFrom(rating);
  const ref = useItemRef<HTMLButtonElement>(rating - 1);

  const label = useLocalizer({ plural: true })(
    {
      few: 'CSAT_RATING_FEW_ALT',
      many: 'CSAT_RATING_MANY_ALT',
      one: 'CSAT_RATING_ONE_ALT',
      other: 'CSAT_RATING_OTHER_ALT',
      two: 'CSAT_RATING_TWO_ALT'
    },
    rating
  );

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
      aria-label={label}
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
