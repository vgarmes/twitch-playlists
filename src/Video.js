import React, { useState, useEffect } from "react";

function Video({ id, timestamp }) {
  const windowWidth = window.innerWidth;
  const maxWidth = 560;
  const options = {
    width: windowWidth <= maxWidth ? Math.floor(0.95 * windowWidth) : 560,
    height:
      windowWidth <= maxWidth ? Math.floor((0.95 * windowWidth * 9) / 16) : 315,
    video: id,
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://player.twitch.tv/js/embed/v1.js";
    script.async = true;
    script.onload = () => {
      scriptLoaded();
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const scriptLoaded = () => {
    const player = new window.Twitch.Player("video-container", options);
    player.addEventListener(window.Twitch.Player.PAUSE, function () {
      console.log("paused");
    });
  };

  return <div id="video-container"></div>;
}

export default Video;
