import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 8000;

//middleware
app.use(morgan("dev"));
// app.use(helmet());
app.use(express.json());
app.use(cors());
//db connect
import connectDb from "./src/config/dbConfig.js";
connectDb();

//routers: creating end points
import userRouter from "./src/routers/userRouter.js";
app.use("/api/v1/user", userRouter);

//catch when routrer is not found
// catch when router is not found
app.use("*", (req, res, next) => {
  const error = {
    message: "404 page not found!",
    code: 200,
  };
  next(error);
});

// //for path error to end pts
// app.use("*", (req, res) => {
//   res.json({
//     status: "error",
//     message: "invalid request",
//   });
// });

//global errorhandler
app.use((error, req, res, next) => {
  const code = error.code || 500;
  res.status(code).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running at Localhost:http://localhost:${PORT}`);
});
