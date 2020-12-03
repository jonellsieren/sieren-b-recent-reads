import { useState } from "react";
import { booksCollection } from "../data/firebase";

function useSaveBook() {
  const [isSaving, setIsSaving] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const save = async (bookData, id) => {
    setIsSaving(true);
    setFormMessage("");

    try {
      if (id === undefined) {
        await booksCollection.add(bookData);
      } else {
        await booksCollection.doc(id).set(bookData);
      }

      setFormMessage("Saved your book!");
    } catch (error) {
      setFormMessage("Something went wrong editing this book.");
      console.error(error);
    }

    setIsSaving(false);
  };

  return [save, isSaving, formMessage];
}

export default useSaveBook;
