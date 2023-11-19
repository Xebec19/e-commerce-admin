import LoginImage from "@/assets/undraw_mornings_re_cofi.svg";
import LoginForm from "@/components/forms/login-form.component";

export default function Login() {
  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
      <div className="hidden md:flex group h-full w-full items-center justify-center overflow-hidden rounded-lg relative border-neutral-200 ">
        <img src={LoginImage} alt="login illustration" />
      </div>
      <LoginForm />
    </div>
  );
}
