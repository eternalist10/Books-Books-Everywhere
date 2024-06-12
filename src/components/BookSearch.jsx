import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import { useLocation } from "react-router-dom";
import Search from "../utils/Search";
import Nav from "../utils/Nav";

const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const fetchBooks = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURI(
          query
        )}&limit=10&page=1`
      );
      setBooks(response.data.docs);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (query.length > 2) {
      const delayDebounce = setTimeout(() => {
        fetchBooks();
      }, 500);

      return () => clearTimeout(delayDebounce);
    } else {
      setBooks([]);
    }
  }, [query, fetchBooks]);

  if (location.pathname === "/bookshelf") {
    return null;
  }

  return (
    <div>
      <Nav></Nav>
      <div className="flex flex-col m-3">
        <div className="flex flex-col items-center">
          <p className="text-lg text-white tracking-wide leading-relaxed my-4 mx-4 font-light">
            Step into a world where stories bloom and imagination soars! At
            <span className="bg-gradient-to-r from-teal-400 to-violet-600 px-2 py-1 rounded-full mx-1">
              Books, Books Everywhere
            </span>
            , we believe every book holds an adventure waiting to be discovered.
            Browse our diverse collection of tales from every corner of the
            globe, from heart-stopping thrillers and sprawling fantasies to
            enlightening non-fiction and poetic musings. Whether you're a
            seasoned bibliophile or a casual reader, our carefully curated
            shelves promise to offer something that will intrigue, inspire, and
            transport you. Visit us in-store or online and let your next reading
            adventure begin!
          </p>
          <Search
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></Search>
          {loading && <div className="m-[20px] text-white">Loading...</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4 w-full">
            {books.length > 0 &&
              books.map((book) => <BookCard key={book.key} book={book} />)}
          </div>
          {query && !loading && books.length === 0 && (
            <div className="flex justify-center items-center w-full mt-4">
              <p className="text-white">No books found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
