import Navbar from "@/components/layout/navbar.component";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Navbar />
      <main className="px-4 container min-h-[60vh] my-4">
        <Outlet />
      </main>
    </>
  );
}
