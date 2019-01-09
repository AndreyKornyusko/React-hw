import React from 'react';

const CommentForm = ({ addComment, handleChange, text }) => (
  <>
    <p>Комментарии</p>

    <form onSubmit={addComment}>
      <textarea
        rows="5"
        cols="45"
        name="text"
        value={text}
        onChange={handleChange}
        placeholder="Add your comment"
      />
      <button type="submit">Добавить комментарий</button>
    </form>
  </>
);

export default CommentForm;
