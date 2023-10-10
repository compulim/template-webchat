import './App.css';

import { memo, useEffect, useState } from 'react';

import WebChat from './WebChat';

export default memo(function App() {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const abortController = new AbortController();

    (async function () {
      const res = await fetch('https://webchat-mockbot.azurewebsites.net/directline/token', {
        method: 'POST',
        signal: abortController.signal
      });

      if (!res.ok) {
        return console.error(`Server returned ${res.status} while fetching Direct Line token.`);
      }

      const { token } = await res.json();

      setToken(token);
    })();

    return () => abortController.abort();
  }, []);

  return <div className="app">{token ? <WebChat token={token} /> : <div>Fetching Direct Line token&hellip;</div>}</div>;
});
