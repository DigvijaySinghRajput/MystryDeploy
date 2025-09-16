import { resend } from "@/lib/resend";
import resendVerifacationEmailTemplate from "../../react-email-starter/emails/resendVerificationEmailTemplate";
import SendGridVerificationEmailTemplate from "../../react-email-starter/emails/sendGridVerificationEmailTemplate";
import { ApiResponse } from "@/types/ApiResponse";
import sgMail from "@sendgrid/mail";
import { render } from "@react-email/render";

export async function sendverificationEmail(
  email: string,
  username: string,
  verifytoken: string
): Promise<ApiResponse> {
  try {
    // used sendgrid instead of resend
    const emailService = process.env.EMAIL_SERVICE || "resend";
    console.log("Email service being used:", emailService);

    if (emailService === "sendgrid") {
      // Use SendGrid - has good deliverability and won't go to spam
      console.log("Setting SendGrid API key...");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

      console.log("Sending email via SendGrid to:", email);
      const result = await sgMail.send({
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL || "MystryWorld@sendgrid.com",
        subject: "MystryWorld || Email Verification",
        html: await render(
          SendGridVerificationEmailTemplate({ username, otp: verifytoken })
        ),
      });
      console.log("SendGrid response:", result);
    } else {
      // Use Resend with proper domain
      const fromEmail =
        process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "MystryWorld || Email Verification",
        react: resendVerifacationEmailTemplate({ username, otp: verifytoken }),
      });
    }
    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (emailerror) {
    console.log("❌ Error while sending Verification Email:", emailerror);
    console.log("Error details:", JSON.stringify(emailerror, null, 2));
    return {
      success: false,
      message: `Error while sending Verification Email: ${emailerror}`,
    };
  }
}
