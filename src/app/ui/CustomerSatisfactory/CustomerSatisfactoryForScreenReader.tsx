import useUniqueId from './private/useUniqueId';

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

const CustomerSatisfactoryForScreenReader = ({ reviewAction }: Props) => {
  const labelId = useUniqueId('webchat__customer-satisfactory');

  return (
    <article>
      <div aria-labelledby={labelId} role="radiogroup">
        <p id={labelId}>{reviewAction.description}</p>
        <button aria-checked={false} aria-label="1 star" role="radio" type="button" />
        <button aria-checked={false} aria-label="2 stars" role="radio" type="button" />
        <button aria-checked={false} aria-label="3 stars" role="radio" type="button" />
        <button aria-checked={false} aria-label="4 stars" role="radio" type="button" />
        <button aria-checked={false} aria-label="5 stars" role="radio" type="button" />
      </div>
      <input type="submit" value="Submit" />
    </article>
  );
};

export default CustomerSatisfactoryForScreenReader;
