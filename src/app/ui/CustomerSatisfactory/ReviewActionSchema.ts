import { enumType, number, optional, string, union, url } from 'valibot';

import { ActionStatusType } from '../../external/OrgSchema/ActionStatusType';
import exactString from './private/exactString';
import partialObject from './private/partialObject';

const ReviewActionSchema = partialObject(
  {
    '@context': optional(exactString('https://schema.org', 'object must be from context "https://schema.org"')),
    '@type': exactString('ReviewAction', 'object must be of type "ReviewAction"'),
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
      partialObject(
        {
          '@context': optional(
            exactString('https://schema.org', '"resultReview" must be from context "https://schema.org"')
          ),
          '@type': exactString('Review', `"resultReview" must be of type "Review"`),
          reviewRating: optional(
            partialObject({
              '@context': optional(string()),
              '@type': exactString('Rating', `"resultReview.reviewRating" must be of type "Rating"`),
              ratingValue: optional(number(`"resultReview.reviewRating.ratingValue" must be of type "number"`)),
              'ratingValue-input': optional(
                partialObject(
                  {
                    '@context': optional(string()),
                    '@type': exactString(
                      'PropertyValueSpecification',
                      `"resultReview.reviewRating['ratingValue-input']" must be of type "PropertyValueSpecification"`
                    ),
                    valueName: string(
                      `"resultReview.reviewRating['ratingValue-input'].valueName" must be of type string`
                    )
                  },
                  `"resultReview.reviewRating['ratingValue-input']" must be an object`
                )
              )
            })
          )
        },
        '"resultReview" must be an object'
      )
    ),
    target: optional(
      union(
        [
          partialObject({
            '@context': optional(
              exactString('https://schema.org', '"target" must be from context "https://schema.org"')
            ),
            '@type': exactString('EntryPoint', `"target" must be of type "EntryPoint"`),
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
  },
  'must be an object'
);

export default ReviewActionSchema;
