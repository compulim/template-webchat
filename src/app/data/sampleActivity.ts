export default {
  conversation: { id: 'c-00001' },
  from: { id: 'bot' },
  type: 'message',
  attachments: [
    {
      type: 'https://schema.org/ReviewAction',
      content: {
        '@context': 'https://schema.org',
        '@type': 'ReviewAction',
        actionStatus: 'PotentialActionStatus',
        review: {
          '@type': 'Review',
          reviewAspect: 'Great! Please rate your experience.'
        },
        target: {
          '@type': 'EntryPoint',
          actionPlatform: 'https://directline.botframework.com',
          contentType: 'application/vnd.microsoft.directline.activity;type=postback'
        },
        result: {
          '@type': 'Review',
          reviewRating: {
            'ratingValue-input': 'required'
          }
        }
      }
    }
  ]
};
