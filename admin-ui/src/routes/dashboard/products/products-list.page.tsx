import { columns } from "@/components/columns/product-columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/table";
import { getProductAPI } from "@/lib/http/product";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import useSWR from "swr";

export default function ProductList() {
  const { data: products, error } = useSWR("product/list", () =>
    getProductAPI()
  );

  if (error) {
    console.error(error);
    return (
      <div className="p-4">
        <span className="text-red-500">
          Something went wrong! Products could not be loaded.
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex space-x-4 items-center">
        <h1 className="font-semibold text-lg">Products</h1>

        <Link to="/dashboard/product/create">
          <Button size={"icon"}>
            <Plus className="size-4" />
          </Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={products ?? []}
        searchableCol="product_name"
      />
    </div>
  );
}
