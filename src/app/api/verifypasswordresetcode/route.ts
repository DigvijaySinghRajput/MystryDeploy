import { z } from "zod";
import { verifySchema } from "@/schemas/verifySchema";
import { usernameValidation } from "@/schemas/signUpSchema";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";

const resetcodeverifychema = forgotPasswordSchema;

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email, token } = await request.json();

    const queryParam = {
      email,
      token,
    };
    if (!queryParam.email || !queryParam.token) {
      return Response.json(
        {
          success: false,
          message: "Username and Verification token required",
        },
        {
          status: 400,
        }
      );
    }
    const result = resetcodeverifychema.safeParse(queryParam);
    if (!result.success) {
      const codeerror = result.error.issues || [];
      return Response.json(
        {
          success: false,
          message:
            codeerror?.length > 0
              ? codeerror.map((e) => e.message).join(", ")
              : "Invalid query parameter",
        },
        {
          status: 400,
        }
      );
    }
    const validatedData = result.data;
    const user = await UserModel.findOne({ email: validatedData.email });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "No User Found",
        },
        {
          status: 500,
        }
      );
    }

    const iscodeValide = user.passwordResetToken === validatedData.token;
    const iscodeNotExpired =
      new Date(user.passwordResetTokenExpiry) > new Date();

    if (iscodeNotExpired && iscodeValide) {
      return Response.json(
        {
          success: true,
          message: "User verified successfully",
        },
        {
          status: 201,
        }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Resert code is invalid or has expired",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error(
      "Error while verifying user:",
      error instanceof Error ? error.stack : error
    );
    return Response.json(
      {
        success: false,
        message: "Error while verifying user",
      },
      {
        status: 500,
      }
    );
  }
}
