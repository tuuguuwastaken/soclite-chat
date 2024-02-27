import React from 'react';

const OutgoingMsg = ({ user, body }) => {
  return (
    <div className='outgoing-chat'>
      <div className='body'>{body}</div>
      <div className='user'>{user}</div>
    </div>
  );
};

export default OutgoingMsg;
