import { Router } from "express";
import { addBook, deleteBook, getBook, updateBook } from "../controllers/bookControll.js";
import { role } from "../middlewares/role.js";

export const bookRouter=Router();

bookRouter.get("/book",role(['user','Admin']),getBook);

bookRouter.post("/add/book",role(['Admin']),addBook);

bookRouter.patch("/update/book/:id",role(['Admin']),updateBook);

bookRouter.delete("/delete/book/:id",role(['Admin']),deleteBook);