import { columns } from "@/components/columns/product-columns";
import { DataTable } from "@/components/ui/data-table/table";
import { getProductAPI } from "@/lib/http/product";
import useSWR from "swr";

export default function ProductList() {
  const { data: products } = useSWR("product/list", getProductAPI);
  console.log({ products });

  return (
    <div className="p-4 space-y-4">
      <h1 className="font-semibold text-lg">Products</h1>
      <DataTable
        columns={columns}
        data={products ?? []}
        searchableCol="categoryName"
      />
    </div>
  );
}
