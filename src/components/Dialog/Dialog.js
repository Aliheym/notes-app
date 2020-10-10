import React from 'react';

import './index.css';

function Dialog(props) {
  const { open = false, onSubmit, onCancel, children } = props;

  if (!open) return null;

  return (
    <div className="Dialog">
      <div className="Dialog__container">
        <div className="Dialog__content">{children}</div>
        <div className="Dialog__footer">
          <button className="Dialog__btn" type="button" onClick={onSubmit}>
            Ok
          </button>
          <button
            className="Dialog__btn Dialog__btn--cancel"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
