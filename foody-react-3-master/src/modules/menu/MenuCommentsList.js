import React from 'react';

const CommentsList = ({ notes }) => (
  <ul>
    {notes.map(({ id, text }) => (
      <li key={id}>
        <span>{text}</span>
      </li>
    ))}
  </ul>
);

export default CommentsList;
