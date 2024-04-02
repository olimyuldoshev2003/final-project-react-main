import React, { useState } from "react";
import styles from "./SignUp.module.css";
import Input from "../../Components/Input/Input";
import InputPassword from "../../Components/InputPassword/InputPassword";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleSignUp } from "../../api/api";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((store) => store.signUpState.loading);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validation, setValidation] = useState({
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

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
              password.trim().length === 0 ||
              confirmPassword.trim().length === 0
            ) {
              alert("Error");
            } else {
              let newUser = {
                userName: userName,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
              };
              dispatch(handleSignUp(newUser, navigate));
            }
          }}
        >
          {/* <div className={styles.field}> */}
          <div className={`${styles.for_h1}`}>
            <h1>Sign Up</h1>
          </div>
          <div className={`${styles.label_input}`}>
            <Input
              type="text"
              placeholderInput={`Enter your username`}
              value={userName}
              onChangeValue={(event) => setUserName(event.target.value)}
              // onFocus={setValidation({ ...validation, userName: false })}
              // onBlur={setValidation({ ...validation, userName: true })}
            />
            {userName === "" && validation.userName && (
              <span className={styles.not_validate}>Required fields</span>
            )}
          </div>
          <div className={`${styles.label_input}`}>
            <input
              type="email"
              placeholder={`Enter your email`}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              // onFocus={setValidation({ ...validation, email: false })}
              // onBlur={setValidation({ ...validation, email: true })}
            />
            {email === "" && validation.email && (
              <span className={styles.not_validate}>Required fields</span>
            )}
          </div>
          <div className={`${styles.label_input}`}>
            <InputPassword
              placeholderInpPassword={`Enter your password`}
              value={password}
              onChangeValue={(event) => setPassword(event.target.value)}
              // onFocus={setValidation({ ...validation, password: false })}
              // onBlur={setValidation({ ...validation, password: true })}
            />
            {password === "" && validation.password && (
              <span className={styles.not_validate}>Required fields</span>
            )}
          </div>
          <div className={`${styles.label_input}`}>
            <InputPassword
              placeholderInpPassword={`Confirm your password`}
              value={confirmPassword}
              onChangeValue={(event) => setConfirmPassword(event.target.value)}
              // onFocus={setValidation({ ...validation, confirmPassword: false })}
              // onBlur={setValidation({ ...validation, confirmPassword: true })}
            />
            {confirmPassword === "" && validation.confirmPassword && (
              <span className={styles.not_validate}>Required fields</span>
            )}
          </div>

          <div className={`${styles.for_link}`}>
            <Link to={``}>Forget password</Link>
            <Link to={`/signin`}>Sign In</Link>
          </div>
          <div className={`${styles.for_btn}`}>
            <Button variant="outlined" type="submit" color="primary">
              {loading ? "Loading..." : "Confirm"}
            </Button>
          </div>
          {/* </div> */}
        </form>
      </div>
    </>
  );
};

export default SignUp;
