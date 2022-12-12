import UserSchema from "./UserSchema.js";

// //create useer
export const insertUser = (UserObj) => {
  return UserSchema(UserObj).save();
};

//login user
export const findUser = (obj) => {
  return UserSchema.findOne(obj);
};
