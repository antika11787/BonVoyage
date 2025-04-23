import {
    transporter
} from "../config/email";
const sendEmail = (email:string,subject:string,html:string) => {
    try {
        const mailOptions = {
            from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: subject,
            html: html
        };
        const info = transporter.sendMail(mailOptions);
        return info;
    } catch (e) {
        throw e;
    }
}

export default sendEmail;