const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// POST route to save messages
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.json({ success: true, msg: "Message saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

module.exports = router;
