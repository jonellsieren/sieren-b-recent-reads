import { useState, useEffect } from "react";
import { booksCollection } from "../data/firebase";

function useAllBooks() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const onNext = (snapshot) => {
      setIsLoading(false);
      const docs = snapshot.docs;
      setBooks(docs);
    };
    const onError = (error) => {
      setIsLoading(false);
      setErrorMessage(
        "There was a problem loading your book. Please try again."
      );
      console.error(error);
    };

    const unsubscribe = booksCollection
      .orderBy("rating", "desc")
      .onSnapshot(onNext, onError);
    return unsubscribe;
  }, []);

  return [books, isLoading, errorMessage];
}

export default useAllBooks;
