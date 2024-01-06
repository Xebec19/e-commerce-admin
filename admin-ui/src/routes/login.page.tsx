import * as environment from "@/lib/environments";
import LoginForm from "@/components/forms/login-form.component";
import { Toast } from "@/components/ui/toast";

export default function Auth() {
  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            alt="Company Logo"
            className="mx-auto h-12 w-auto"
            height="64"
            src={environment.APP_LOGO}
            style={{
              aspectRatio: "64/64",
              objectFit: "cover",
            }}
            width="64"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Admin Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Manage inventory and orders
          </p>
        </div>
        <LoginForm />
      </div>
      <Toast />
    </div>
  );
}
