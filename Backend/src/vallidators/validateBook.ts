import { z } from "zod";

export const bookSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(150, "Title is too long"),
  author: z
    .string()
    .min(2, "Author name must be at last 2 characters")
    .max(100, "Author name is too long"),
  publicationYear: z
    .number()
    .int("publicationYear must be an integer")
    .gte(1000, "publicationYear must be realstic")
    .lte(new Date().getFullYear(), "publicationYear can not be in the future"),
  bookCover: z.string().url("bookCover must be valid url"),
  borrowCount: z.number().int().min(0, "borrow count can't be negative "),
  page: z
    .number()
    .int("Page count must be an integer")
    .min(1, "page count must at least one"),
  category: z
    .string()
    .min(3, "category must be atleast 3 characters")
    .max(50, "category is too long"),
  availabeCopies: z.number().int().min(0, "Availabe copies can't be negative"),
  totalCopies: z.number().int().min(0, "Availabe copies can't be negative"),
});

//inference
export type BookInput = z.infer<typeof bookSchema>;

export default function validateBook(book: unknown) {
  return bookSchema.safeParse(book);
}
