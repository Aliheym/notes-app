import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaFolderOpen } from 'react-icons/fa';

import './index.css';

class TaskBar extends React.Component {
  render() {
    return (
      <div className="TaskBar">
        <ul className="TaskBar__list">
          <li>
            <Link className="TaskBar__action" to="/new">
              <FaPlus />
              New Note
            </Link>
          </li>
          <li>
            <Link className="TaskBar__action" to="/notes">
              <FaFolderOpen />
              All Notes
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default TaskBar;
