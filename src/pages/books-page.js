import React from "react";
import { Helmet } from "react-helmet";
import BookListing from "../components/book-listing";

function BooksPage() {
  return (
    <main>
      <Helmet>
        <title>Recent Reads</title>
      </Helmet>
      <BookListing />
    </main>
  );
}

export default BooksPage;
