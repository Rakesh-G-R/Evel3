import { Router } from "express";
import { addReview, deleteReview, getReview, updateReview } from "../controllers/reviewControll.js";
import { addOrder, deleteOrder, getOrder, updateOrder } from "../controllers/orderControll.js";
import { role } from "../middlewares/role.js";

export const orderRoute=Router();


orderRoute.get("/order",role(['user']), getOrder);

orderRoute.post("/add/order/:id",role(['user']),addOrder);

orderRoute.patch("/update/order:id",role(['user']),updateOrder);

orderRoute.delete("/delete/order/:id",role(['user']),deleteOrder);

