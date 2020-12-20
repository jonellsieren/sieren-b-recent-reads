import React, { useState } from "react";
import { Delete, Edit } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import ErrorMessage from "./error-message";
import { usersCollection } from "../data/firebase";
import "./book.css";
import coverImage from "../images/book_sample.jpg";

function Book(props) {
  const { id, data, userId } = props;
  const {
    title,
    author,
    yearPublished,
    rating,
    purchaseLink,
    review,
    editedAt,
  } = data;
  console.log(editedAt.toDate());

  const ratingString = "🔸".repeat(rating) + "▫️".repeat(5 - rating);
  const history = useHistory();
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const deleteBook = async () => {
    setIsDeleting(true);
    setErrorMessage("");
    try {
      const docRef = usersCollection.doc(userId).collection("books").doc(id);
      await docRef.delete();
    } catch (error) {
      console.error(error);
      setErrorMessage("Oh no! Something happened! Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="book">
      <div className="book__contents">
        <div className="book__title">{title}</div>
        <div className="book__author">by {author}</div>
        <div className="book__year">Year:{yearPublished}</div>
        <div className="book__rating">Rating:{ratingString}</div>
        <div className="book__purchase">
          <a href={purchaseLink}>Purchase Book</a>{" "}
        </div>
        <div className="book__review">
          Review: {review ? review : "No review saved."}
        </div>
        <img src={coverImage} alt="sample image" width="50" />
        <div className="book__date">
          Book added:
          {editedAt.toDate().toDateString()}
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
