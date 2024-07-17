import { io } from "../../server.js";
import { Book } from "../models/bookSchema.js";


export const getBook = async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).send(books);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

export const addBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        io.emit("newBook", newBook); 
        return res.status(201).send('Book created successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

export const updateBook = async (req, res) => {
    const { title, author, price, genre } = req.body;
    const { id } = req.params;
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, genre, price }, { new: true });
        return res.status(200).send('Book updated successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        await Book.findByIdAndDelete(id);
        res.status(200).send('Book deleted successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}
