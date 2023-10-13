import { type AttachmentMiddleware, type AttachmentForScreenReaderMiddleware } from 'botframework-webchat-api';

import CustomerSatisfactory from './CustomerSatisfactory';
import CustomerSatisfactoryForScreenReader from './CustomerSatisfactoryForScreenReader';
import { isReviewAction } from '../../external/OrgSchema/ReviewAction';

const customerSatisfactoryMiddleware: AttachmentMiddleware =
  () =>
  next =>
  (...args) => {
    const [arg0] = args;

    if (arg0) {
      const {
        attachment: { content, contentType }
      } = arg0;

      if (contentType === 'https://schema.org/ReviewAction' && isReviewAction(content)) {
        return <CustomerSatisfactory initialReviewAction={content} />;
      }
    }

    return next(...args);
  };

export default customerSatisfactoryMiddleware;

const forScreenReader: AttachmentForScreenReaderMiddleware =
  () =>
  next =>
  (...args) => {
    if (args[0]?.attachment.contentType === 'https://schema.org/ReviewAction') {
      return () => <CustomerSatisfactoryForScreenReader reviewAction={args[0]?.attachment.content} />;
    }

    return next(...args);
  };

export { forScreenReader };
