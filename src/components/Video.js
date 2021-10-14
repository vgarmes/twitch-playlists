import React, { useEffect } from 'react';
import useScript from './hooks/useScript';

function Video({ id }) {
  const windowWidth = window.innerWidth;
  const maxWidth = 560;
  const options = {
    width: windowWidth <= maxWidth ? Math.floor(0.95 * windowWidth) : 560,
    height:
      windowWidth <= maxWidth ? Math.floor((0.95 * windowWidth * 9) / 16) : 315,
    video: id,
  };

  const scriptLoaded = () => {
    const player = new window.Twitch.Player('video-container', options);
    player.addEventListener(window.Twitch.Player.PAUSE, function () {
      console.log('paused');
    });
  };

  useScript('https://player.twitch.tv/js/embed/v1.js', scriptLoaded);

  return <div id="video-container"></div>;
}

export default Video;
