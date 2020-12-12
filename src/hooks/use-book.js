import { useState, useEffect } from "react";
import { usersCollection } from "../data/firebase";

function useBook(userId, bookId) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    async function getBook() {
      setIsLoading(true);
      try {
        const bookSnapshot = await usersCollection
          .doc(userId)
          .collection("books")
          .doc(bookId)
          .get();

        if (!bookSnapshot.exists) {
          throw new Error("No such book exists!");
        }
        const data = bookSnapshot.data();
        setBookData(data);
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again");
        console.error(error);
      }
      setIsLoading(false);
    }

    getBook();
  }, [bookId]);
  return [bookData, isLoading, errorMessage];
}

export default useBook;
