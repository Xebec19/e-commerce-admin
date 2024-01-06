import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

export default function AuthRoot() {
  return (
    <>
      <ToastProvider>
        <Outlet />
        <Toaster />
      </ToastProvider>
    </>
  );
}
