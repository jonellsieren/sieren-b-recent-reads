import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddBookPage from "../pages/add-book-page";
import EditBookPage from "../pages/edit-book-page";
import BooksPage from "../pages/books-page";
import NotFoundPage from "../pages/not-found-page";
import Nav from "./nav";

function App() {
  return (
    <BrowserRouter>
      <Nav />

      <Switch>
        <Route path="/" exact>
          <BooksPage />
        </Route>

        <Route path="/add">
          <AddBookPage />
        </Route>

        <Route path="/edit/:id">
          <EditBookPage />
        </Route>

        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
