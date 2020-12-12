import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import AddBookPage from "../pages/add-book-page";
import EditBookPage from "../pages/edit-book-page";
import AccountPage from "../pages/account-page";
import BooksPage from "../pages/books-page";
import NotFoundPage from "../pages/not-found-page";
import { auth } from "../data/firebase";
import Nav from "./nav";

function AuthenticatedRoute(props) {
  const { isAuthenticated, children, ...routeProps } = props;
  return (
    <Route {...routeProps}>
      {isAuthenticated ? children : <Redirect to="/account" />}
    </Route>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const isAuthenticated = user !== null;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);
  return (
    <BrowserRouter>
      <Nav user={user} />

      <Switch>
        <Route path="/account">
          <AccountPage user={user} />
        </Route>

        <AuthenticatedRoute path="/" exact isAuthenticated={isAuthenticated}>
          <BooksPage />
        </AuthenticatedRoute>

        <AuthenticatedRoute path="/add" isAuthenticated={isAuthenticated}>
          <AddBookPage />
        </AuthenticatedRoute>

        <AuthenticatedRoute path="/edit/:id" isAuthenticated={isAuthenticated}>
          <EditBookPage />
        </AuthenticatedRoute>

        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
