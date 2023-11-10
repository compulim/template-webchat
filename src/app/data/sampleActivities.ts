export default [
  {
    from: { role: 'bot' },
    text: 'Non aute nostrud irure id do tempor incididunt sunt ullamco deserunt sint tempor laboris tempor. Cupidatat deserunt esse nulla aute. Consequat fugiat laboris dolore incididunt ea aute reprehenderit culpa aliqua labore dolor reprehenderit ullamco. Est pariatur proident ex sint consequat occaecat aliquip laborum culpa laboris Lorem incididunt velit. Nulla non labore elit dolor et pariatur veniam. Fugiat exercitation commodo veniam aliqua eu minim est cupidatat voluptate cupidatat veniam. Occaecat velit amet consequat aliqua dolore dolor voluptate ut est reprehenderit laborum pariatur.',
    type: 'message'
  },
  {
    from: { role: 'user' },
    text: 'Sint dolor id occaecat cupidatat excepteur.',
    type: 'message'
  },
  {
    from: { role: 'bot' },
    text: 'Non proident laborum mollit eu occaecat aute proident. Proident et tempor sint laboris. Duis id duis eu magna in nostrud Lorem laboris cupidatat laboris.',
    type: 'message'
  },
  {
    from: { role: 'user' },
    text: 'Aliquip nostrud labore ea magna officia.',
    type: 'message'
  },
  {
    from: { role: 'bot' },
    text: 'Laborum deserunt eiusmod ullamco aliqua qui minim excepteur. Dolor adipisicing veniam mollit deserunt est nostrud nulla ea consequat tempor ad velit velit laboris. Veniam fugiat nostrud irure duis. Pariatur aliquip excepteur eu qui. Nulla deserunt voluptate adipisicing exercitation.',
    type: 'message'
  },
  {
    from: { role: 'user' },
    text: 'Laborum reprehenderit sint nulla.',
    type: 'message'
  },
  {
    from: { role: 'bot' },
    text: 'Labore anim est adipisicing ea aute duis eiusmod. Eiusmod occaecat mollit Lorem Lorem id nisi. Exercitation magna cupidatat ad qui consequat in. Ad eiusmod amet cupidatat ea velit eiusmod id id nulla est exercitation magna non. Reprehenderit esse officia excepteur voluptate laboris proident incididunt nisi laboris.',
    type: 'message'
  },
  {
    from: { role: 'user' },
    text: 'Excepteur esse fugiat tempor velit.',
    type: 'message'
  },
  {
    from: { role: 'bot' },
    text: 'Veniam pariatur reprehenderit do enim. Consectetur id sit minim eu in occaecat dolor. Lorem nisi ad consequat enim nostrud fugiat amet culpa. Consequat do nisi enim ad. Anim in mollit laborum fugiat ipsum anim eu.',
    type: 'message'
  },
  {
    from: { role: 'bot' },
    type: 'message',
    attachments: [
      {
        content: {
          '@context': 'https://schema.org',
          '@type': 'ReviewAction',
          actionStatus: 'PotentialActionStatus',
          description: 'Great! Please rate your experience.',
          resultReview: {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              description: ['Bad', 'Poor', 'Average', 'Good', 'Excellent'],
              'ratingValue-input': {
                '@type': 'PropertyValueSpecification',
                valueName: 'rate'
              }
            }
          },
          target: {
            '@type': 'EntryPoint',
            actionPlatform: 'https://directline.botframework.com',
            urlTemplate: 'ms-directline-postback:?valuetype=application/json&value=%7B%22rate%22%3A%22{rate}%22%7D'
          }
        },
        contentType: 'application/ld+json'
      }
    ]
  },
  {
    from: { role: 'bot' },
    type: 'message',
    attachments: [
      {
        content: {
          '@context': 'https://schema.org',
          '@type': 'ReviewAction',
          actionStatus: 'PotentialActionStatus',
          description: 'Great! Please rate your experience.',
          resultReview: {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              description: ['Bad', 'Poor', 'Average', 'Good', 'Excellent'],
              'ratingValue-input': {
                '@type': 'PropertyValueSpecification',
                valueName: 'rate'
              }
            }
          },
          target: {
            '@type': 'EntryPoint',
            actionPlatform: 'https://directline.botframework.com',
            urlTemplate: 'ms-directline-postback:?valuetype=application/json&value=%7B%22rate%22%3A%22{rate}%22%7D'
          }
        },
        contentType: 'application/ld+json'
      }
    ]
  },
  {
    // TODO: We should add an "entities" to indicate this is CSAT so Web Chat and supported channels can render things natively.
    from: { role: 'bot' },
    text: 'Great! Please rate your experience.',
    type: 'message',
    suggestedActions: {
      to: {},
      actions: [
        {
          image: `data:image/svg+xml,%3Csvg width='160' height='32' viewBox='0 0 160 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.8057 6.53194C15.2948 5.54094 16.7079 5.54095 17.197 6.53194L19.7709 11.7473L25.5264 12.5836C26.62 12.7425 27.0567 14.0865 26.2653 14.8578L22.1006 18.9174L23.0838 24.6496C23.2706 25.7388 22.1273 26.5694 21.1492 26.0552L16.0013 23.3488L10.8535 26.0552C9.87532 26.5694 8.73209 25.7388 8.9189 24.6496L9.90205 18.9174L5.73736 14.8578C4.946 14.0865 5.38269 12.7425 6.47631 12.5836L12.2318 11.7473L14.8057 6.53194Z' fill='%23242424'/%3E%3Cpath d='M46.8057 6.53194C47.2948 5.54094 48.7079 5.54095 49.197 6.53194L51.7709 11.7473L57.5264 12.5836C58.62 12.7425 59.0567 14.0865 58.2653 14.8578L54.1006 18.9174L55.0838 24.6496C55.2706 25.7388 54.1273 26.5694 53.1492 26.0552L48.0013 23.3488L42.8535 26.0552C41.8753 26.5694 40.7321 25.7388 40.9189 24.6496L41.902 18.9174L37.7374 14.8578C36.946 14.0865 37.3827 12.7425 38.4763 12.5836L44.2318 11.7473L46.8057 6.53194Z' fill='%23242424'/%3E%3Cpath d='M78.8057 6.53194C79.2948 5.54094 80.7079 5.54095 81.197 6.53194L83.7709 11.7473L89.5264 12.5836C90.62 12.7425 91.0567 14.0865 90.2653 14.8578L86.1006 18.9174L87.0838 24.6496C87.2706 25.7388 86.1273 26.5694 85.1492 26.0552L80.0013 23.3488L74.8535 26.0552C73.8753 26.5694 72.7321 25.7388 72.9189 24.6496L73.902 18.9174L69.7374 14.8578C68.946 14.0865 69.3827 12.7425 70.4763 12.5836L76.2318 11.7473L78.8057 6.53194Z' fill='%23242424'/%3E%3Cpath d='M110.806 6.53194C111.295 5.54094 112.708 5.54095 113.197 6.53194L115.771 11.7473L121.526 12.5836C122.62 12.7425 123.057 14.0865 122.265 14.8578L118.101 18.9174L119.084 24.6496C119.271 25.7388 118.127 26.5694 117.149 26.0552L112.001 23.3488L106.853 26.0552C105.875 26.5694 104.732 25.7388 104.919 24.6496L105.902 18.9174L101.737 14.8578C100.946 14.0865 101.383 12.7425 102.476 12.5836L108.232 11.7473L110.806 6.53194Z' fill='%23242424'/%3E%3Cpath d='M142.806 6.53194C143.295 5.54094 144.708 5.54095 145.197 6.53194L147.771 11.7473L153.526 12.5836C154.62 12.7425 155.057 14.0865 154.265 14.8578L150.101 18.9174L151.084 24.6496C151.271 25.7388 150.127 26.5694 149.149 26.0552L144.001 23.3488L138.853 26.0552C137.875 26.5694 136.732 25.7388 136.919 24.6496L137.902 18.9174L133.737 14.8578C132.946 14.0865 133.383 12.7425 134.476 12.5836L140.232 11.7473L142.806 6.53194Z' fill='%23242424'/%3E%3C/svg%3E`,
          type: 'imBack',
          value: 'Excellent'
        },
        {
          image: `data:image/svg+xml,%3Csvg width='128' height='32' viewBox='0 0 128 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.8057 6.53194C15.2948 5.54094 16.7079 5.54095 17.197 6.53194L19.7709 11.7473L25.5264 12.5836C26.62 12.7425 27.0567 14.0865 26.2653 14.8578L22.1006 18.9174L23.0838 24.6496C23.2706 25.7388 22.1273 26.5694 21.1492 26.0552L16.0013 23.3488L10.8535 26.0552C9.87532 26.5694 8.73209 25.7388 8.9189 24.6496L9.90205 18.9174L5.73736 14.8578C4.946 14.0865 5.38269 12.7425 6.47631 12.5836L12.2318 11.7473L14.8057 6.53194Z' fill='%23242424'/%3E%3Cpath d='M46.8057 6.53194C47.2948 5.54094 48.7079 5.54095 49.197 6.53194L51.7709 11.7473L57.5264 12.5836C58.62 12.7425 59.0567 14.0865 58.2653 14.8578L54.1006 18.9174L55.0838 24.6496C55.2706 25.7388 54.1273 26.5694 53.1492 26.0552L48.0013 23.3488L42.8535 26.0552C41.8753 26.5694 40.7321 25.7388 40.9189 24.6496L41.902 18.9174L37.7374 14.8578C36.946 14.0865 37.3827 12.7425 38.4763 12.5836L44.2318 11.7473L46.8057 6.53194Z' fill='%23242424'/%3E%3Cpath d='M78.8057 6.53194C79.2948 5.54094 80.7079 5.54095 81.197 6.53194L83.7709 11.7473L89.5264 12.5836C90.62 12.7425 91.0567 14.0865 90.2653 14.8578L86.1006 18.9174L87.0838 24.6496C87.2706 25.7388 86.1273 26.5694 85.1492 26.0552L80.0013 23.3488L74.8535 26.0552C73.8753 26.5694 72.7321 25.7388 72.9189 24.6496L73.902 18.9174L69.7374 14.8578C68.946 14.0865 69.3827 12.7425 70.4763 12.5836L76.2318 11.7473L78.8057 6.53194Z' fill='%23242424'/%3E%3Cpath d='M110.806 6.53194C111.295 5.54094 112.708 5.54095 113.197 6.53194L115.771 11.7473L121.526 12.5836C122.62 12.7425 123.057 14.0865 122.265 14.8578L118.101 18.9174L119.084 24.6496C119.271 25.7388 118.127 26.5694 117.149 26.0552L112.001 23.3488L106.853 26.0552C105.875 26.5694 104.732 25.7388 104.919 24.6496L105.902 18.9174L101.737 14.8578C100.946 14.0865 101.383 12.7425 102.476 12.5836L108.232 11.7473L110.806 6.53194Z' fill='%23242424'/%3E%3C/svg%3E`,
          type: 'imBack',
          value: 'Great'
        },
        {
          image: `data:image/svg+xml,%3Csvg width='96' height='32' viewBox='0 0 96 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.8057 6.53194C15.2948 5.54094 16.7079 5.54095 17.197 6.53194L19.7709 11.7473L25.5264 12.5836C26.62 12.7425 27.0567 14.0865 26.2653 14.8578L22.1006 18.9174L23.0838 24.6496C23.2706 25.7388 22.1273 26.5694 21.1492 26.0552L16.0013 23.3488L10.8535 26.0552C9.87532 26.5694 8.73209 25.7388 8.9189 24.6496L9.90205 18.9174L5.73736 14.8578C4.946 14.0865 5.38269 12.7425 6.47631 12.5836L12.2318 11.7473L14.8057 6.53194Z' fill='%23242424'/%3E%3Cpath d='M46.8057 6.53194C47.2948 5.54094 48.7079 5.54095 49.197 6.53194L51.7709 11.7473L57.5264 12.5836C58.62 12.7425 59.0567 14.0865 58.2653 14.8578L54.1006 18.9174L55.0838 24.6496C55.2706 25.7388 54.1273 26.5694 53.1492 26.0552L48.0013 23.3488L42.8535 26.0552C41.8753 26.5694 40.7321 25.7388 40.9189 24.6496L41.902 18.9174L37.7374 14.8578C36.946 14.0865 37.3827 12.7425 38.4763 12.5836L44.2318 11.7473L46.8057 6.53194Z' fill='%23242424'/%3E%3Cpath d='M78.8057 6.53194C79.2948 5.54094 80.7079 5.54095 81.197 6.53194L83.7709 11.7473L89.5264 12.5836C90.62 12.7425 91.0567 14.0865 90.2653 14.8578L86.1006 18.9174L87.0838 24.6496C87.2706 25.7388 86.1273 26.5694 85.1492 26.0552L80.0013 23.3488L74.8535 26.0552C73.8753 26.5694 72.7321 25.7388 72.9189 24.6496L73.902 18.9174L69.7374 14.8578C68.946 14.0865 69.3827 12.7425 70.4763 12.5836L76.2318 11.7473L78.8057 6.53194Z' fill='%23242424'/%3E%3C/svg%3E`,
          type: 'imBack',
          value: 'Good'
        },
        {
          image: `data:image/svg+xml,%3Csvg width='64' height='32' viewBox='0 0 64 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.8057 6.53194C15.2948 5.54094 16.7079 5.54095 17.197 6.53194L19.7709 11.7473L25.5264 12.5836C26.62 12.7425 27.0567 14.0865 26.2653 14.8578L22.1006 18.9174L23.0838 24.6496C23.2706 25.7388 22.1273 26.5694 21.1492 26.0552L16.0013 23.3488L10.8535 26.0552C9.87532 26.5694 8.73209 25.7388 8.9189 24.6496L9.90205 18.9174L5.73736 14.8578C4.946 14.0865 5.38269 12.7425 6.47631 12.5836L12.2318 11.7473L14.8057 6.53194Z' fill='%23242424'/%3E%3Cpath d='M46.8057 6.53194C47.2948 5.54094 48.7079 5.54095 49.197 6.53194L51.7709 11.7473L57.5264 12.5836C58.62 12.7425 59.0567 14.0865 58.2653 14.8578L54.1006 18.9174L55.0838 24.6496C55.2706 25.7388 54.1273 26.5694 53.1492 26.0552L48.0013 23.3488L42.8535 26.0552C41.8753 26.5694 40.7321 25.7388 40.9189 24.6496L41.902 18.9174L37.7374 14.8578C36.946 14.0865 37.3827 12.7425 38.4763 12.5836L44.2318 11.7473L46.8057 6.53194Z' fill='%23242424'/%3E%3C/svg%3E`,
          type: 'imBack',
          value: 'Bad'
        },
        {
          image: `data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.8057 6.53194C15.2948 5.54094 16.7079 5.54095 17.197 6.53194L19.7709 11.7473L25.5264 12.5836C26.62 12.7425 27.0567 14.0865 26.2653 14.8578L22.1006 18.9174L23.0838 24.6496C23.2706 25.7388 22.1273 26.5694 21.1492 26.0552L16.0013 23.3488L10.8535 26.0552C9.87532 26.5694 8.73209 25.7388 8.9189 24.6496L9.90205 18.9174L5.73736 14.8578C4.946 14.0865 5.38269 12.7425 6.47631 12.5836L12.2318 11.7473L14.8057 6.53194Z' fill='%23242424'/%3E%3C/svg%3E`,
          type: 'imBack',
          value: 'Poor'
        }
      ]
    }
  }
];
