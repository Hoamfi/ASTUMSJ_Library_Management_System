import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

// Props type
type BookCardProps = {
  book: {
    id: string;
    title: string;
    author: string;
    releasedYear: number;
    description?: string;
    imageUrl?: string;
  };
  role: "admin" | "student";
  onBorrow?: (bookId: string) => void;
  onEdit?: (bookId: string) => void;
  onDelete?: (bookId: string) => void;
};

function BookCard({ book, role, onBorrow, onEdit, onDelete }: BookCardProps) {
  return (
    <Card className="w-72" imageUrl={book.imageUrl} imageAlt={book.title}>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Released Year:</strong> {book.releasedYear}</p>
        {book.description && <p><strong>Description:</strong> {book.description}</p>}
      </CardContent>
      <CardContent className="flex gap-2 mt-2">
        {role === "student" && onBorrow && (
          <Button onClick={() => onBorrow(book.id)}>Borrow</Button>
        )}
        {role === "admin" && (
          <>
            {onEdit && <Button variant="secondary" onClick={() => onEdit(book.id)}>Edit</Button>}
            {onDelete && <Button variant="destructive" onClick={() => onDelete(book.id)}>Delete</Button>}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default BookCard;
