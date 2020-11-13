import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import EditBook from "../components/edit-book";

function EditBookPage() {
  const { id } = useParams();
  return (
    <main>
      <Helmet>
        <title>Edit</title>
      </Helmet>
      <EditBook id={id} />
    </main>
  );
}

export default EditBookPage;
