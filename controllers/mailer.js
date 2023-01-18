import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'alta23@ethereal.email', // generated ethereal user
        pass: 'T6Sqz6gNhvQNWQgP61', // generated ethereal password
    }
}
let transporter = nodemailer.createTransport(nodeConfig);

let mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})

/* POST : http://localhost:8000/api/registerMail */
export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    // body of the email
    console.log(username + ' ' + userEmail + ' ' + text + ' ' + subject);
    var email = {
        body: {
            name: username,
            intro: text || "Welcome to my page . I'm excited to have you !",
            outro: 'Need  help, or have questions ? Just reply to me i will happy to help you',
        }
    }

    var emailBody = mailGenerator.generate(email);

    let message = {
        from: process.env.username,
        to: userEmail,
        subject: subject || "Signup Successfully",
        html: emailBody
    }

    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ message: "You should recieve an email from us" })
        })
        .catch(error => res.status(500).send({ error }))

}