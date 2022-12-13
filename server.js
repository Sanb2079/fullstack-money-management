import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
const app = express();
import path from "path";
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
//for transaction
import transRouter from "./src/routers/transRouter.js";
import { isAuth } from "./src/middleware/authMiddleware.js";

//### isAuth is middle ware ;this cheks for Authorisation
app.use("/api/v1/transaction", isAuth, transRouter);

// redirect to dashboard ; after putting in build folder in backend ;
//****NOTE: app.use("/", (req, res)  should be PLACED below this code, because it maynot find ("/") when redirecting from dashboard

// to independently run FrontEnd and putting inside bckend//from now, no need to run frontend seperately
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/build")));

app.get("/dashboard", (req, res) => {
  res.redirect("/");
});

///if above code doesnot run//old method
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

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
  // const code = error.code || 500;
  res.json({
    status: "error",
    message: error.message,
  });
});

/////

///

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running at Localhost:http://localhost:${PORT}`);
});
