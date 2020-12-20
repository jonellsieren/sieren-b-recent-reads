import React, { useState } from "react";
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
    const { displayName, nickname, userBio } = user;

    contents = (
      <>
        <p>Welcome back, {displayName}! Ready to go? log out below.</p>
        <p>
          {" "}
          Nickname:{nickname} Bio: {userBio}
        </p>

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
  //
  const { initialState = {}, message, isSaving, onUserSubmit } = props;
  const [nickname, setNickname] = useState(initialState.nickname);
  const [userBio, setUserBio] = useState(initialState.userBio);

  if (initialState.nickname === undefined) initialState.nickname = "";
  if (initialState.userBio === undefined) initialState.userBio = "";

  const onNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const onUserBioChange = (event) => {
    setUserBio(event.target.value);
  };

  //

  return (
    <div className="account-container">
      <h1>Account Info</h1>
      <div className="login-form">
        <h2>Google Login</h2>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {contents}
      </div>
      <form className="login-form" onSubmit={onUserSubmit}>
        {message && <p className="login-form_message">{message}</p>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <fieldset className="login-form_controls" disabled={isSaving}>
          <label className="login-form__label">Nickname:</label>
          <input
            className="login-form__input"
            type="text"
            value={nickname}
            onChange={onNicknameChange}
          />
          <label className="login-form__label">Bio:</label>
          <input
            className="login-form__input"
            type="text"
            value={userBio}
            onChange={onUserBioChange}
          />
          <input
            className="login-form__submit"
            type="submit"
            value={isSaving ? "Saving..." : "Save"}
          />
          <p>
            Nickname:{nickname} Bio: {userBio}
          </p>
        </fieldset>
      </form>
    </div>
  );
}

export default AccountInfo;
