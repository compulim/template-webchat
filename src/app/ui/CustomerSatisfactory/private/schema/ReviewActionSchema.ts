import { enumType, number, optional, string, union, url } from 'valibot';

import { ActionStatusType } from '../../../../external/OrgSchema/ActionStatusType';
import exactString from './exactString';
import thing from './thing';

// This is stricter than Schema.org.
// Enforcing some rules to make sure the attachment received has all fields we need.
const ReviewActionSchema = thing('ReviewAction', {
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

export default ReviewActionSchema;
