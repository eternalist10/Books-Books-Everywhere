import React from "react";
import { useLocation } from "react-router-dom";

const BookCard = React.memo(({ book, onRemove }) => {
  const location = useLocation();

  const addToBookshelf = () => {
    let bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    if (!bookshelf.some((storedBook) => storedBook.key === book.key)) {
      bookshelf.push(book);
      localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
      alert(`${book.title} added to bookshelf`);
    }
  };

  return (
    <div className="book-card bg-white p-5 border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between h-full text-center">
      <div className="flex flex-col items-center mb-4">
        <img
          src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
          alt={book.title}
          className="object-scale-down w-full h-[200px] mb-4"
        />
        <h4 className="text-xl font-semibold mb-1">{book.title}</h4>
        <p className="text-gray-600 mb-1">
          {book.author_name ? book.author_name.join(", ") : "Unknown"}
        </p>
        <p className="text-black mb-1">No. of Editions: {book.edition_count}</p>
        <p className="text-black mb-1">
          First Publish Year: {book.first_publish_year}
        </p>
      </div>
      <div className="mt-auto">
        {location.pathname === "/" && (
          <button
            onClick={addToBookshelf}
            className="rounded-full bg-blue-600 border border-black text-white p-2 px-4 mt-3 hover:bg-black duration-300"
          >
            Add to Bookshelf
          </button>
        )}
        {location.pathname === "/bookshelf" && (
          <button
            onClick={() => onRemove(book.key)}
            className="remove-btn bg-black py-1 px-3 m-2 rounded-full text-white hover:bg-blue-500 transition duration-500"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
});

export default BookCard;