import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import Video from "./Video";

const test_url = "https://api.twitch.tv/helix/videos?id=982876576";

function App() {
  const [url, setUrl] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [playing, isPlaying] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) {
      // display alert
    } else {
      const newItem = { id: new Date().getTime().toString(), title: url };
      setPlaylist([...playlist, newItem]);
      setUrl("");
    }
  };

  return (
    <section className="section-center">
      <form className="playlist-form" onSubmit={handleSubmit}>
        {alert.show && <Alert />}
        <h3>Twitcher</h3>
        <div className="form-control">
          <input
            type="text"
            className="playlist"
            placeholder="twitch.tv/video/1214"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            submit
          </button>
        </div>
      </form>
      {playlist.length > 0 && (
        <div className="playlist-container">
          <List items={playlist} />
          <button className="clear-btn">clear items</button>
        </div>
      )}
      <div className="playlist-container"></div>
    </section>
  );
}

export default App;
