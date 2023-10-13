import { isThingOf, type Thing } from './Thing';
import { type ActionStatusType } from './ActionStatusType';

/**
 * A review of an item - for example, of a restaurant, movie, or store.
 *
 * This is partial implementation of https://schema.org/Review.
 *
 * @see https://schema.org/Review
 */
export type Review = Thing<'Review'> & {
  /** Indicates the current disposition of the Action. */
  actionStatus?: ActionStatusType;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isReview(thing: any): thing is Review {
  return isThingOf(thing, 'Review');
}
