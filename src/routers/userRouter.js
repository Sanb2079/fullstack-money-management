import express from "express";
import { findUser, insertUser } from "../models/user/UserModel.js";
const router = express.Router();

//create user router
router.post("/", async (req, res, next) => {
  try {
    const user = await insertUser(req.body);
    if (user?._id) {
      return res.json({
        status: "success",
        message: "User created successfully!!!",
        // user: {
        //   name: user.name,
        //   _id: user._id,
        // },
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

router.post("/login", async (req, res, next) => {
  try {
    //grab the data coming frm db
    console.log(req.body);
    const user = await findUser(req.body);
    // if (user._id){}
    user?._id
      ? res.json({
          status: "success",
          message: "login success",
          // user,
          user: {
            name: user.name,
            _id: user._id,
          },
        })
      : res.json({
          status: "error",
          message: "Invalid login details",
        });

    //
    ///query db with email and pin aand see if there any a/c exits
    //->true,login sucess
    //->false,invalid login
  } catch (error) {
    next(error);
  }
});
export default router;
