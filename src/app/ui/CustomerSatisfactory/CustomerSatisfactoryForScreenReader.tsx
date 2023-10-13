import { type ReviewAction } from '../../external/OrgSchema/ReviewAction';
import useStrings from './private/useStrings';
import useUniqueId from './private/useUniqueId';

declare global {
  interface URLSearchParams {
    entries(): Iterable<[string, string]>;
  }
}

type Props = {
  initialReviewAction: ReviewAction;
};

const CustomerSatisfactoryForScreenReader = ({ initialReviewAction }: Props) => {
  const { getRatingAltText, submitButtonText } = useStrings();
  const labelId = useUniqueId('webchat__customer-satisfactory');

  return (
    <article>
      <div aria-labelledby={labelId} role="radiogroup">
        <p id={labelId}>{initialReviewAction.description}</p>
        {/* TODO: Can we use <div role="radio"> instead of <button>? */}
        <button aria-checked={false} aria-label={getRatingAltText(1)} role="radio" type="button" />
        <button aria-checked={false} aria-label={getRatingAltText(2)} role="radio" type="button" />
        <button aria-checked={false} aria-label={getRatingAltText(3)} role="radio" type="button" />
        <button aria-checked={false} aria-label={getRatingAltText(4)} role="radio" type="button" />
        <button aria-checked={false} aria-label={getRatingAltText(5)} role="radio" type="button" />
      </div>
      <input type="submit" value={submitButtonText} />
    </article>
  );
};

export default CustomerSatisfactoryForScreenReader;
