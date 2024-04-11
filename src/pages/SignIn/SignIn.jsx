import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../../store/features/auth/auth";
import styles from "./SignIn.module.css";
import { registeredUsers } from "../../api/api";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(({ auth }) => auth.loading);
  const users = useSelector((store) => store.auth.users);


  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({
    login: false,
    password: false,
  });

  const validateCheck = () => {
    return login.trim() === "" || password.trim() === "" || loading;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogin(login, password, navigate, users));
    dispatch(registeredUsers())
  };


  return (
    <>
      <div className={styles.sign_in}>
        <form className={`${styles.form}`} onSubmit={handleSubmit}>
          <div className={`${styles.for_h1}`}>
            <h1 className={styles.title}>Sign In</h1>
          </div>
          <div className={styles.label_input}>
            <input
              placeholder="user"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              onFocus={() => setValidation({ ...validation, login: false })}
              onBlur={() => setValidation({ ...validation, login: true })}
              required
            />
            {login === "" && validation.login && (
              <span className={styles.not_validate}>Required fields</span>
            )}
          </div>
          <div className={styles.label_input}>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onFocus={() => setValidation({ ...validation, password: false })}
              onBlur={() => setValidation({ ...validation, password: true })}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {password === "" && validation.password && (
              <span className={styles.not_validate}>Required fields</span>
            )}
          </div>
          <div className={`${styles.for_link}`}>
            <Link to={``}>Forgot password?</Link>
            <Link to={`/signup`}>Sign Up</Link>
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

export default SignIn;
