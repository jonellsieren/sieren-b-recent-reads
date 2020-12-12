import React from "react";
import LoadingSpinner from "./loading-spinner";
import ErrorMessage from "./error-message";
import useAllBooks from "../hooks/use-all-books";
import Book from "./book";
import "./book-listing.css";

function BookListing(props) {
  const userId = props.user.uid;
  const [books, isLoading, errorMessage] = useAllBooks(userId);
  return (
    <div className="books-container">
      <h1>RECENT READS</h1>
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
      <ul className="book-list">
        {books.map((bookDoc) => {
          const bookId = bookDoc.id;
          const bookData = bookDoc.data();
          return (
            <li key={bookId}>
              <Book id={bookId} data={bookData} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BookListing;
