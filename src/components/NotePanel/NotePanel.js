import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FaSave, FaTrash, FaMarkdown } from 'react-icons/fa';
import remark from 'remark';
import remark2react from 'remark-react';

import NoteEditor from '../NoteEditor';
import Dialog from '../Dialog';

import './index.css';

function NotePanel({ isNew, notes, onSave, onDelete }) {
  const history = useHistory();
  const { noteId } = useParams();

  let note = null;

  if (noteId != null) {
    note = notes.find((note) => note.id === noteId);

    if (!note) {
      history.push('/');
    }
  }

  const [isEdit, setIsEdit] = useState(true);
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');

  const handleSave = () => {
    if (!noteId && !title) {
      setIsTitleModalOpen(true);
      return;
    }

    setIsTitleModalOpen(false);

    onSave({
      id: noteId,
      title,
      content,
    });

    if (isNew) {
      history.push('/notes');
    }
  };

  const handleDelete = () => {
    onDelete(noteId);
    history.push('/notes');
  };

  const handleInputEditor = (content) => {
    setContent(content);
  };

  const handleInputTitle = (evt) => {
    setTitle(evt.target.value);
  };

  const handleCancelTitleModal = () => {
    setIsTitleModalOpen(false);
    setTitle('');
  };

  const saveActionDisabled =
    (isNew && content === '') || (note && content === note.content);

  return (
    <>
      <div className="NotePanel">
        <div className="NotePanel__sidebar">
          <h2 className="NotePanel__title">{note ? note.title : 'Untitled'}</h2>
          <ul className="NotePanel__list">
            <li>
              <button
                className="NotePanel__action"
                type="button"
                disabled={saveActionDisabled}
                onClick={handleSave}
              >
                <FaSave /> Save
              </button>
            </li>
            <li>
              <button
                className="NotePanel__action"
                type="button"
                disabled={!onDelete}
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <FaTrash /> Delete
              </button>
            </li>
            <li>
              <button
                className="NotePanel__action"
                type="button"
                disabled={!content}
                onClick={() => setIsEdit(!isEdit)}
              >
                <FaMarkdown /> {isEdit ? 'View' : 'Edit'}
              </button>
            </li>
          </ul>
        </div>

        <div className="NotePanel__content">
          {isEdit ? (
            <NoteEditor content={content} onInput={handleInputEditor} />
          ) : (
            remark().use(remark2react).processSync(content).result
          )}
        </div>
      </div>
      <Dialog
        open={isTitleModalOpen}
        onSubmit={handleSave}
        onCancel={handleCancelTitleModal}
      >
        <label className="Dialog__label">
          Input a note title:
          <input
            className="Dialog__input"
            type="text"
            placeholder="E.g. My first note."
            value={title}
            onChange={handleInputTitle}
          />
        </label>
      </Dialog>
      <Dialog
        open={isDeleteModalOpen}
        onSubmit={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      >
        <p className="Dialog__text">Delete this note?</p>
      </Dialog>
    </>
  );
}

export default NotePanel;
