import ForgotPasswordOtpEmailTemplate from "../../react-email-starter/emails/forgotPasswordOtpEmailTemplate";
import { ApiResponse } from "@/types/ApiResponse";
import nodemailer from "nodemailer";
import { render } from "@react-email/components";
export async function sendForgotPasswordOtp(
  email: string,
  username: string,
  verifytoken: string
): Promise<ApiResponse> {
  try {
    // await resend.emails.send({
    //   from: "rajputds@resend.dev",
    //   to: email,
    //   subject: "MystryWorld || Email Verification",
    //   react: resendVerifacationEmailTemplate({ username, otp: verifytoken }),
    // });
    // return {
    //   success: true,
    //   message: "Verification email sent successfully",
    // };
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const htmlcontent = await render(
      ForgotPasswordOtpEmailTemplate({ username, otp: verifytoken })
    );
    await transporter.sendMail({
      from: `"MystryWorld" ${process.env.GMAIL_USER}`,
      to: email,
      subject: "MystryWorld || Password Reset Email",
      html: htmlcontent,
    });
    console.log("Mail sent for verification");
    return {
      success: true,
      message: "Password reset email sent successfully",
    };
  } catch (emailerror) {
    console.log("Error while sending Password reset Email", emailerror);
    return {
      success: false,
      message: "Error while sending Password reset Email",
    };
  }
}
