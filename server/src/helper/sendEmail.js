"use strict";
const nodemailer = require("nodemailer");
const { smtpUserPassword, smtpUserName } = require("../secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: smtpUserName,
    pass: smtpUserPassword
  }
});

const sendEmailWithNodeMailer = async (emailData) => {
  try {
    const mailOptions = {
      from: smtpUserName, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      // text: "Hello world?", // plain text body
      html: emailData.html, // html body
    }
    const info = await transporter.sendMail(mailOptions);
    // console.log("Message sent: %s", info.messageId);
    console.log("Message sent: %s", info.response);
  } catch (error) {
    console.error('Error occurred while sending Email:', error);
    throw error;
  }
}
module.exports = sendEmailWithNodeMailer;
