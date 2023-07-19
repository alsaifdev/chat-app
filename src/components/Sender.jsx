import React from "react";

const Sender = ({ message }) => {
  return (
    <div className="chat-list d-flex justify-content-end gap-2 mb-3">
      <div className="chat-list-width text-white rounded">{message}</div>
    </div>
  );
};

export default Sender;
