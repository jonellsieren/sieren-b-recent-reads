import { useState } from "react";
import { usersCollection } from "../data/firebase";

function useSaveBook() {
  const [isSaving, setIsSaving] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const save = async (bookData, userId, bookId) => {
    setIsSaving(true);
    setFormMessage("");

    try {
      if (bookId === undefined) {
        await usersCollection.doc(userId).collection("books").add(bookData);
      } else {
        await usersCollection
          .doc(userId)
          .collection("books")
          .doc(bookId)
          .set(bookData);
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
