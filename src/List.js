import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items }) => {
  return (
    <div className="playlist-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="playlist-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button type="button" className="delete-btn">
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
