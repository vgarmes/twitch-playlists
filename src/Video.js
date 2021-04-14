import React, { useState, useEffect } from "react";

function Video() {
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

  const options = {
    width: 500,
    height: 300,
    video: "982876576",
  };

  const scriptLoaded = () => {
    const player = new window.Twitch.Player("video-player", options);
  };

  return <div id="video-player"></div>;
}

export default Video;
