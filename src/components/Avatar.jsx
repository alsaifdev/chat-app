import React from "react";

const Avatar = ({ url, size }) => {
  return (
    <img className="avatar" src={url} style={{ width: size, height: size }} />
  );
};

export default Avatar;
