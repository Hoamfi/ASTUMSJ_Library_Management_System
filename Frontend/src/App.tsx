import React from "react";
import BookCard from "./components/BookCard";


const books = [
  {
    id: "1",
    title: "Rich Dad Poor Dad",
    author: "Robert Kyosaki",
    releasedYear: 2000,
    description: "A book for finicially stable",
    imageUrl:"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1448383923i/27917357.jpg"
  },
  {
    id: "2",
    title: "Psychology of Money",
    author: "Morgan Housel",
    releasedYear: 2002,
    description: "A book for how to manage your money",
    imageUrl:"https://readersbooksclub.com/wp-content/uploads/2023/04/The-Psychology-of-Money-book.png"
  },
];

function App() {
  const handleBorrow = (bookId: string) => {
    alert(`Borrow book with id: ${bookId}`);
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}           
          role="student"        
          onBorrow={handleBorrow}
        />
      ))}
    </div>
  );
}

export default App;
