import express from "express";
import {
  getAllUserTransactions,
  insertTrans,
  deleteManyTrans,
} from "../models/transaction/TransactionModel.js";
import { isAuth } from "../middleware/authMiddleware.js";
// import {
//   getAllUserTransactions,
//   insertTrans,
// } from "../models/transaction/TransactionModel.js";
const router = express();

// read
router.get("/", async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const trans = await getAllUserTransactions({ userId: authorization });
    res.json({
      status: "success",
      message: "get method to do ",
      trans,
    });
  } catch (error) {
    next(error);
    // res.json({
    //     status: 'error',
    //     message: error.message
    // })
  }
});

// create
//you can replace isAuth from here to server.js
//router.post("/", isAuth, async (req, res, next) => {
router.post("/", async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const result = await insertTrans({ ...req.body, userId: authorization });

    result?._id
      ? res.json({
          status: "success",
          message: "Transection added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add, please try again later.",
        });
  } catch (error) {
    next(error);
  }
});

// delete
// router.delete("/", (req, res, next) => {
//   try {
//     res.json({
//       status: "success",
//       message: "delete method to do ",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

//***************replaced with multiple del
//
router.delete("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { authorization } = req.headers;

    const result = await deleteManyTrans(req.body, authorization);
    console.log(result);
    result?.deletedCount
      ? res.json({
          status: "success",
          message: result.deletedCount + " item(s) delted ",
        })
      : res.json({
          status: "error",
          message: "Nothing happened",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
