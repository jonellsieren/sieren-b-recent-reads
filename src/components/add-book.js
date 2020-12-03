import React from "react";
import useSaveBook from "../hooks/use-save-book";
import BookForm from "./book-form";
import "./add-book.css";

function AddBook() {
  const [save, isSaving, formMessage] = useSaveBook();

  const onBookSumbit = async (
    title,
    author,
    yearPublished,
    rating,
    purchaseLink,
    review
  ) => {
    save({ title, author, yearPublished, rating, purchaseLink, review });
  };

  return (
    <div className="add-container">
      <h1>Add Book</h1>
      <BookForm
        onSubmit={onBookSumbit}
        isSaving={isSaving}
        message={formMessage}
      />
    </div>
  );
}

export default AddBook;
