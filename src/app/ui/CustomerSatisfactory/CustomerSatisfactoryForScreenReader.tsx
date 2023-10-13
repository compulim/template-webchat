import { hooks } from 'botframework-webchat-api';

import useUniqueId from './private/useUniqueId';

const { useLocalizer } = hooks;

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

const RATING_PLURAL_IDS = {
  few: 'CSAT_RATING_FEW_ALT',
  many: 'CSAT_RATING_MANY_ALT',
  one: 'CSAT_RATING_ONE_ALT',
  other: 'CSAT_RATING_OTHER_ALT',
  two: 'CSAT_RATING_TWO_ALT'
};

const CustomerSatisfactoryForScreenReader = ({ reviewAction }: Props) => {
  const labelId = useUniqueId('webchat__customer-satisfactory');
  const localize = useLocalizer();
  const localizePlural = useLocalizer({ plural: true });

  return (
    <article>
      <div aria-labelledby={labelId} role="radiogroup">
        <p id={labelId}>{reviewAction.description}</p>
        <button aria-checked={false} aria-label={localizePlural(RATING_PLURAL_IDS, 1)} role="radio" type="button" />
        <button aria-checked={false} aria-label={localizePlural(RATING_PLURAL_IDS, 2)} role="radio" type="button" />
        <button aria-checked={false} aria-label={localizePlural(RATING_PLURAL_IDS, 3)} role="radio" type="button" />
        <button aria-checked={false} aria-label={localizePlural(RATING_PLURAL_IDS, 4)} role="radio" type="button" />
        <button aria-checked={false} aria-label={localizePlural(RATING_PLURAL_IDS, 5)} role="radio" type="button" />
      </div>
      <input type="submit" value={localize('CSAT_SUBMIT_BUTTON_TEXT')} />
    </article>
  );
};

export default CustomerSatisfactoryForScreenReader;
