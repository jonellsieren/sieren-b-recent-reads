import React, { useState } from "react";
import ErrorMessage from "./error-message";
import "./book-form.css";

function BookForm(props) {
  const { initialState = {}, message, isSaving, onSubmit } = props;

  if (initialState.title === undefined) initialState.title = "";
  if (initialState.author === undefined) initialState.author = "";
  if (initialState.yearPublished === undefined) initialState.yearPublished = "";
  if (initialState.rating === undefined) initialState.rating = "";
  if (initialState.purchaseLink === undefined) initialState.purchaseLink = "";
  if (initialState.review === undefined) initialState.review = "";

  const [title, setTitle] = useState(initialState.title);
  const [author, setAuthor] = useState(initialState.author);
  const [yearPublished, setYearPublished] = useState(
    initialState.yearPublished
  );
  const [rating, setRating] = useState(initialState.rating);
  const [purchaseLink, setPurchaseLink] = useState(initialState.purchaseLink);
  const [review, setReview] = useState(initialState.review);
  const [errorMessage, setErrorMessage] = useState("");

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const onAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const onYearPublishedChange = (event) => {
    setYearPublished(event.target.value);
  };
  const onRatingChange = (event) => {
    setRating(event.target.value);
  };
  const onPurchaseLinkChange = (event) => {
    setPurchaseLink(event.target.value);
  };
  const onReviewChange = (event) => {
    setReview(event.target.value);
  };

  const onBookSubmit = async (event) => {
    event.preventDefault();
    onSubmit(title, author, yearPublished, rating, purchaseLink, review);
  };

  return (
    <form className="book-form" onSubmit={onBookSubmit}>
      <h2 className="book-form__title">Book Details</h2>
      {message && <p className="book-form__message">{message}</p>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <fieldset className="book-form__controls" disabled={isSaving}>
        <label className="book-form__label">Book Title:</label>
        <input
          className="book-form__input"
          type="text"
          value={title}
          onChange={onTitleChange}
        />
        <label className="book-form__label">Author:</label>
        <input
          className="book-form__input"
          type="text"
          value={author}
          onChange={onAuthorChange}
        />
        <label className="book-form__label">Year Published:</label>
        <input
          className="book-form__input"
          type="number"
          value={yearPublished}
          onChange={onYearPublishedChange}
        />
        <label className="book-form__label">Rating:</label>
        <input
          className="book-form__input"
          type="number"
          value={rating}
          onChange={onRatingChange}
        />
        <label className="book-form__label">Purchase:</label>
        <input
          className="book-form__input"
          type="text"
          value={purchaseLink}
          onChange={onPurchaseLinkChange}
        />
        <label className="book-form__label">Review:</label>
        <input
          className="book-form__input"
          type="text"
          value={review}
          onChange={onReviewChange}
        />
        <input
          className="book-form__submit"
          type="submit"
          value={isSaving ? "Saving..." : "Save"}
        />
      </fieldset>
    </form>
  );
}

export default BookForm;
