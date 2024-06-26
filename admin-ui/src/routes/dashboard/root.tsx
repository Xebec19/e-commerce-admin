import MobileNavbar from "@/components/layout/mobile-navbar.component";
import Navbar from "@/components/layout/navbar.component";
import Sidebar from "@/components/layout/sidebar.component";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

export default function DashboardRoot() {
  return (
    <div className="grid w-full min-h-screen lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b px-6 ">
          <div className="md:hidden">
            <MobileNavbar />
          </div>

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
