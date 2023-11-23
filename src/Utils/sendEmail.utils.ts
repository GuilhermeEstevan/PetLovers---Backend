import { createTransport } from "nodemailer";
import { TEmailRequest } from "../interfaces/users";
import Mailgen from "mailgen";

class EmailService {
  async sendEmail({ to, subject, text }: TEmailRequest) {
    console.log(to);

    try {
      const transporter = createTransport({
        service: "hotmail",
        auth: {
          user: process.env.SMTP_USER, // Seu endereço de e-mail
          pass: process.env.SMTP_PASS, // Sua senha
        },
      });

      await transporter.sendMail({
        from: "guilhermeestevangui@hotmail.com",
        to,
        subject,
        html: text,
      });

      console.log("Email sent successfully");
    } catch (error: any) {
      console.error("Error sending email:", error.message);
      // Aqui você pode lidar com o erro da forma desejada, como logar, enviar um alerta, etc.
    }
  }

  resetPasswordTemplate(
    userEmail: string,
    userName: string,
    resetToken: string
  ) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "PetLovers",
        link: "https://petloverswebsite.netlify.app",
      },
    });

    const email = {
      body: {
        name: userName,
        intro:
          "You have received this email because a password reset request for your account was received.",
        action: {
          instructions: "Click the button below to reset your password:",
          button: {
            color: "#DC4D2F",
            text: "Reset your password",
            link: `https://localhost:3000/resetPassword?${resetToken}`,
          },
        },
        outro:
          "If you did not request a password reset, no further action is required on your part.",
      },
    };

    const emailBody = mailGenerator.generate(email);

    const emailTemplate = {
      to: userEmail,
      subject: "Reset Password",
      text: emailBody,
    };
    return emailTemplate;
  }
}

const emailservice = new EmailService();

export { emailservice };
