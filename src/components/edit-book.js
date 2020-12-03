import React, { useState, useEffect } from "react";
import { booksCollection } from "../data/firebase";
import useBook from "../hooks/use-book";
import ErrorMessage from "./error-message";
import LoadingSpinner from "./loading-spinner";
import BookForm from "./book-form";
import "./edit-book.css";

function EditBook(props) {
  const { id } = props;
  const [bookData, isLoading, errorMessage] = useBook(id);
  const [isSaving, setIsSaving] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const onBookSubmit = async (
    title,
    author,
    yearPublished,
    rating,
    purchaseLink,
    review
  ) => {
    setIsSaving(true);
    setFormMessage("");
    try {
      await booksCollection.doc(id).set({
        title,
        author,
        yearPublished,
        rating,
        purchaseLink,
        review,
      });
      setFormMessage("Saved successfully!");
    } catch (error) {
      setFormMessage(
        "Something went wrong editing this book. Please try again."
      );
      console.error(error);
    }
    setIsSaving(false);
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
