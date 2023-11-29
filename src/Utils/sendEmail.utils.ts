import { createTransport } from "nodemailer";
import { TEmailRequest } from "../interfaces/users";
import Mailgen from "mailgen";

class EmailService {
  async sendEmail({ to, subject, text }: TEmailRequest) {
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
            link: `https://localhost:5173/resetPassword/${resetToken}`,
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

  petBirthdayTemplate(userEmail: string, userName: string, petName: string) {
    const mailGenerator = new Mailgen({
      theme: "salted",
      product: {
        name: "PetLovers",
        link: "https://petloverswebsite.netlify.app",
      },
    });

    const email = {
      body: {
        greeting: "Olá",
        signature: "Atenciosamente",
        name: userName,
        intro: `Desejamos um feliz aniversário para o ${petName} ! 🎉🐾`,
        outro:
          "Esperamos que vocês tenham um dia repleto de alegria e momentos especiais juntos.",
        action: {
          instructions: "Clique no botão abaixo para visitar nosso site:",
          button: {
            color: "#DC4D2F",
            text: "PetLovers",
            link: `https://petloverswebsite.netlify.app`,
          },
        },
      },
    };

    const emailBody = mailGenerator.generate(email);

    const emailTemplate = {
      to: userEmail,
      subject: "Aniversário do seu Pet",
      text: emailBody,
    };
    return emailTemplate;
  }

  vaccineReminderTemplate(
    userEmail: string,
    userName: string,
    petName: string,
    vaccineName: string,
    doseNumber: string,
    dueDate: string,
    nextDose:string
  ) {
    const mailGenerator = new Mailgen({
      theme: "cerberus", 
      product: {
        name: "PetLovers",
        link: "https://petloverswebsite.netlify.app",
      },
    });

    const email = {
      body: {
        greeting: "Olá",
        signature: "Atenciosamente",
        name: userName,
        intro: `Lembrete de Vacinação para ${petName} 🐾`,
        table: {
          data: [
            {
              item: "Vacina",
              descrição: vaccineName,
            },
            {
              item: "Já tomou:",
              descrição: `${doseNumber} dose`,
            },
            {
              item: "Próxima:",
              descrição: `${nextDose} dose`,
            },
            {
              item: "Data de Vencimento",
              descrição: dueDate,
            },
          ],
          columns: {
            // Ajuste as larguras das colunas conforme necessário
            customWidth: {
              item: "20%",
              description: "80%",
            },
            // Adicione mais propriedades de estilo se necessário
          },
        },
        outro:
          "Por favor, não se esqueça de dar a vacina ao seu querido pet antes da data de vencimento. A saúde do seu animalzinho é importante para nós!",
        action: {
          instructions: "Clique no botão abaixo para mais informações:",
          button: {
            color: "#DC4D2F",
            text: "Detalhes da Vacinação",
            link: `https://petloverswebsite.netlify.app/vaccine-details?pet=${petName}`,
          },
        },
      },
    };

    const emailBody = mailGenerator.generate(email);

    const emailTemplate = {
      to: userEmail,
      subject: `Lembrete de Vacinação para ${petName}`,
      text: emailBody,
    };

    return emailTemplate;
  }
}

const emailservice = new EmailService();

export { emailservice };
