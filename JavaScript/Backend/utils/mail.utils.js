let nodemailer = require('nodemailer')

module.exports.sendEmail = async (to, subject, text) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.APP_MAIL,
                pass: process.env.APP_PASSWORD
            }
        })
        let mailOptions = {
            from: process.env.APP_MAIL,
            to: to,
            subject: subject,
            text: text
        }
        await transporter.sendMail(mailOptions) // Send the email
    }
    catch (error) {
        console.log(error);
        throw new Error("Error sending email")
    }
}