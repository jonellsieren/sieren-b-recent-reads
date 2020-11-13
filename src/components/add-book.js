import React, { useState } from "react";
import firebase from "firebase/app";
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
        createdAt: firebase.firestore.Timestamp.now(),
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
      <h1>Add Book</h1>
      <BookForm
        onSubmit={onBookSubmit}
        isSaving={isSaving}
        message={formMessage}
      />
    </div>
  );
}

export default AddBook;
