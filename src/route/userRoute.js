import { Router } from "express";
import { getUsers, userLogin, userRegister } from "../controllers/userContoll.js";

export const userRoute=Router();

userRoute.post("/register",userRegister);

userRoute.post("/login",userLogin);

userRoute.post("/users",getUsers);