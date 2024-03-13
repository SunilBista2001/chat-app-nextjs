import RegisterCard from "./RegisterCard";

export default async function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 bg-white rounded-lg shadow-md min-w-80">
        <h1 className="text-2xl font-bold text-center mb-4">
          Sign up to Chat App
        </h1>
        <RegisterCard />
      </div>
    </div>
  );
}
