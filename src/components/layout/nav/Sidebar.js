import React from 'react';

function Sidebar({ title, navigation }) {
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
      <h3>{title}</h3>
      <button onClick={navigation('user')}>My Work</button>
      <button onClick={navigation('current')}>Current Sprint</button>
      <button onClick={navigation('backlog')}>Backlog</button>
      <button onClick={navigation('archive')}>Done</button>
      <br />
      <small>sidebar</small>
    </nav>
  );
}

export default Sidebar;
