import React, { useState } from 'react';
import { useGlobalContext } from '../context/global-context';

const Form = () => {
  const {
    video,
    setVideo,
    showForm,
    setShowForm,
    isEditing,
    setIsEditing,
    editID,
    setEditID,
    showAlert,
    playlist,
    setPlaylist,
  } = useGlobalContext();
  const [videoURL, setVideoURL] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      showAlert({ show: true, type: 'success', msg: 'video edited' });
      setPlaylist(
        playlist.map((item) => {
          if (item.id === editID) {
            return { ...item, title: video.title };
          }
          return item;
        })
      );
      setEditID('');
      setIsEditing(false);
    } else {
      showAlert({
        show: true,
        type: 'success',
        msg: 'video added to the playlist',
      });
      setPlaylist([...playlist, video]);
    }
    setVideo({ id: '', title: '' });
    setVideoURL('');
    setShowForm(true);
  };

  const getVideoId = (url: string): string => {
    const regex = new RegExp(/twitch.tv\/videos\/(\d+)$/);
    let id: string | null = '';
    if (regex.test(url)) {
      id = url.match(regex)![1];
    }
    return id;
  };

  const handleButtonClick = () => {
    const newID: string = getVideoId(videoURL);

    if (!newID) {
      showAlert({ show: true, type: 'danger', msg: 'invalid URL' });
    } else if (playlist.find((item) => item.id === newID)) {
      showAlert({
        show: true,
        type: 'danger',
        msg: 'video already in playlist',
      });
    } else {
      setVideo({ ...video, id: newID });
      setShowForm(false);
    }
  };

  return (
    <section className="section-center">
      <p>{showForm ? 'Paste URL:' : 'Write a title'}</p>
      <form className="playlist-form" onSubmit={handleSubmit}>
        <div
          className={`${showForm ? 'form-control show-form' : 'form-control'}`}
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
      </form>
    </section>
  );
};

export default Form;
