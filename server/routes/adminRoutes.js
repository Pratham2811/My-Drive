import express from  "express";
import { getAllUsersController } from "../controllers/Admin/getAllUsers.controller.js";

const router=express.Router();

router.get("/users",getAllUsersController)
export default router