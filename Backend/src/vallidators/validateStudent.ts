import { z } from "zod";

export const studentSchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters")
    .max(200, "Name is too long"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(6, "password must be at least 8 character")
    .max(200, "password is too long "),
  studyYear: z
    .number()
    .min(1, "study year must be at least 1")
    .max(5, "study year doesn't exist"),
  department: z
    .string()
    .min(5, "department must be at least 5 characters")
    .max(50, "department is too long"),
  campusId: z
    .string()
    .min(8, "campusId must be at least 8 characters")
    .max(10, "campus id doesn't exis please fill the correct id "),
});

//inference
export type StudentInput = z.infer<typeof studentSchema>;

export default function validateStudent(student: unknown) {
  return studentSchema.safeParse(student);
}
