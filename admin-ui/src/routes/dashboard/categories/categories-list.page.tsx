import { columns } from "@/components/category/columns";
import { DataTable } from "@/components/ui/data-table";

export default function CategoryList() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="font-semibold text-lg">Category</h1>
      <DataTable columns={columns} data={[]} />
    </div>
  );
}
