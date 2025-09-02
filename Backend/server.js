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
    origin: process.env.ALLOWED_ORIGIN
      ? process.env.ALLOWED_ORIGIN.split(",")
      : "*",
    methods: ["GET", "POST"],
  })
);

// ✅ MongoDB Connection (optional)
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => {
      console.error("❌ MongoDB error:", err.message);
      console.warn("⚠️ Running without DB. App will not crash.");
    });
} else {
  console.warn("⚠️ No MONGO_URI provided, running without DB.");
}

// ✅ Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "portfolio-backend" });
});

// ✅ Contact route
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Save in MongoDB if connected
    let savedContact = null;
    if (mongoose.connection.readyState === 1) {
      savedContact = await Contact.create({ name, email, message });
    } else {
      console.warn("⚠️ Skipping DB save, Mongo not connected.");
    }

    // Send response immediately
    res.json({
      success: true,
      message: "✅ Message received! Email will be sent shortly.",
      data: savedContact,
    });

    // Email sending: Gmail or SendGrid
    if (process.env.SMTP_USER && process.env.SMTP_PASS && process.env.TO_EMAIL) {
      // Gmail transporter
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

      console.log(`📧 Email sent via Gmail for contact: ${email}`);
    } else if (process.env.SENDGRID_API_KEY && process.env.TO_EMAIL) {
      // SendGrid transporter
      const transporter = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 587,
        auth: {
          user: "apikey",
          pass: process.env.SENDGRID_API_KEY,
        },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact" <no-reply@yourdomain.com>`,
        replyTo: email,
        to: process.env.TO_EMAIL,
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });

      console.log(`📧 Email sent via SendGrid for contact: ${email}`);
    } else {
      console.warn("⚠️ Email not sent. Missing SMTP or SendGrid config.");
    }
  } catch (err) {
    console.error("❌ Contact route error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to process message." });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
