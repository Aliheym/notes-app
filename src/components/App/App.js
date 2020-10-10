import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import TaskBar from '../TaskBar';
import NotePanel from '../NotePanel';
import NoteList from '../NoteList';

import './index.css';

function App() {
  const initialState = [];
  const [notes, setNotes] = useState(initialState);

  useEffect(() => {
    const savedNotes = JSON.parse(window.localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = ({ id, title, content }) => {
    let noteIndex = notes.length;
    let note;

    if (id == null) {
      note = {
        id: uuid(),
        createdAt: Date.now(),
      };
    } else {
      noteIndex = notes.findIndex((note) => note.id === id);
      note = notes[noteIndex];
    }

    note = {
      ...note,
      title,
      content,
    };

    setNotes([
      ...notes.slice(0, noteIndex),
      note,
      ...notes.slice(noteIndex + 1),
    ]);
  };

  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  return (
    <Router>
      <div className="App">
        <div className="App__title">Notes App</div>
        <TaskBar />

        <Switch>
          <Route exact path="/new">
            <NotePanel isNew onSave={handleSaveNote} key={true} />
          </Route>
          <Route exact path="/note/:noteId">
            <NotePanel
              notes={notes}
              onSave={handleSaveNote}
              onDelete={handleDeleteNote}
              key={false}
            />
          </Route>
          <Route exact path="/notes">
            <NoteList notes={notes} />
          </Route>
          <Redirect to="/new" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
