import LoginCard from "./LoginCard";

export default async function Login() {
  return (
    <div className="flex flex-col p-8 shadow-xl bg-white rounded-md">
      <h1 className="text-2xl font-bold text-center mb-4">
        Log in to Chat App
      </h1>
      <LoginCard />
    </div>
  );
}
