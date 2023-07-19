import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <header className="bg-white px-4 py-4 ">
        <div className="mx-auto  d-flex align-items-center justify-content-between">
          <h1 className="fs-3xl fw-bold text-gray-900">Chats</h1>
          <i
            className="fw-bold text-gray-900 bx icon-back bx-log-out-circle"
            onClick={() => {
              logout()
              navigate("/login")
            }}
          ></i>
        </div>
        <div className="position-relative search-box">
          <input
            type="search"
            className="form-control rounded-pill h-100 ps-5 fw-bolder"
            placeholder="Serach"
          />
          <i className="bx bx-search position-absolute top-0 left-0 flex-center"></i>
        </div>
      </header>
    </>
  );
};

export default Header;
