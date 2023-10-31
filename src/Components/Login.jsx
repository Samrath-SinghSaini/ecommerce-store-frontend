/* eslint-disable react/prop-types */
import { Link, Form, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";
import { setDefaultHeader } from "../axiosConfig";
import cookieParser from "cookie-parser";
function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  let cookie = cookieParser();
  let navigate = useNavigate();
  function handleForm(event) {
    event.preventDefault();
    if (password.length == 0 || username.length == 0) {
      setSubmitMessage("Password or Username is empty");
    } 
    else {
      let loginData = {
        username: username,
        password: password,
      };
      axios
        .post("/api/user/login", loginData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          // console.log(res);
          let cookieValues = document.cookie;

          let authCookie = document.cookie.split("; ").find((item) => {
            return item.startsWith("isLoggedIn");
          });
          // console.log(authCookie)
          let authCookieVal = authCookie.split("=")[1];
          // console.log("this is auth cookie");
          // console.log(authCookieVal);
          // console.log("this is the auth cookie --" + authCookieVal);
          if (res.data.authenticated === true && res.status === 200) {
            setSubmitMessage("You have been authenticated successfully");
            // console.log("res token val");
            // console.log(res.data);
            if (res.data.isAdmin) {
              props.changeIsAdmin(true);
            }
            props.changeLogInState(authCookieVal);
            props.setUsername(username)
            
            props.redirectPage("products", authCookieVal);
          } else {
            setSubmitMessage("try again later");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            setSubmitMessage(err.response.data.message);
          } else {
            setSubmitMessage("try again later");
          }
        });
    }
  }

  function setValue(event) {
    let target = event.target.name;
    if (target == "username") {
      setUsername(event.target.value);
    } else if (target == "password") {
      setPassword(event.target.value);
    }
  }
  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <form
            className="login-form"
            action="/"
            method="post"
            onSubmit={(e) => handleForm(e)}
          >
            <h1 className="login-heading">Login</h1>
            <div className="login-section">
              <label className="login-lbl">Username: </label>
              <input
                className="login-input"
                type="text"
                name="username"
                value={username}
                onChange={(event) => {
                  setValue(event);
                }}
              ></input>
            </div>
            <div className="login-section">
              <label className="login-lbl">Password: </label>
              <input
                className="login-input"
                type="password"
                name="password"
                value={password}
                onChange={(event) => {
                  setValue(event);
                }}
              ></input>
            </div>
            <div className="login-btn-container">
              <button className="login-btn" type="submit">
                Submit
              </button>
              <Link to="/" className="forgot-pass">
                Forgot Password?
              </Link>
              <p className="login-submit-message">{submitMessage}</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
