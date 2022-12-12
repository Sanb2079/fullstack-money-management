import { findUser } from "../models/user/UserModel.js";

export const isAuth = async (req, res, next) => {
  //if valid user return true,otherwuse false
  console.log("sjfldsjfl auth");
  try {
    const { authorization } = req.headers;

    const user = await findUser({ _id: authorization });
    user?._id
      ? next()
      : res.json({
          status: "error",
          message: "Unauthorised User",
        });
    console.log("middleware auth");
  } catch (error) {
    next;
  }
};
