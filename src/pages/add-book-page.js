import React from "react";
import { Helmet } from "react-helmet";
import AddBook from "../components/add-book";

function AddBookPage() {
  return (
    <main>
      <Helmet>
        <title>Add</title>
      </Helmet>
      <AddBook />
    </main>
  );
}

export default AddBookPage;
