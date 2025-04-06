import { SignUpForm } from "@/components/signup-form";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
        <SignUpForm />
      </div>
    </div>
  );
}
