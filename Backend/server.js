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

// ✅ CORS config
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN?.split(",") || "*",
    methods: ["GET", "POST"],
  })
);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1); // crash app if DB not connected
  });

// ✅ Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "portfolio-backend" });
});

// ✅ Contact route (DB save + async email)
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Save in MongoDB
    const savedContact = await Contact.create({ name, email, message });

    // Send response immediately
    res.json({
      success: true,
      message: "✅ Message saved successfully! Email will be sent shortly.",
      data: savedContact,
    });

    // Send email asynchronously
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.TO_EMAIL,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    console.log(`📧 Email sent for contact: ${email}`);
  } catch (err) {
    console.error("❌ Contact route error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to process message." });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
