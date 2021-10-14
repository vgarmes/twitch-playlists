import React from 'react';
import { useGlobalContext } from '../context/global-context';

const Playlist = () => {
  const { playlist } = useGlobalContext();
  const clearList = () => {};
  return (
    <section className="section-center">
      {playlist.length > 0 && (
        <div className="playlist-container">
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
};

export default Playlist;
