require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
 

const app = express();
app.use(cors());
app.use(express.json());

// 📤 POST Contact Form
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD
      }
    });
 

// Test env variables
console.log("USER:", process.env.USER);
console.log("PASS:", process.env.PASS);

    const mailOptions = {
      from: email,
      to: process.env.MY_EMAIL,
      subject: `Message from ${name}`,
      text: message
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

// 🌐 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
