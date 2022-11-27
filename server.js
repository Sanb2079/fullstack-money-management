import express from "express";
import morgan from "morgan";
const app = express();

const PORT = process.env.PORT || 8000;

//middleware
app.use(morgan("dev"));

app.use(express.json());

//for path error to end pts
app.use("*", (req, res) => {
  res.json({
    status: "error",
    message: "invalid request",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running at Localhost:http://localhost:${PORT}`);
});
