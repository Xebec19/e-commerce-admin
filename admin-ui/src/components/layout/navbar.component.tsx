import logo from "@/assets/icons8-shopaholic-color-32.png";
import { APP_NAME } from "@/lib/environments";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { KeyRound } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import { useAppProvider } from "@/stores/app.provider";

export default function Navbar() {
  const appName = APP_NAME;

  const { isLoggedIn } = useAppProvider();

  return (
    <nav
      aria-roledescription="navigation bar"
      className="py-4 px-2 flex justify-between items-center container"
    >
      <Link to={"/"} className="flex items-center">
        <div className="mr-2">
          <img src={logo} alt="logo" />
        </div>
        <span>{appName}</span>
      </Link>

      <div role="group of navigation links" className="items-center space-x-2">
        <ModeToggle />

        {!isLoggedIn && (
          <Link to={"/auth/login"}>
            <Button variant={"outline"} size={"icon"}>
              <KeyRound />
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
