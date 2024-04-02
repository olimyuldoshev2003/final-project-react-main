import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../../store/features/auth/auth";
import styles from "./SignIn.module.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(({ auth }) => auth.loading);
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
    dispatch(handleLogin(login, password, navigate));
  };

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>Sign in</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <input
              placeholder="user"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              onFocus={() => setValidation({ ...validation, login: false })}
              onBlur={() => setValidation({ ...validation, login: true })}
            />
            {login === "" && validation.login && (
              <span className={styles.not_validate}>Required fields</span>
            )}
          </div>
          <div className={styles.field}>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onFocus={() => setValidation({ ...validation, password: false })}
              onBlur={() => setValidation({ ...validation, password: true })}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password === "" && validation.password && (
              <span className={styles.not_validate}>Required fields</span>
            )}
          </div>
          <button
            disabled={validateCheck()}
            className={styles.btn_confirm}
            type="submit"
          >
            {loading ? "Loading..." : "Confirm"}
          </button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
