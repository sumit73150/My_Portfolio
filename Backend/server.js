// backend/server.js
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
require("dotenv").config();

const Contact = require("./models/Contact"); // MongoDB schema

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());

const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN?.split(",") || "*", // allow multiple origins from .env
};
app.use(cors(corsOptions));

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "portfolio-backend" });
});

// ✅ Contact route (DB save + async email)
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Save in DB
    await Contact.create({ name, email, message });

    // ✅ Send response immediately to avoid HTTP 499
    res.json({ success: true, message: "✅ Message saved successfully! Email sending..." });

    // Send email asynchronously (doesn't block client)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.TO_EMAIL || process.env.SMTP_USER,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }).catch(err => console.error("❌ Email error:", err));

  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ success: false, message: "Failed to process message." });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
