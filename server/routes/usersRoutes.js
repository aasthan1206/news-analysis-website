const express = require("express");
const pool = require("../db");
const bcrypt = require("bcrypt");
const authenticateToken = require("../middleware/authorization");

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    // const { id } = req.params;
    const users = await pool.query("SELECT * FROM users");
    res.json({ users: users.rows });
    // console.log(req);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, contact_no, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users(first_name, last_name, email, contact_no, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [first_name, last_name, email, contact_no, hashedPassword]
    );
    res.json({ users: newUser.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// // Define a protected route for user profile
// router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
//   // req.user contains the authenticated user's data
//   res.json(req.user);
// });

module.exports = router;
