import React, { useState, useEffect } from "react";
import BookCard from "./BookCard.jsx";
import Search from "../utils/Search.jsx";
import Nav from "../utils/Nav.jsx";

const Bookshelf = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBooks(storedBooks);
  }, []);

  const removeBook = (key) => {
    const bookToRemove = books.find((book) => book.key === key);
    const updatedBooks = books.filter((book) => book.key !== key);
    localStorage.setItem("bookshelf", JSON.stringify(updatedBooks));
    setBooks(updatedBooks);

    if (bookToRemove) {
      alert(`${bookToRemove.title} has been removed from your bookshelf.`);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Nav></Nav>
      <div className="bookshelf p-5">
        <div className="header-area flex flex-col sm:flex-row items-center justify-between mb-5 px-2">
          <h2 className="text-white text-2xl mb-4 sm:mb-0">My Bookshelf</h2>
          <div className="relative w-full max-w-xs">
            <Search
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 px-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <BookCard key={book.key} book={book} onRemove={removeBook} />
            ))
          ) : (
            <p className="text-white">No books found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookshelf;
