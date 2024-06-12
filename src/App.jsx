import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import BookSearch from "./components/BookSearch";
import Bookshelf from "./components/BookShelf";

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* <Nav></Nav> */}
        <BookSearch />
        <Routes>
          <Route
            path="bookshelf"
            element={<Bookshelf />}
            title="My Bookshelf"
          ></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
