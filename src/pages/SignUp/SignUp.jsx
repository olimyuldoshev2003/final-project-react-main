import React from "react";
import styles from "./SignUp.module.css";
import Input from "../../Components/Input/Input";
import InputPassword from "../../Components/InputPassword/InputPassword";

const SignUp = () => {
  return (
    <>
      <div className={`${styles.sign_up}`}>
        <form action="" className={`${styles.form}`}>
          <div className={`${styles.for_h1}`}>
            <h1>Sign Up</h1>
          </div>
          <div className={`${styles.label_input}`}>
            <Input type="text" placeholderInput={`Enter your username`} />
          </div>
          <div className={`${styles.label_input}`}>
            <Input type="email" placeholderInput={`Enter your email`} />
          </div>
          <div className={`${styles.label_input}`}>
            <InputPassword placeholderInpPassword={`Enter your password`} />
          </div>
          <div className={`${styles.label_input}`}>
            <InputPassword placeholderInpPassword={`Confirm your password`} />
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
