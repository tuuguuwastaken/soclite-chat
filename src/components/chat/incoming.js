import React from 'react';

const IncomingMsg = ({ user, body }) => {
  return (
    <div className='incoming-chat'>
      <div className='body'>{body}</div>
      <div className='user'>{user}</div>
    </div>
  );
};

export default IncomingMsg;
