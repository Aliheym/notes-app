import React, { useRef, useEffect } from 'react';

import './index.css';

function NoteEditor(props) {
  const { content, onInput } = props;
  const elementRef = useRef();

  useEffect(() => {
    const element = elementRef.current;

    if (element) {
      element.selectionStart = element.selectionEnd = element.value.length;
    }
  }, []);

  const handleChange = (evt) => {
    onInput(evt.target.value);
  };

  return (
    <div className="NoteEditor">
      <textarea
        ref={elementRef}
        className="NoteEditor__area"
        value={content}
        onChange={handleChange}
        autoFocus
      />
    </div>
  );
}

export default NoteEditor;
