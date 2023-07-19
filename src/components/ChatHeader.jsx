import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
const ChatHeader = ({ username, profile, name }) => {
  const navigate = useNavigate();
  return (
    <div className="chat-head px-3 py-2 bg-light position-fixed top-0 left-0 w-100">
      <div className="left d-flex align-items-center gap-2">
        <i
          className="bx bx-arrow-back icon-back"
          onClick={() => navigate("/")}
        ></i>
        <Avatar size={45} url={profile} />
        <div>
          <h4 className="p-0 m-0">{name}</h4>
          <p className="p-0 m-0">{username}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
