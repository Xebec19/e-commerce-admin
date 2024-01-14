import { columns } from "@/components/category/columns";
import { DataTable } from "@/components/ui/data-table/table";
import { getCategoryAPI } from "@/lib/http/category";
import useSWR from "swr";

export default function CategoryList() {
  const { data: categories = [] } = useSWR("category/list", getCategoryAPI);

  return (
    <div className="p-4 space-y-4">
      <h1 className="font-semibold text-lg">Category</h1>
      <DataTable
        columns={columns}
        data={categories}
        searchableCol="categoryName"
      />
    </div>
  );
}
