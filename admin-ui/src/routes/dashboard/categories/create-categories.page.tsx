import CategoryForm from "@/components/forms/category-form.component";

export default function CreateCategoriesPage() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex space-x-2 items-center">
        <h1 className="font-semibold text-lg">Create Category</h1>
      </div>
      <div className="flex justify-start">
        <CategoryForm />
      </div>
    </div>
  );
}
