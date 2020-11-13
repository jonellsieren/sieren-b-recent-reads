import React, { useState } from "react";
import "./add-book.css";
import BookForm from "./book-form";
import { booksCollection } from "../data/firebase";

function AddBook() {
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
    // alert(`You want to add ${title}, ${author), ${yearPublished}, ${rating}, ${purchaseLink}, ${review}.`);
    setIsSaving(true);
    setFormMessage("");

    try {
      await booksCollection.add({
        title,
        author,
        yearPublished,
        rating,
        purchaseLink,
        review,
      });
      setFormMessage("Saved successfully!");
      console.log("Saved!");
    } catch (error) {
      setFormMessage("Something went wrong. Pleaase try again!");
      console.error(error);
    }

    setIsSaving(false);
  };
  return (
    <div className="add-container">
      <h1>Add Movie</h1>
      <MovieForm
        onSubmit={onBookSubmit}
        isSaving={isSaving}
        message={formMessage}
      />
    </div>
  );
}

export default AddBook;
