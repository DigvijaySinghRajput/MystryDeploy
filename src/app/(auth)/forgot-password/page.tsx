"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { LoaderCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ForgotPasswordPage() {
  const [currState, setCurrState] = useState(1);
  const router = useRouter();
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  //zod implementation
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      token: "",
    },
  });

  const handleSendOtp = async (email: string) => {
    console.log("handleSendOtp started, email:", email);
    setIsSendingOtp(true);
    try {
      const response = await axios.post<ApiResponse>(
        `/api/forgot-password-otp`,
        { email }
      );
      toast("Forgot Password Message", {
        description: response.data.message,
        className: "bg-green-600 text-black border border-red-700",
      });
      if (response.status === 200) setCurrState(2);
    } catch (error) {
      console.log("Error in signup of user", error);
      const axiosError = error as AxiosError<ApiResponse>;

      const errorMessage = axiosError.response?.data.message;
      toast("Failed to Reset Password ", {
        description: errorMessage,
        className: "bg-red-600 text-black border border-red-700",
      });
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (
    data: z.infer<typeof forgotPasswordSchema>
  ) => {
    setIsVerifyingOtp(true);
    try {
      const response = await axios.post(`/api/verifypasswordresetcode`, data);
      toast("Success", {
        description: response.data.message,
      });
      if (response.status === 201)
        router.replace(
          `/reset-password?email=${encodeURIComponent(data.email)}`
        );
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast("Verification failed", {
        description: axiosError.response?.data.message,
        className: "bg-red-600 text-white border border-red-700",
      });
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    console.log("Form data:", data);
    if (currState === 2) {
      handleVerifyOtp(data);
    }
    if (currState === 1) {
      handleSendOtp(data.email);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl text-foreground font-extrabold tracking-tight lg:text-5xl mb-6">
            Forgot Password
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      disabled={currState === 2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {currState === 2 && (
              <FormField
                name="token"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP Code</FormLabel>
                    <Input placeholder="Enter OTP Code" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button
              type="submit"
              disabled={currState === 1 ? isSendingOtp : isVerifyingOtp}
            >
              {currState === 1 ? (
                isSendingOtp ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )
              ) : isVerifyingOtp ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
