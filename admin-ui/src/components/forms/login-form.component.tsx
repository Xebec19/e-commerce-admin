import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema/login.schema";
import { LoginFormType } from "@/types/form.type";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { loginAPI } from "@/lib/http/auth";
import { AxiosError } from "axios";
import LocalStorage from "@/lib/local-storage.util";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const onSubmit = async (data: LoginFormType) => {
    try {
      const payload = {
        email: data.email,
        password: btoa(data.password),
      };
      const response = await loginAPI(payload);
      if (!response.data.status) {
        throw new Error(response.data.message);
      }
      toast({
        title: "Success",
        description: "User logged in successfully",
      });
      const token = response.data.payload + "";
      LocalStorage.token = token;
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let errorMessage = error.message;
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message;
      }
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: errorMessage,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 space-y-4 rounded-lg border hover:border-blue-600 relative border-neutral-200 dark:border-neutral-800"
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

      <Button type="submit" className="min-w-[11rem]">
        Submit
      </Button>
    </form>
  );
}
