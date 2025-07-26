import * as React from 'react';
import '../styles/BookingSeesion.css'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len: number) {
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  let result = '';
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function getUrlParams(url = window.location.href) {
  const urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function BookingSession() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const roomID = getUrlParams().get('roomID') || randomID(5);

  React.useEffect(() => {
    const myMeeting = async () => {
      if (!containerRef.current) return;

      const appID = Number(import.meta.env.VITE_APP_ID);
      const serverSecret = import.meta.env.VITE_APP_URL;

      if (!appID || !serverSecret) {
        console.error("Missing or invalid appID or serverSecret from environment variables.");
        return;
      }

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        randomID(5), // userID
        randomID(5)  // userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      if (!zp) {
        console.error("Failed to create ZegoUIKitPrebuilt instance.");
        return;
      }

      zp.joinRoom({
        container: containerRef.current,
        sharedLinks: [
          {
            name: 'Personal link',
            url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });
    };

    myMeeting();
  }, [roomID]);

  return (
    <div
      className="myCallContainer"
      ref={containerRef}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
