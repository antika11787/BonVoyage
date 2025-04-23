import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const verifyTransporter = (transporter: nodemailer.Transporter) => {
  transporter.verify(function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
};

const transporter = createTransporter();
verifyTransporter(transporter);

export { createTransporter, verifyTransporter, transporter };