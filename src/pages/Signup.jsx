import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { set, ref } from "firebase/database";
import { database, storage } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import {
  ref as imgref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { signup } = useAuth();
  function getImage(file) {
    const storageRef = imgref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (image === null) return;
    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      let username = "@" + email.split("@")[0];
      set(ref(database, "users/" + username), {
        username,
        email: email,
        profile: image,
        fullname: name,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to create an account!");
    }
  }
  return (
    <>
      <main className="form-signin  w-100 h-100vh flex-center">
        <form className="w-100 p-4" onSubmit={handleSubmit}>
          <h1 className=" fw-normal text-center mb-5">Please Signup</h1>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Abdullah Al Saif"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="floatingInput">Full Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="mb-3">
            <label htmlFor="formFileMultiple" className="form-label">
              Choose an Avatar
            </label>
            <input
              className="form-control"
              type="file"
              id="formFileMultiple"
              onChange={(e) => getImage(e.target.files[0])}
            />
          </div>
          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit">
            Sign Up
          </button>
          <p className="mt-3 mb-3 text-body-secondary text-center">
            Alrady have an account?
            <Link className="ms-3" to="/login">
              Login
            </Link>
          </p>
          <p className="mt-5 mb-3 text-body-secondary text-center">
            &copy; 2023
          </p>
        </form>
      </main>
    </>
  );
};

export default Signup;
