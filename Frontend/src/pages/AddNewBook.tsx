import { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";

const AddNewBook = () => {
  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [releasedYear, setReleasedYear] = useState(new Date().getFullYear());
  const [imageUrl, setImageUrl] = useState("");

  const handleAddBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/books",
        {
          bookId,
          imageUrl,
          title,
          author,
          description,
          releasedYear,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        alert("Book added successfully ✅");
        setBookId("");
        setTitle("");
        setAuthor("");
        setDescription("");
        setImageUrl("");
        setReleasedYear(new Date().getFullYear());
      } else {
        alert(response.data.message || "Failed to add book ❌");
      }
    } catch (error) {
      console.error("Error adding book", error);
      alert("An error occurred while adding the book ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleAddBook}
        className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">Add a Book</h2>

        {/* Grid for inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Book ID */}
          <div>
            <label className="block font-medium mb-1">Book ID</label>
            <input
              type="text"
              placeholder="Book ID"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block font-medium mb-1">Author</label>
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Released Year */}
          <div>
            <label className="block font-medium mb-1">Released Year</label>
            <input
              type="number"
              placeholder="Released Year"
              value={releasedYear}
              onChange={(e) => setReleasedYear(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black"
              rows={3}
              required
            />
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Image URL</label>
            <input
              type="url"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300 disabled:opacity-50 cursor-pointer"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddNewBook;
