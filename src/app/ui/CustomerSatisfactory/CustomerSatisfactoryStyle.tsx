import { css } from '@emotion/css';

const DARK_THEME_SELECTOR = '@media (forced-colors: none) and (prefers-color-scheme: dark)';
const FORCED_COLORS_SELECTOR = '@media (forced-colors: active)';
const LIGHT_THEME_SELECTOR = '@media (forced-colors: none) and (prefers-color-scheme: light)';
const NOT_FORCED_COLORS_SELECTOR = '@media (forced-colors: none)';

export default css({
  '&.webchat__customer-satisfactory': {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'var(--webchat__font--primary)',
    gap: 8,
    padding: '10px 12px'
  },

  '& .webchat__customer-satisfactory__body': {
    margin: 0
  },

  '& .webchat__customer-satisfactory__star-bar': {
    display: 'flex',

    [FORCED_COLORS_SELECTOR]: {
      color: 'ButtonBorder'
    },

    [NOT_FORCED_COLORS_SELECTOR]: {
      [DARK_THEME_SELECTOR]: {
        color: '#White'
      },

      [LIGHT_THEME_SELECTOR]: {
        color: '#242424'
      }
    }
  },

  '& .webchat__customer-satisfactory__star-button': {
    backgroundColor: 'transparent',
    color: 'unset',
    border: 0,
    borderRadius: 5.33,
    height: 32,
    padding: 0,
    width: 32,

    '&:hover': {
      [NOT_FORCED_COLORS_SELECTOR]: {
        color: 'var(--webchat__color--accent)'
      }
    },

    '&:active': {
      [NOT_FORCED_COLORS_SELECTOR]: {
        // Web Chat currently don't have an accent color for active.
        color: 'var(--webchat__color--accent)'
      }
    },

    '&:focus-visible': {
      outlineOffset: -2.67,
      outlineStyle: 'solid',
      outlineWidth: 2.67,

      [NOT_FORCED_COLORS_SELECTOR]: {
        [DARK_THEME_SELECTOR]: {
          outlineColor: '#ADADAD'
        },

        [LIGHT_THEME_SELECTOR]: {
          outlineColor: '#616161'
        }
      }
    }
  },

  '& .webchat__customer-satisfactory__rating-value': {
    alignSelf: 'center',
    marginLeft: 4
  },

  '& .webchat__customer-satisfactory__submit-button': {
    appearance: 'none',
    backgroundColor: 'Canvas',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    display: 'flex',
    fontFamily: 'unset',
    fontSize: 'unset',
    fontWeight: 600,
    gap: 8,
    padding: '8px 12px',

    [FORCED_COLORS_SELECTOR]: {
      borderColor: 'ButtonBorder'
    },

    [NOT_FORCED_COLORS_SELECTOR]: {
      borderColor: '#D1D1D1'
    }
  },

  '&.webchat__customer-satisfactory--submitted .webchat__customer-satisfactory__submit-button': {
    backgroundColor: 'unset',
    border: 0,
    color: 'unset',
    padding: 0
  },

  '&:not(.webchat__customer-satisfactory--submitted) .webchat__customer-satisfactory__submit-button': {
    '[aria-disabled], :disabled': {
      [FORCED_COLORS_SELECTOR]: {
        color: 'GrayText'
      },

      [NOT_FORCED_COLORS_SELECTOR]: {
        backgroundColor: '#F0F0F0',
        color: '#BDBDBD'
      }
    }
  }
});
