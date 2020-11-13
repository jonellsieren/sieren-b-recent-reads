import React, { useState } from "react";
import { Delete, Edit } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import ErrorMessage from "./error-message";
import { booksCollection } from "../data/firebase";
import "./book.css";

function Book(props) {
  const { id, data } = props;
  const { title, author, yearPublished, rating, purchaseLink, review } = data;

  const ratingString = "💜".repeat(rating) + "🖤".repeat(5 - rating);
  const history = useHistory();
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const deleteBook = async () => {
    setIsDeleting(true);
    setErrorMessage("");
    try {
      const docRef = booksCollection.doc(id);
      await docRef.delete();
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="book">
      <div className="book__contents">
        <div className="book__title">{title}</div>
        <div className="book__author">{author}</div>
        <div className="book__year">{yearPublished}</div>
        <div className="book__rating">{ratingString}</div>
        <div className="book__purchase">{purchaseLink}</div>
        <div className="book__review">
          {review ? review : "No review saved."}
        </div>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
      <div>
        <button
          className="book__button"
          disabled={isDeleting}
          onClick={deleteBook}
        >
          <Delete />
        </button>
        <button
          className="book__button"
          onClick={() => history.push(`/edit/${id}`)}
        >
          <Edit />
        </button>
      </div>
    </div>
  );
}

export default Book;
