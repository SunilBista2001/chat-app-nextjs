import { Button } from "@/components/ui/button";
import { authAction } from "@/lib/actions";
import { Github } from "lucide-react";

const RegisterPage = () => {
  return (
    <form action={authAction}>
      <h1>Login to Chat APP</h1>
      <Button type="submit">
        <Github size={24} />
        Login with GitHub
      </Button>
    </form>
  );
};

export default RegisterPage;
