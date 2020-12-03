import { useState } from "react";
import { booksCollection } from "../data/firebase";

function useSaveBook() {
  const [isSaving, setIsSaving] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const save = async (bookData, id) => {
    setIsSaving(true);
    setFormMessage("");

    try {
      await booksCollection.doc(id).set(bookData);
      setFormMessage("Saved successfully!");
    } catch (error) {
      setFormMessage(
        "Something went wrong editing this book. Please try again."
      );
      console.error(error);
    }
    setIsSaving(false);
  };
  return [save, isSaving, formMessage];
}

export default useSaveBook;
