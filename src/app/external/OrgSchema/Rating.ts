import { isThingOf, type Thing } from './Thing';
import { WithInput } from './PropertyValueSpecification';

/**
 * A rating is an evaluation on a numeric scale, such as 1 to 5 stars.
 *
 * This is partial implementation of https://schema.org/Rating.
 *
 * @see https://schema.org/Rating
 */
export type Rating = Thing<'Rating'> &
  WithInput<{
    /**
     * The rating for the content.
     *
     * Usage guidelines:
     *
     * - Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similar Unicode symbols.
     * - Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator.
     */
    ratingValue?: number | string;
  }>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isRating(thing: any): thing is Rating {
  return isThingOf(thing, 'Rating');
}
