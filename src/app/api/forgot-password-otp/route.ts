import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import { sendForgotPasswordOtp } from "@/helpers/sendForgotPasswordOtp";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email } = await request.json();

    const existingUserByEmail = await UserModel.findOne({ email });

    if (existingUserByEmail) {
      if (!existingUserByEmail.isverified) {
        return Response.json({
          success: false,
          message: "User not Registered",
        });
      } else {
        const passwordResetToken = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
        const passwordResetTokenExpiry = new Date();
        passwordResetTokenExpiry.setMinutes(
          passwordResetTokenExpiry.getMinutes() + 5
        );
        existingUserByEmail.passwordResetToken = passwordResetToken;
        existingUserByEmail.passwordResetTokenExpiry = passwordResetTokenExpiry;

        await existingUserByEmail.save();

        const username = existingUserByEmail.username;

        const emailResponse = await sendForgotPasswordOtp(
          email,
          username,
          passwordResetToken
        );

        if (!emailResponse.success) {
          return Response.json({
            success: false,
            message: emailResponse.message,
          });
        }

        return Response.json(
          {
            success: true,
            message:
              "OTP sent successfully. Please check your email to reset your password.",
          },
          {
            status: 200,
          }
        );
      }
    } else {
      return Response.json(
        {
          success: true,
          message: "If account exists, OTP sent to your email.",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("Error Changing User Password", error);
    return Response.json(
      {
        success: false,
        message: "Failed to Change Password",
      },
      {
        status: 500,
      }
    );
  }
}
