import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { newPassword, email } = await request.json();

    const existingUserByEmail = await UserModel.findOne({ email });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (existingUserByEmail) {
      existingUserByEmail.password = hashedPassword;
      existingUserByEmail.save();
      return Response.json(
        {
          success: true,
          message: "User registered successfully, Please verify your email ",
        },
        {
          status: 201,
        }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "User Not Found ",
        },
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    console.log("Error registering User", error);
    return Response.json(
      {
        success: false,
        message: "Failed to Reset User Password",
      },
      {
        status: 500,
      }
    );
  }
}
