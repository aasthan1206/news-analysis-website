const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const fs = require('fs')
const Papa = require('papaparse')

// middleware
app.use(cors());
app.use(express.json());

// Routes

// for saving news data to a csv file
app.post("/saveNewsData", (req, res) => {
    try {
        const newsData = req.body.newsData;

        const csvData = Papa.unparse(newsData);

        fs.appendFileSync('news_data.csv', csvData);

        res.json({message: "News data saved to CSV successfully"});
    } catch (err) {
        console.error('Error saving news data:', err.message);
        res.status(500).json({ error: 'An error occurred while saving news data.' });
    }

})

// post

app.post("/signup", async (req, res) => {
    try{
        const {first_name, last_name, email, contact_no, password} = req.body;
        const newUser = await pool.query("INSERT INTO users (first_name, last_name, email, contact_no, password) VALUES($1, $2, $3, $4, $5) RETURNING *", [first_name, last_name, email, contact_no, password]);

        res.json(newUser.rows[0]);
        //console.log(req.body);
    } catch (err) {
        console.error(err.message);
    }
})

// get
app.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id])
        res.json(user.rows[0]);
        //console.log(req.params);
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5002, () => {
    console.log("server has started on port 5002");
})