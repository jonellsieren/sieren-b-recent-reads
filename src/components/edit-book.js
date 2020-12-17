import React from "react";
import { firebase } from "../data/firebase.js";
import useBook from "../hooks/use-book";
import useSaveBook from "../hooks/use-save-book";
import ErrorMessage from "./error-message";
import LoadingSpinner from "./loading-spinner";
import BookForm from "./book-form";
import "./edit-book.css";

function EditBook(props) {
  const bookId = props.id;
  const userId = props.user.uid;
  const [bookData, isLoading, errorMessage] = useBook(userId, bookId);
  const [save, isSaving, formMessage] = useSaveBook();

  const onBookSubmit = async (
    title,
    author,
    yearPublished,
    rating,
    purchaseLink,
    review
  ) => {
    save(
      {
        title,
        author,
        yearPublished,
        rating,
        purchaseLink,
        review,
        editedAt: firebase.firestore.Timestamp.now(),
      },
      userId,
      bookId
    );
  };

  return (
    <div className="edit-container">
      <h2>Edit Book</h2>
      {isLoading && (
        <LoadingSpinner
          size="50px"
          spinnerColor="white"
          backgroundColor="rgb(255, 255, 255, 0.2)"
        />
      )}
      {errorMessage && (
        <ErrorMessage displayAsCard>{errorMessage}</ErrorMessage>
      )}
      {bookData && (
        <BookForm
          initialState={bookData}
          onSubmit={onBookSubmit}
          isSaving={isSaving}
          message={formMessage}
        />
      )}
    </div>
  );
}

export default EditBook;
