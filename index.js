const express = require("express");
// const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const Mailer = require("./mailer");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer configuration
const transporter = new Mailer(
  "smtp.gmail.com",
  587,
  "androso421@gmail.com",
  "krph kkis ttyv gekr"
);

// Handle form submission to send email
app.post("/sendEmail", (req, res) => {
  const { recipient, subject, body } = req.body;
  const mailOptions = {
    from: "androso421@gmail.com",
    to: recipient,
    subject: subject,
    text: body,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    let message = null;
    if (error) {
      message = encodeURIComponent("There was an error sending the email.");
    } else {
      message = "Email Succesfully sent!";
    }

    res.redirect("/?message=" + message);
  });
});

app.get("/", (req, res) => {
  const message = req.query?.message;
  res.render("index", { message: message });
});

app.listen(3000, () => {
  console.log("server started");
});
