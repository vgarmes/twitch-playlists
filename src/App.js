import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import Video from "./Video";

const getLocalStorage = () => {
  let playlist = localStorage.getItem("playlist");
  if (playlist) {
    return JSON.parse(localStorage.getItem("playlist"));
  } else {
    return [];
  }
};

function App() {
  const [videoURL, setVideoURL] = useState("");
  const [video, setVideo] = useState({ id: "", title: "" });
  const [playlist, setPlaylist] = useState(getLocalStorage());
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
      setPlaylist([...playlist, video]);
    }
    setVideo({ id: "", title: "" });
    setVideoURL("");
    setShowForm(true);
  };

  const handleButtonClick = (e) => {
    const regex = /twitch.tv\/videos\/(\d+)$/;
    const newID = regex.test(videoURL) ? videoURL.match(regex)[1] : "";

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

  const playVideo = (videoObj) => {
    setPlayingVideo(videoObj);
    setIsPlaying(true);
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setPlaylist([]);
    setIsPlaying(false);
    setPlayingVideo("");
  };

  const removeVideo = (id) => {
    showAlert(true, "danger", "video removed");
    setPlaylist(playlist.filter((item) => item.id !== id));
    if (playingVideo && playingVideo.id === id) {
      setPlayingVideo("");
      setIsPlaying(false);
    }
  };

  const editVideo = (id) => {
    const editingVideo = playlist.find((item) => item.id === id);
    setIsEditing(true);
    setShowForm(false);
    setEditID(id);
    setVideo({ ...editingVideo });
  };

  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }, [playlist]);

  return (
    <>
      <nav className="nav__container">
        <h3 className="nav__logo">Twitcher</h3>
        <p className="nav__item">
          <a href="https://github.com/vgarmes/twitcher">About</a>
        </p>
      </nav>
      {alert.show && (
        <Alert {...alert} removeAlert={showAlert} playlist={playlist} />
      )}
      {isPlaying && <Video {...playingVideo} />}
      <section className="section-center">
        <p>{showForm ? "Paste URL:" : "Write a title:"}</p>
        <form className="playlist-form" onSubmit={handleSubmit}>
          <div
            className={`${
              showForm ? "form-control show-form" : "form-control"
            }`}
          >
            <input
              type="text"
              className="playlist"
              placeholder="e.g.: twitch.tv/video/1234"
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

          <div
            className={`${
              showForm ? "form-control" : "form-control show-form"
            }`}
          >
            <input
              type="text"
              className="playlist"
              placeholder="e.g.: my video"
              value={video.title}
              onChange={(e) => setVideo({ ...video, title: e.target.value })}
            />
            <button type="submit" className="submit-btn">
              {isEditing ? "edit" : "submit"}
            </button>
          </div>
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
    </>
  );
}

export default App;
