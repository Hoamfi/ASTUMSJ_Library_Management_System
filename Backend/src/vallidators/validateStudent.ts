import { student } from "@/controllers/studentController";
import {z} from "zod";

export const studentSchema = z.object({
    name:z.string().min(5,"Name must be at least 5 characters").max(200,"Name is too long"),
    email:z.string().email("Invalid email format"),
    password:z.string().min(8,"password must be at least 8 character").max(200,"password is too long "),
});

export type StudentInput = z.infer<typeof studentSchema>;

export default function validateStudent(Student:unknown){
    return studentSchema.safeParse(student);
}