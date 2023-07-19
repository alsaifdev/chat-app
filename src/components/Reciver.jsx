import React from "react";
import Avatar from "./Avatar";
const Reciver = ({ message, profile }) => {
  return (
    <div className="chat-list d-flex align-items-end gap-2 mb-3">
      <Avatar size={35} url={profile} />
      <div className="chat-list-width text-white rounded">{message}</div>
    </div>
  );
};

export default Reciver;
