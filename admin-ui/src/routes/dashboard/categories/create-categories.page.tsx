import CategoryForm from "@/components/forms/category-form.component";
import { useToast } from "@/components/ui/use-toast";
import { createCategory } from "@/lib/http/category";
import { CategoryFormType } from "@/types/form.type";

export default function CreateCategoriesPage() {
  const { toast } = useToast();

  async function onSubmit(value: CategoryFormType) {
    try {
      const response = await createCategory(value);
      if (!response.status) {
        throw new Error("Request failed");
      }
      toast({
        title: "Category created",
      });
    } catch (error: unknown) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Something went wrong!",
      });
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex space-x-2 items-center">
        <h1 className="font-semibold text-lg">Create Category</h1>
      </div>
      <div className="flex justify-start">
        <CategoryForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}
