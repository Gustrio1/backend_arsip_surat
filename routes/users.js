const express = require("express");
const router = express.Router();
const database = require("../db");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await database.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    res.json({
      message: "Login berhasil",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Gagal login:", err);
    res.status(500).send("Terjadi kesalahan saat login");
  }
});

module.exports = router;
