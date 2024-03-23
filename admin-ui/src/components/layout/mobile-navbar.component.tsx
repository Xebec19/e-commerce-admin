import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Home, Layers3, LayoutDashboard, Package, Truck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function MobileNavbar() {
  const { pathname } = useLocation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <LayoutDashboard />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div>
          <nav className="grid items-start px-4 text-sm font-medium divide-y-2">
            <Link
              className={`flex items-center gap-3 px-3 py-2 transition-all hover:text-gray-900  dark:hover:text-gray-50 ${
                pathname == "/dashboard"
                  ? "text-gray-900 dark:text-gray-50"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              to={"/dashboard"}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              className={`flex items-center gap-3 px-3 py-2 transition-all hover:text-gray-900  dark:hover:text-gray-50 ${
                pathname.includes("category")
                  ? "text-gray-900 dark:text-gray-50"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              to="/dashboard/category"
            >
              <Layers3 className="h-4 w-4" />
              Category
            </Link>
            <Link
              className={`flex items-center gap-3 px-3 py-2 transition-all hover:text-gray-900  dark:hover:text-gray-50 ${
                pathname.includes("product")
                  ? "text-gray-900 dark:text-gray-50"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              to="/dashboard/product"
            >
              <Package className="h-4 w-4" />
              Products
            </Link>
            <Link
              className={`flex items-center gap-3 px-3 py-2 transition-all hover:text-gray-900  dark:hover:text-gray-50 ${
                pathname.includes("order")
                  ? "text-gray-900 dark:text-gray-50"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              to="/dashboard/order"
            >
              <Truck className="h-4 w-4" />
              Orders
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
