import { type AttachmentMiddleware, type AttachmentForScreenReaderMiddleware } from 'botframework-webchat-api';

import { isReviewAction } from '../../external/OrgSchema/ReviewAction';
import CustomerSatisfactory from './CustomerSatisfactory';
import CustomerSatisfactoryForScreenReader from './CustomerSatisfactoryForScreenReader';

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
    const [arg0] = args;

    if (arg0) {
      const {
        attachment: { content, contentType }
      } = arg0;

      if (contentType === 'https://schema.org/ReviewAction' && isReviewAction(content)) {
        return () => <CustomerSatisfactoryForScreenReader initialReviewAction={content} />;
      }
    }

    return next(...args);
  };

export { forScreenReader };
