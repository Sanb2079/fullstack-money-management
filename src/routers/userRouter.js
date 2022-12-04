import express from "express";
import { insertUser } from "../models/user/UserModel.js";
const router = express.Router();

//create user router
router.post("/", async (req, res, next) => {
  try {
    const user = await insertUser(req.body);
    if (user?._id) {
      return res.json({
        status: "success",
        message: "User created successfully!!!",
      });
    }
    res.json({
      status: "error",
      message: "Unable to create the user. Please try again!",
    });
  } catch (error) {
    console.log(error.message);

    if (error.message.includes("E11000 duplicate key error collection")) {
      error.code = 200;
      error.message =
        "Email already exists.Please use different email id or use the same email id to login";
    }
    next(error);
  }
});

export default router;
