import Navbar from "@/components/layout/navbar.component";
import Sidebar from "@/components/layout/sidebar.component";
import { Toaster } from "@/components/ui/toaster";
import { LayoutDashboard } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function DashboardRoot() {
  return (
    <div className="grid w-full min-h-screen lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b px-6 ">
          <Link className="lg:hidden" to={"/"}>
            <LayoutDashboard className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            <Navbar />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 min-h-[90vh]">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
