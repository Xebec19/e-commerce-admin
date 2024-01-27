import { columns } from "@/components/columns/category-columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/table";
import { getCategoryAPI } from "@/lib/http/category";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import useSWR from "swr";

export default function CategoryList() {
  const { data: categories = [] } = useSWR("category/list", getCategoryAPI);

  return (
    <div className="p-4 space-y-4">
      <div className="flex space-x-2 items-center">
        <h1 className="font-semibold text-lg">Categories</h1>
        <Link to={"create"}>
          <Button size={"icon"}>
            <Plus className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={categories}
        searchableCol="categoryName"
      />
    </div>
  );
}
