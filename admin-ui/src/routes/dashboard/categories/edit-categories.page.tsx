import CategoryForm from "@/components/forms/category-form.component";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { editCategory, getCategoryByIdAPI } from "@/lib/http/category";
import CategorySchema from "@/schema/category.schema";
import { useNavigate, useParams } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import { z } from "zod";

export default function EditCategoryPage() {
  const { id = "0" } = useParams();
  const { toast } = useToast();
  const { data } = useSWR(!isNaN(+id) ? ["category", id] : null, () =>
    getCategoryByIdAPI(id)
  );
  const { mutate } = useSWRConfig();

  const navigate = useNavigate();

  async function onSubmit(value: z.infer<typeof CategorySchema>) {
    try {
      const response = await editCategory(value);
      if (!response.status) {
        throw new Error("Request failed");
      }
      toast({
        title: "Category updated",
      });

      navigate("/dashboard/category");

      mutate("category/list");
    } catch (error: unknown) {
      console.error({ error });
      toast({
        variant: "destructive",
        title: "Something went wrong!",
      });
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex space-x-2 items-center">
        <h1 className="font-semibold text-lg">Edit Category</h1>
      </div>
      <div>
        {data ? (
          <CategoryForm {...data} onSubmit={onSubmit} />
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
