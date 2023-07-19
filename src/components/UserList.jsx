import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
const UserList = ({ fullname, profile, username }) => {
  return (
    <Link
      to={`chat/${username}`}
      className="user-list d-flex align-items-center justify-content-between px-4 mb-4"
    >
      <div className="list-left d-flex align-items-center gap-2">
        <Avatar url={profile} size={50} />
        <div>
          <h4 className="p-0 m-0">{fullname}</h4>
          <p className="p-0 m-0">{username}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserList;
