"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";
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
import { signIn } from "next-auth/react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";

function ResetPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const searchParam = useSearchParams();
  const email = searchParam.get("email");
  //zod implementation
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  const onsubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await axios.post<ApiResponse>("/api/change-password", {
        newPassword: data.newPassword,
        email,
      });
      toast("Success", {
        description: result.data.message,
      });
      router.replace("/sign-in");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast("Failed", {
        description: axiosError.response?.data.message,
        className: "bg-red-600 text-white border border-red-700",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl text-foreground font-extrabold tracking-tight lg:text-5xl mb-6">
            Reset Password
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
            <FormField
              name="newPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="off"
                      placeholder="Enter New Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> Please
                  wait
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Remember Password?{" "}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
