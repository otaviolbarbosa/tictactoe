"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import logo from "@/assets/images/logo.png";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import GoogleButton from "@/components/GoogleButton";

const loginSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(5, "Must be at least 5 characters long"),
});

type FormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      setIsLoading(true);
      const loginData = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (loginData?.error) {
        throw new Error();
      }

      router.push("/game");
    } catch (error) {
      console.log(error);
      toast.error("Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonPress = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signIn("google", { redirectTo: "/game" });
  };

  return (
    <div className="px-4 py-10">
      <div className="flex flex-col flex-1 gap-3 max-w-96 w-full h-screen mx-auto">
        <div className="flex justify-center mb-6">
          <Image alt="logo" width={90} height={90} src={logo} />
        </div>
        <div className="text-xl font-bold">Sign in</div>
        <div className="flex flex-col gap-4 border rounded-md border-gray-300 bg-gray-100 p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <Controller
                control={control}
                name="email"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 justify-between items-baseline">
                      <label>Email</label>
                      {error && (
                        <div className="text-xs text-red-600 font-semibold text-right">
                          {error.message}
                        </div>
                      )}
                    </div>
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      className={[
                        "w-full border rounded-md border-gray-400 p-3 outline-none",
                        error && "border-red-500 text-red-600",
                      ].join(" ")}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 justify-between items-baseline">
                      <label>Password</label>
                      {error && (
                        <div className="text-xs text-red-600 font-semibold text-right">
                          {error.message}
                        </div>
                      )}
                    </div>
                    <input
                      type="password"
                      placeholder="Enter a password"
                      className={[
                        "w-full border rounded-md border-gray-400 p-3 outline-none",
                        error && "border-red-500 text-red-600",
                      ].join(" ")}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  </div>
                )}
              />
              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full border rounded-lg border-gray-400 p-3 text-white font-semibold bg-blue-700 mt-2 shadow-md"
                >
                  Sign in
                </button>
                <div className="flex gap-2 items-center">
                  <hr className="flex-1 border-gray-400" />
                  or
                  <hr className="flex-1 border-gray-400" />
                </div>
                <GoogleButton
                  disabled={isLoading}
                  onClick={handleButtonPress}
                />
                <div>
                  <span>Don't have an account?</span>{" "}
                  <Link
                    href="/register"
                    className="text-blue-600 font-semibold"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
