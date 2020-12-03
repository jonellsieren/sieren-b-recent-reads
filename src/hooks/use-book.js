import { useState, useEffect } from "react";
import { booksCollection } from "../data/firebase";

function useBook(id) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    async function getBook() {
      setIsLoading(true);
      try {
        const bookSnapshot = await booksCollection.doc(id).get();

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
  }, [id]);

  return [bookData, isLoading, errorMessage];
}
export default useBook;
