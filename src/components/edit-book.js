import React, { useState, useEffect } from "react";
import "./edit-book.css";
import ErrorMessage from "./error-message";
import LoadingSpinner from "./loading-spinner";
import BookForm from "./book-form";
import { booksCollection } from ".data/firebase";

function EditBook(props) {
  const { id } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookData, setBookData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    async function getBook() {
      setIsLoading(true);
      try {
        const bookSnapshot = await booksCollection.doc(id).get();

        if (!bookSnapshot.exists) {
          throw new Error("No such movie exists!");
        }
        const data = movieSnapshot.data();
        setBookData(data);
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again");
        console.error(error);
      }
      setIsLoading(false);
    }
    getBook();
  }, [id]);

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
