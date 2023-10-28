// import {dirname, join} from 'path'
// import { fileURLToPath } from 'url';

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const fs = require("fs");
const Papa = require("papaparse");

const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const usersRouter = require("./routes/usersRoutes");
const authRouter = require("./routes/authRoutes");

const authenticateToken = require("./middleware/authorization");

dotenv.config();

// const __dirname = dirname(fileURLToPath(import.meta.url));

const corsOptions = { credentials: true, origin: process.env.URL || "*" };

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// app.use('/', express.static(join(__dirname, 'public')));

// Routes

app.use("/users", usersRouter);
app.use("/register", usersRouter);
app.use("/auth", authRouter);

// for saving news data to a csv file
app.post("/saveNewsData", (req, res) => {
  try {
    const newsData = req.body.newsData;

    const csvData = Papa.unparse(newsData);

    fs.appendFileSync("news_data.csv", csvData);

    res.json({ message: "News data saved to CSV successfully" });
  } catch (err) {
    console.error("Error saving news data:", err.message);
    res
      .status(500)
      .json({ error: "An error occurred while saving news data." });
  }
});

// post

// Define a protected route for user profile
app.get("/user-profile/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
        res.json(user.rows[0]);
        //console.log(req.params);
    } catch (err) {
        console.log(err.message);
    }
})

// edit user profile
app.put("/user-profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, contact_no, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updateProfile = await pool.query("UPDATE users SET first_name = $1, last_name = $2, email = $3, contact_no = $4, password = $5 WHERE user_id = $6", [first_name, last_name, email, contact_no, hashedPasswordpassword, id]);
    res.json("Successful");
  } catch (err) {
    console.log(err.message);
  }
})

// delete user profile
app.delete("/user-profile/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("DELETE FROM users WHERE user_id = $1", [id]);
    res.json("Account Deleted Successfully")

  } catch (err) {
    console.log(err.message)
  }
})

app.get("/all-users", async (req, res) => {
    try {
        // const { id } = req.params;
        const user = await pool.query("SELECT * FROM users")
        res.json(user);
        //console.log(req.params);
    } catch (err) {
        console.error(err.message);
    }
})

// for saving user feedback
app.post("/feedback", authenticateToken, async (req, res) => {
  try {
    const {user_id} = req.user;
    const {feedback_desc} = req.body;
    const feedbackData = await pool.query("INSERT INTO feedback (user_id, feedback_desc) VALUES ($1, $2) RETURNING *", [user_id, feedback_desc]);
  } catch (err) {
    console.error(err.message);
  }
})

app.listen(5002, () => {
  console.log("server has started on port 5002");
});
