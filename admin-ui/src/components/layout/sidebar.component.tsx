import {
  Home,
  Layers3,
  LayoutDashboard,
  Package,
  Settings,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="hidden border-r lg:block">
      <div className="flex flex-col gap-2">
        <div className="flex h-[60px] items-center px-6">
          <Link className="flex items-center gap-2 font-semibold" to={"/"}>
            <LayoutDashboard className="h-6 w-6" />
            <span className="">Admin Dashboard</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-4 text-sm font-medium divide-y-2">
            <Link
              className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              to={"/dashboard"}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              to="/dashboard/category"
            >
              <Layers3 className="h-4 w-4" />
              Category
            </Link>
            <Link
              className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              to="/dashboard/product"
            >
              <Package className="h-4 w-4" />
              Products
            </Link>
            <Link
              className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              to="/dashboard/order"
            >
              <Truck className="h-4 w-4" />
              Orders
            </Link>
            {/* <Link
              className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              to="#"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link> */}
          </nav>
        </div>
      </div>
    </div>
  );
}
