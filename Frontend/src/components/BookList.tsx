import { Link } from "react-router-dom";
import BookCard from "./BookCard";
interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  catagory: string;
  publicationYear: number;
  bookCover: string;
}

interface Props {
  books: Book[];
}

const BookList = ({ books }: Props) => {
  return (
    <div className="flex gap-5 w-screen lg:w-4xl  overflow-x-auto">
      {books.map((book) => (
        <Link key={book._id} to={"/books/" + book._id}>
          <BookCard title={book.title} bookCover={book.bookCover} />
        </Link>
      ))}
    </div>
  );
};

export default BookList;
