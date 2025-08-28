import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from "../src/services/api-client";
interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  catagory: string;
  publicationYear: number;
  bookCover: string;
}

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await apiClient.get(
          `/books/${id}`
        );
        setBook(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading book details...
        </p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center">
        <p className="text-lg text-red-500">Book not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-gray-700 hover:text-black transition"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-center items-center">
          <img
            src={book.bookCover}
            alt={book.title}
            className="w-full max-w-sm rounded-lg shadow-md"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-lg text-gray-600">by {book.author}</p>
          <p className="text-gray-700">{book.description}</p>
          <p className="text-gray-500">Released: {book.publicationYear}</p>
          <p className="text-gray-400">Book ID: {book._id}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
