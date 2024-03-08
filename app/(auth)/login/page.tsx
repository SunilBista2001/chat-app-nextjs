import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";
import { Github } from "lucide-react";

const LoginPage = () => {
  const handleAuthAction = async () => {
    "use server";
    await signIn("github");
  };

  return (
    <form action={handleAuthAction}>
      <h1>Login to Chat APP</h1>
      <Button type="submit">
        <Github size={24} />
        Login with GitHub
      </Button>
    </form>
  );
};

export default LoginPage;
