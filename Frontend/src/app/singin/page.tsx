"use client";
import { cn } from "@/utils/cn";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Boxes } from "../component/ui/background-boxes";
import { Input } from "../component/ui/input";
import { Label } from "../component/ui/label";

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent " />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

interface FormData {
  name: string;
  email: string;
  password: string;
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const Page = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/signup", formData);
      console.log("Form submitted successfully:", response.data);
      
      // Show SweetAlert2 success message
      Swal.fire({
        title: 'Success!',
        text: 'Sign up successful.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
       
          router.push('/login'); // Navigate to the login page after the alert is dismissed
      
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while creating your account.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <>
      <div className="min-h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg pt-36 ">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
        <div className="max-w-screen-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black ">
          <form className="my-8 relative z-50" onSubmit={handleSubmit}>
            <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">
              Sign up
            </h1>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="example@example.com"
                type="email"
                className="w-full"
                value={formData.email}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-8">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                className="w-full"
                value={formData.password}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Sign up &rarr;
              <BottomGradient />
            </button>
            <div className="flex justify-center content-center items-center">
              <Link href={`/login`} className="my-8 text-center text-white">
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
