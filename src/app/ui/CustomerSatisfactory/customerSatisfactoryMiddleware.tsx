import { type AttachmentMiddleware, type AttachmentForScreenReaderMiddleware } from 'botframework-webchat-api';

import CustomerSatisfactory from './CustomerSatisfactory';
import CustomerSatisfactoryForScreenReader from './CustomerSatisfactoryForScreenReader';

const customerSatisfactoryMiddleware: AttachmentMiddleware =
  () =>
  next =>
  (...args) => {
    if (args[0]?.attachment.contentType === 'https://schema.org/ReviewAction') {
      return <CustomerSatisfactory reviewAction={args[0]?.attachment.content} />;
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
