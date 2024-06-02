"use server";

import EmailTemplate from "@/utils/email/EmailTemplate";
import { Resend } from "resend";

const SendVerficationEmail = async (email, link) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["alikillerno@gmail.com"],
    subject: "Hello world",
    react: EmailTemplate({ link }),
  });

  if (error) {
    return {
      status: 500,
      data,
    };
  }

  return {
    status: 200,
    data,
  };
};
export default SendVerficationEmail;
