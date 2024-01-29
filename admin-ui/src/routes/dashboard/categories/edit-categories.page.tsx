import CategoryForm from "@/components/forms/category-form.component";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategoryByIdAPI } from "@/lib/http/category";
import { useParams } from "react-router-dom";
import useSWR from "swr";

export default function EditCategoryPage() {
  const { id = "0" } = useParams();
  const { data } = useSWR(!isNaN(+id) ? ["category", id] : null, () =>
    getCategoryByIdAPI(id)
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex space-x-2 items-center">
        <h1 className="font-semibold text-lg">Edit Category</h1>
      </div>
      <div>
        {data ? (
          <CategoryForm {...data} />
        ) : (
          <div className="flex-col space-y-4">
            <Skeleton className="h-4 w-full max-w-sm" />
            <Skeleton className="h-4 w-full max-w-sm" />
            <Skeleton className="h-4 w-full max-w-sm" />
            <Skeleton className="h-4 w-full max-w-sm" />
            <Skeleton className="h-4 w-[11rem]" />
          </div>
        )}
      </div>
    </div>
  );
}
