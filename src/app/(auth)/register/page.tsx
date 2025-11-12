import { RegisterForm } from "@/components/auth/SignUpForm";
export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-10 md:px-10">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        {/* Form Register */}
        <RegisterForm />
      </div>
    </div>
  );
}

