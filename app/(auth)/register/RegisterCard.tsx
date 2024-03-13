import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authAction } from "@/lib/actions";
import { Github } from "lucide-react";

export default function RegisterCard() {
  return (
    <>
      <form action={authAction} className="space-y-4">
        <SignUpButton />
      </form>
      <div className="mt-4 text-center text-[13px]">
        <span>Already have an account? </span>
        <Link
          className="text-blue-500 hover:underline text-[13px] mr-1"
          href="/login"
        >
          Log in
        </Link>
      </div>
    </>
  );
}

function SignUpButton() {
  return (
    <Button className="w-full flex gap-2">
      <Github className="w-5 h-5" />
      Sign up with Github
    </Button>
  );
}
