import Navbar from "@/components/layout/navbar.component";
import Sidebar from "@/components/layout/sidebar.component";
import { LayoutDashboard } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function DashboardRoot() {
  return (
    <div className="grid h-screen min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b px-6 ">
          <Link className="lg:hidden" to={"/"}>
            <LayoutDashboard className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            <Navbar />
            {/* <h1 className="font-semibold text-lg">Dashboard</h1> */}
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {/* <div className="border shadow-sm rounded-lg p-2">
            <h2 className="font-semibold text-lg">Welcome to the Dashboard</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Select a section from the sidebar to view its content.
            </p>
          </div> */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
