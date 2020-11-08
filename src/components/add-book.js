import React, { useState } from "react";
import "./add-book.css";
import MovieForm from "./book-form";
import { moviesCollection } from "../data/firebase";

function AddMovie() {
  const [isSaving, setIsSaving] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const onMovieSubmit = async (title, rating, releaseYear) => {
    // alert(`You want to add ${title}, ${rating}, ${releaseYear}.`);
    setIsSaving(true);
    setFormMessage("");

    try {
      await moviesCollection.add({
        title,
        rating,
        releaseYear,
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
        onSubmit={onMovieSubmit}
        isSaving={isSaving}
        message={formMessage}
      />
    </div>
  );
}

export default AddMovie;
