import React from "react";
import { Helmet } from "react-helmet";
import AddBook from "../components/add-book";

function AddBookPage(props) {
  return (
    <main>
      <Helmet>
        <title>Add</title>
      </Helmet>
      <AddBook {...props} />
    </main>
  );
}

export default AddBookPage;
