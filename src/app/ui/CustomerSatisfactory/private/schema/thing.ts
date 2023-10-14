import { merge, object, type ObjectShape, optional } from 'valibot';

import exactString from './exactString';

// This is stricter than Schema.org.
// Enforcing some rules to make sure the attachment received has all fields we need.
function thing<TObjectShape extends ObjectShape, TThingType extends string>(type: TThingType, shape: TObjectShape) {
  return merge([
    object({
      '@context': optional(exactString('https://schema.org', 'object must be from context "https://schema.org"')),
      '@type': exactString(type, `object must be of type "${type}"`)
    }),
    object(shape)
  ]);
}

export default thing;
