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
      <p id={labelId} role="radiogroup">
        {reviewAction.description}
        <button role="radio" type="button">
          1 star
        </button>
        <button role="radio" type="button">
          2 stars
        </button>
        <button role="radio" type="button">
          3 stars
        </button>
        <button role="radio" type="button">
          4 stars
        </button>
        <button role="radio" type="button">
          5 stars
        </button>
        <input type="submit" value="Submit" />
      </p>
    </article>
  );
};

export default CustomerSatisfactoryForScreenReader;
