import { useState } from 'react';
import './MessageNotification.css';
import { FaEnvelope, FaCircle } from 'react-icons/fa';

export default function MessageNotification() {
  const [unreadMessages, setUnreadMessages] = useState(9);

  // function to handle receiving a new message
  function receiveMessage() {
    setUnreadMessages(prevUnreadMessages => prevUnreadMessages + 1);
  }

  return (
    <div className="message-notification">
      <div className="notification-wrapper">
        <FaEnvelope className="envelope-icon" />
        {unreadMessages > 0 &&
          <span className="badge">{unreadMessages}</span>
        }
      </div>
    </div>
  );
}
