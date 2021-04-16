import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ items, playVideo, removeVideo, editVideo }) => {
  return (
    <div className="playlist-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="playlist-item">
            <div className="info-container" onClick={() => playVideo(id)}>
              <p className="title">{title}</p>
              <p className="title">0:00:00</p>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editVideo(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeVideo(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
