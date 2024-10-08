"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import logo from "@/assets/images/logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

const registerSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(5, "Must be at least 5 characters long"),
});

type FormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("User created succcessfully!", {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
        });
        return router.push("/login");
      }

      throw Error((await response.json())?.message ?? undefined)

    /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      toast.error(error?.message ?? "Error on creating user", {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
      });
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
        <div className="text-xl font-bold">Sign up</div>
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
                  className="w-full border rounded-lg border-gray-400 p-3 text-white font-semibold bg-blue-700 mt-2 shadow-md"
                >
                  Sign up
                </button>
                <div className="flex gap-2 items-center">
                  <hr className="flex-1 border-gray-400" />
                  or
                  <hr className="flex-1 border-gray-400" />
                </div>
                <button
                  type="button"
                  className="flex w-full border rounded-lg bg-white border-gray-300 p-3 shadow-md"
                  onClick={handleButtonPress}
                >
                  <span className="flex-1 font-semibold text-gray-500 text-justify">
                    Sign up with Google
                  </span>
                  <Image
                    alt="Google logo"
                    width="24"
                    height="24"
                    src="https://authjs.dev/img/providers/google.svg"
                  />
                </button>
                <div>
                  <span>Already have an account?</span>{" "}
                  <Link href="/login" className="text-blue-600 font-semibold">
                    Login
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

export default RegisterPage;
