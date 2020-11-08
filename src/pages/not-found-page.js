import React from "react";
import { Helmet } from "react-helmet";

function NotFoundPage() {
  return (
    <main>
      <Helmet>
        <title>Not Found!</title>
      </Helmet>
      <p>This page does not exist!</p>
    </main>
  );
}

export default NotFoundPage;
