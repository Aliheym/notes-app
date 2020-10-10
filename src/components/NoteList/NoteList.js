import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegStickyNote } from 'react-icons/fa';

import './index.css';

function NoteList({ notes }) {
  const renderList = () => {
    if (notes.length === 0) {
      return <div className="NoteList__empty">Empty</div>;
    }

    return <ul className="NoteList__list">{notes.map(renderNote)}</ul>;
  };

  const renderNote = ({ id, createdAt, title }) => {
    const date = new Date(createdAt);
    const dateString = date.toLocaleString('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
      hour12: false,
    });

    return (
      <li key={id} className="NoteList__item">
        <Link className="NoteList__link" to={`/note/${id}`}>
          <FaRegStickyNote size="5em" />
          <span className="NoteList__title">{title}</span>
          <time className="NoteList__time" dateTime={date.toISOString()}>
            {dateString}
          </time>
        </Link>
      </li>
    );
  };

  return <div className="NoteList">{renderList()}</div>;
}

export default NoteList;
