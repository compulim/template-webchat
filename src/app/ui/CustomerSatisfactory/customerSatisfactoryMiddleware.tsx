import { type AttachmentMiddleware } from 'botframework-webchat-api';
import CustomerSatisfactory from './CustomerSatisfactory';

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
