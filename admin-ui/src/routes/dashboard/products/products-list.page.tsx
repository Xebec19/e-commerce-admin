import { columns } from "@/components/columns/product-columns";
import { DataTable } from "@/components/ui/data-table/table";
import { getProductAPI } from "@/lib/http/product";
import useSWR from "swr";

export default function ProductList() {
  const { data: products, error } = useSWR(["product/list"], () =>
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
      <h1 className="font-semibold text-lg">Products</h1>
      <DataTable
        columns={columns}
        data={products ?? []}
        searchableCol="category_name"
      />
    </div>
  );
}
