const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Hotmail",
    host: "smtp.office365.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "dandyincorrect@outlook.com",
        pass: "Dandy+123",
    }
});

const sendEmail = async(subject, body) => {

    try{
        const info = await transporter.sendMail({
            from: "dandyincorrect@outlook.com",
            to: "dharshanp.21cse@kongu.edu",
            subject: subject,
            text: `User Query: ${body.UserQuery}\nUser Name: ${body.UserName}\nPhone Number: ${body.Phoneno}\nUserEmail: ${body.SenderMailId}`
        });

        console.log(`Message sent: ${info.messageId}`);
        return true;
    } catch(error){
        console.log(error);
        return false;
    }
}

const sendToEmail = async(subject, emailto, otpno) => {

    try{
        const info = await transporter.sendMail({
            from: "dandyincorrect@outlook.com",
            to: emailto,
            subject: subject,
            text: `Use this Number for confirm your products on the Delivery.\n  Number. ${otpno}`
        });

        console.log(`Message OTP sent: ${info.messageId}`);
        return true;
    } catch(error){
        console.log(error);
        return false;
    }
}

const sendToresetEmail = async(subject, emailto, otpno) => {
console.log("Sending reset Link");
    try{
        const info = await transporter.sendMail({
            from: "dandyincorrect@outlook.com",
            to: emailto,
            subject: subject,
            text: `http://localhost:8080/forgotPass \nOTP Number. ${otpno}`
        });

        console.log(`Message OTP sent: ${info.messageId}`);
        return true;
    } catch(error){
        console.log(error);
        return false;
    }
}

module.exports = { sendEmail, sendToEmail, sendToresetEmail }