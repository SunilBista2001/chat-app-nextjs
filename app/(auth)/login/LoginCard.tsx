"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authAction } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { Github } from "lucide-react";

const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full flex gap-2" disabled={pending}>
      <Github className="w-5 h-5" /> Log in with Github
    </Button>
  );
};

export default function LoginCard() {
  // @ts-ignore
  const [errorMessage, dispatch] = useFormState(authAction, "");

  return (
    <>
      <form action={dispatch} className="space-y-4">
        <LoginButton />
      </form>
      <div className="mt-4 text-center text-[13px]">
        <span>New To Chat App? </span>
        <Link
          className="text-blue-500 hover:underline text-[13px] mr-1"
          href="/register"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
}
