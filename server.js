require("dotenv").config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(cors()); // Allow requests from your frontend
app.use(express.json());

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Configure transporter (example for Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'snehalkhodade2005@gmail.com',      // your Gmail address
      pass: 'ibwt gqdl fghc ckif'                 // your Gmail App Password
    }
  });

  const mailOptions = {
    from: email,
    to: 'snehalkhodade2005@gmail.com',          // your receiving email
    subject: `Portfolio Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.json({ success: false });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});