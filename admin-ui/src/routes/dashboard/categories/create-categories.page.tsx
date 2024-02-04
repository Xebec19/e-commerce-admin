import CategoryForm from "@/components/forms/category-form.component";
import { useToast } from "@/components/ui/use-toast";
import { createCategory } from "@/lib/http/category";
import CategorySchema from "@/schema/category.schema";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export default function CreateCategoriesPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  async function onSubmit(value: z.infer<typeof CategorySchema>) {
    try {
      const response = await createCategory(value);
      if (!response.status) {
        throw new Error("Request failed");
      }
      toast({
        title: "Category created",
      });

      navigate("/dashboard/category");
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
