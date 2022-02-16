import React from 'react';

function Sidebar({ project }) {
  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRight: 'solid 1px',
        padding: '1rem',
        background: 'navajowhite',
      }}
    >
      <h3>{project.title}</h3>
      <button>My Work</button>
      <button>Current Sprint</button>
      <button>Backlog</button>
      <button>Done</button>
      <br />
      <small>sidebar</small>
    </nav>
  );
}

export default Sidebar;
