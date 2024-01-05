import LoginForm from "@/components/forms/login-form.component";

export default function Login() {
  return (
    <div className="h-full w-full p-2 card">
      <div className="md:max-w-[50%]">
        <LoginForm />
      </div>
    </div>
  );
}
