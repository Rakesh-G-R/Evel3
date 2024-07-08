import { Router } from "express";
import { addReview, deleteReview, getReview, updateReview } from "../controllers/reviewControll.js";

export const review=Router();


review.get("/review",getReview);

review.post("/add/review/:id",addReview);

review.patch("/update/review:id",updateReview);

review.delete("/delete/review/:id",deleteReview);