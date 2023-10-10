import './WebChat.css';

import { memo, useMemo } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';

type Props = {
  token: string;
};

const WebChat = memo(({ token }: Props) => {
  const directLine = useMemo(() => createDirectLine({ token }), [token]);

  return <ReactWebChat className="app__webchat" directLine={directLine} />;
});

export default WebChat;
