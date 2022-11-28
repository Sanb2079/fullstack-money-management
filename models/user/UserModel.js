import UserSchema from "./UserSchema.js";

// //create useer
export const insertUser = (UserObj) => {
  return UserSchema(UserObj).save();
};
