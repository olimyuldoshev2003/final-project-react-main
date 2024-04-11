import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleSignUp } from "../../api/api";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(localStorage.getItem("user"));

  const loading = useSelector((store) => store.signUpState.loading);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [validation, setValidation] = useState({
    userName: false,
    email: false,
    password: false,
    // confirmPassword: false,
  });

  const validateCheck = () => {
    return (
      userName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      loading
    );
  };

  return (
    <>
      <div className={`${styles.sign_up}`}>
        <form
          action=""
          className={`${styles.form}`}
          onSubmit={(event) => {
            event.preventDefault();

            if (
              userName.trim().length === 0 ||
              email.trim().length === 0 ||
              password.trim().length === 0
              // confirmPassword.trim().length === 0
            ) {
              alert("Error");
            } else {
              let newUser = {
                userName: userName,
                email: email,
                password: password,
                // confirmPassword: confirmPassword,
              };
              dispatch(handleSignUp(newUser, navigate));
            }
          }}
        >
          <div className={`${styles.for_h1}`}>
            <h1>Sign Up</h1>
          </div>
          <div className={`${styles.label_input}`}>
            <input
              type="text"
              placeholder={`Enter your user name`}
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              onFocus={() => setValidation({ ...validation, userName: false })}
              onBlur={() => setValidation({ ...validation, userName: true })}
              required
              />
            {userName === "" && validation.userName && (
              <span className={styles.not_validate}>Required field</span>
            )}
          </div>
          <div className={`${styles.label_input}`}>
            <input
              type="email"
              placeholder={`Enter your email`}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onFocus={() => setValidation({ ...validation, email: false })}
              onBlur={() => setValidation({ ...validation, email: true })}
              required
            />
            {email === "" && validation.email && (
              <span className={styles.not_validate}>Required field</span>
            )}
          </div>
          <div className={`${styles.label_input}`}>
            <input
              type="password"
              placeholder={`Enter your password`}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onFocus={() => setValidation({ ...validation, password: false })}
              onBlur={() => setValidation({ ...validation, password: true })}
              required
            />
            {password === "" && validation.password && (
              <span className={styles.not_validate}>Required field</span>
            )}
          </div>
          {/* <div className={`${styles.label_input}`}>
            <input
              type="password"
              placeholder={`Confirm your password`}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              onFocus={() =>
                setValidation({ ...validation, confirmPassword: false })
              }
              onBlur={() =>
                setValidation({ ...validation, confirmPassword: true })
              }
            />
            {confirmPassword === "" && validation.confirmPassword && (
              <span className={styles.not_validate}>Required field</span>
            )}
          </div> */}
          <div className={`${styles.for_link}`}>
            <Link to={`/signin`}>Sign In</Link>{" "}
            <span>if you have an account</span>
          </div>
          <div className={`${styles.for_btn}`}>
            <button
              disabled={validateCheck()}
              className={styles.btn_confirm}
              type="submit"
            >
              {loading ? "Loading..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
