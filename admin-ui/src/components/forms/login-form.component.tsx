import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema/login.schema";
import { LoginFormType } from "@/types/form.type";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginFormType) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 space-y-4 rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800"
    >
      <div className="flex flex-col space-y-2">
        <Label htmlFor="email">Email</Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        {errors && (
          <span className="text-red-500">{errors.email?.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="email">Password</Label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => <Input type="password" {...field} />}
        />
        {errors && (
          <span className="text-red-500">{errors.password?.message}</span>
        )}
      </div>

      <Button variant="outline" type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}
