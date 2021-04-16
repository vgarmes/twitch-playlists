import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import Video from "./Video";
const smallVideo = { width: 99, height: 54 };
const largeVideo = { width: 495, height: 270 };

function App() {
  const [videoURL, setVideoURL] = useState("");
  const [video, setVideo] = useState({ id: "", title: "" });
  const [playlist, setPlaylist] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [playingVideo, setPlayingVideo] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      showAlert(true, "success", "video edited");
      setPlaylist(
        playlist.map((item) => {
          if (item.id === editID) {
            return { ...item, title: video.title };
          }
          return item;
        })
      );
      setEditID(null);
      setIsEditing(false);
    } else {
      showAlert(true, "success", "video added to the playlist");
      const newItem = { id: video.id, title: video.title };
      setPlaylist([...playlist, newItem]);
    }
    setVideo({ id: "", title: "" });
    setVideoURL("");
    setShowForm(true);
  };

  const handleButtonClick = (e) => {
    const regex = /(?<=twitch.tv\/videos\/)\d+/;
    const newID = regex.test(videoURL) ? videoURL.match(regex)[0] : "";

    if (!newID) {
      showAlert(true, "danger", "invalid URL");
    } else if (playlist.find((item) => item.id === newID)) {
      showAlert(true, "danger", "video already in playlist");
    } else {
      setVideo({ ...video, id: newID });
      setShowForm(false);
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const playVideo = (videoID) => {
    setPlayingVideo(videoID);
    setIsPlaying(true);
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setPlaylist([]);
  };

  const removeVideo = (id) => {
    showAlert(true, "danger", "video removed");
    setPlaylist(playlist.filter((item) => item.id !== id));
  };

  const editVideo = (id) => {
    const editingVideo = playlist.find((item) => item.id === id);
    setIsEditing(true);
    setShowForm(false);
    setEditID(id);
    setVideo({ ...editingVideo });
  };

  return (
    <section className="section-center">
      <h3>Twitcher</h3>
      {isPlaying && <Video videoID={playingVideo} />}
      <form className="playlist-form" onSubmit={handleSubmit}>
        {alert.show && (
          <Alert {...alert} removeAlert={showAlert} playlist={playlist} />
        )}

        {showForm && (
          <div className="form-control">
            <input
              type="text"
              className="playlist"
              placeholder="twitch.tv/video/1214"
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
            />
            <button
              type="button"
              className="submit-btn"
              onClick={handleButtonClick}
            >
              next
            </button>
          </div>
        )}
        {!showForm && (
          <div className="form-control">
            <input
              type="text"
              className="playlist"
              placeholder="e.x. my video"
              value={video.title}
              onChange={(e) => setVideo({ ...video, title: e.target.value })}
            />
            <button type="submit" className="submit-btn">
              {isEditing ? "edit" : "submit"}
            </button>
          </div>
        )}
      </form>
      {playlist.length > 0 && (
        <div className="playlist-container">
          <List
            items={playlist}
            playVideo={playVideo}
            removeVideo={removeVideo}
            editVideo={editVideo}
          />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
