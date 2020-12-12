import React, { useState, useEffect } from "react";
import ErrorMessage from "./error-message";
import { provider, auth } from "../data/firebase";
import "./account-info.css";

function AccountInfo(props) {
  const { user } = props;
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      setErrorMessage("Oh no! Please try that again");
      console.error(error);
    }
    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await auth.signOut();
    } catch (error) {
      setErrorMessage("Oh no! You didn't log out, Please try that again");
      console.error(error);
    }
    setIsLoading(false);
  };

  let contents;
  if (user) {
    const { displayName } = user;
    contents = (
      <>
        <p>Welcome back, {displayName}! Ready to go? log out below.</p>
        <button
          className="login-form__button"
          onClick={signOut}
          disabled={isLoading}
        >
          {isLoading ? "Logging Out..." : "Log Out"}
        </button>
      </>
    );
  } else {
    contents = (
      <>
        <p>
          Log in or create a new account by linking your Google account. Follow
          the instructions in the pop up window.{" "}
        </p>
        <button
          className="login-form__button"
          onClick={signIn}
          disabled={isLoading}
        >
          {isLoading ? "Logging In..." : "Log In"}
        </button>
      </>
    );
  }

  return (
    <div className="account-container">
      <h1>Account Info</h1>
      <div className="login-form">
        <h2>Social Login</h2>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {contents}
      </div>
    </div>
  );
}

export default AccountInfo;
