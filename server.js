import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import userRouter from "./routes/user.router.js";
import courseRouter from "./routes/course.router.js";
import categoryRouter from "./routes/category.router.js"
import chapterRouter from "./routes/chapter.router.js"
import razorpayRouter from "./routes/razorpay.router.js"
import Razorpay from "razorpay";

const app = express();
dotenv.config();

// database
connectDb();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
// routes
app.use("/uploads", express.static("uploads"));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/chapters",chapterRouter)

app.use("/api/v1/razorpay", razorpayRouter);

app.get("/", (_, res) => {
  res.json({ msg: "api is working" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server started on port ${port}`));
    