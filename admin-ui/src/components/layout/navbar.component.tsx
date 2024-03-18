import logo from "@/assets/icons8-shopaholic-color-32.png";
import { APP_NAME } from "@/lib/environments";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import { useAppProvider } from "@/stores/app.provider";
import useLogout from "@/hooks/use-logout";

export default function Navbar() {
  const appName = APP_NAME;

  const { isLoggedIn } = useAppProvider();
  const handleLogout = useLogout();

  return (
    <nav
      aria-roledescription="navigation bar"
      className="py-4 px-2 flex justify-between items-center container"
    >
      <Link to={"/dashboard"} className="flex items-center">
        <div className="mr-2">
          <img src={logo} alt="logo" />
        </div>
        <span>{appName}</span>
      </Link>

      <div role="group of navigation links" className="items-center space-x-2">
        <ModeToggle />

        {!isLoggedIn && (
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => handleLogout()}
          >
            <LogOut />
          </Button>
        )}
      </div>
    </nav>
  );
}
