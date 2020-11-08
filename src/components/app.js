import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddMoviePage from "../pages/add-book-page";
import EditMoviePage from "../pages/edit-book-page";
import MoviesPage from "../pages/books-page";
import NotFoundPage from "../pages/not-found-page";
import Nav from "./nav";

function App() {
  return (
    <BrowserRouter>
      <Nav />

      <Switch>
        <Route path="/" exact>
          <MoviesPage />
        </Route>

        <Route path="/add">
          <AddMoviePage />
        </Route>

        <Route path="/edit/:id">
          <EditMoviePage />
        </Route>

        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
