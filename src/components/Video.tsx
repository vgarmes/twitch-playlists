import React from 'react';
import useScript from '../hooks/useScript';

type VideoOptions = {
  width: number;
  height: number;
  video: string;
};

interface Props {
  id: string;
}

declare global {
  interface Window {
    Twitch: any;
  }
}

function Video({ id }: Props) {
  const windowWidth = window.innerWidth;
  const maxWidth = 560;
  const options: VideoOptions = {
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
