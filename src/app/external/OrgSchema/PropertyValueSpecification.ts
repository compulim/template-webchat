import { isThingOf, type Thing } from './Thing';

/**
 * A Property value specification.
 *
 * This is partial implementation of https://schema.org/PropertyValueSpecification.
 *
 * @see https://schema.org/PropertyValueSpecification
 */
export type PropertyValueSpecification = Thing<'PropertyValueSpecification'> & {
  /** Indicates the name of the PropertyValueSpecification to be used in URL templates and form encoding in a manner analogous to HTML's input@name. */
  valueName?: string;

  /** Whether the property must be filled in to complete the action. Default is false. */
  valueRequired?: boolean;
};

export type WithInput<T extends Record<string, unknown>> = {
  [K in keyof T as K extends string ? `${K}-input` : K]: PropertyValueSpecification;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPropertyValueSpecification(thing: any): thing is PropertyValueSpecification {
  return isThingOf(thing, 'PropertyValueSpecification');
}
