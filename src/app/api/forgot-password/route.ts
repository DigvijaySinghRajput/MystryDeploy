import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import bcrypt from "bcrypt";
import { sendverificationEmail } from "@/helpers/sendVericationEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, newpassword } = await request.json();

    const existingUserByEmail = await UserModel.findOne({ email });

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    if (existingUserByEmail) {
      if (!existingUserByEmail.isverified) {
        return Response.json({
          success: false,
          message: "User not Registered",
        });
      } else {
        existingUserByEmail.password = hashedPassword;
        await existingUserByEmail.save();
      }
    }

    return Response.json(
      {
        success: true,
        message: "User Password Changed successfully",
      },
      {
        status: 201,
      }
    );
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
