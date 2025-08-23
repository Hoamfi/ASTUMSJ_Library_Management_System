import Joi from "joi";

interface Book {

}

export default function validateBook(book: Book) {
    const schema = Joi.object({

    })

    return schema.validate(book)
}