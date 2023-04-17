import React from "react";

const ReplyCard = ({ name, replyText }) => {
  return (
    <div className="card">
      <h5 className="card-header" style={{float:"left",display:"flex"}}>{name}</h5>
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">{replyText}</p>
      </div>
    </div>
  );
};

export default ReplyCard;
