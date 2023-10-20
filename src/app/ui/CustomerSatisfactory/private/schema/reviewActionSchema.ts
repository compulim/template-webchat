import {
  array,
  ArraySchema,
  enumType,
  length,
  number,
  optional,
  Output,
  string,
  StringSchema,
  union,
  url
} from 'valibot';

import { ActionStatusType } from '../../../../external/OrgSchema/ActionStatusType';
import exactString from './exactString';
import thing from './thing';

// This is stricter than Schema.org.
// Enforcing some rules to make sure the attachment received has all fields we need.
const reviewActionSchema = thing('ReviewAction', {
  actionStatus: optional(
    enumType(
      [
        ActionStatusType.ActiveActionStatus,
        ActionStatusType.CompletedActionStatus,
        ActionStatusType.FailedActionStatus,
        ActionStatusType.PotentialActionStatus
      ],
      '"actionStatus" must be one of the ActionStatusType'
    )
  ),
  description: optional(string('"description" must be of type string')),
  resultReview: optional(
    thing('Review', {
      reviewRating: optional(
        thing('Rating', {
          description: optional(
            array(
              string(),
              `"resultReview.reviewRating.description" must be an array with 5 elements of type "string"`,
              [length(5)]
            ) as ArraySchema<
              StringSchema,
              [
                Output<StringSchema>,
                Output<StringSchema>,
                Output<StringSchema>,
                Output<StringSchema>,
                Output<StringSchema>
              ]
            >
          ),
          ratingValue: optional(number(`"resultReview.reviewRating.ratingValue" must be of type "number"`)),
          'ratingValue-input': optional(
            thing('PropertyValueSpecification', {
              valueName: optional(
                string(`"resultReview.reviewRating['ratingValue-input'].valueName" must be of type string`)
              )
            })
          )
        })
      )
    })
  ),
  target: optional(
    union(
      [
        thing('EntryPoint', {
          actionPlatform: exactString(
            'https://directline.botframework.com',
            `"target.actionPlatform" must be "https://directline.botframework.com"`
          ),
          urlTemplate: string([url(`"target.urlTemplate" must be a URL`)])
        }),
        string([url()])
      ],
      '"target" must be of type "EntryPoint" or URL'
    )
  )
});

export default reviewActionSchema;
