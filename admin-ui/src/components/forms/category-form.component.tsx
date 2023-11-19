import { CategoryFormType } from "@/types/form.type";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectItem, SelectValue } from "../ui/select";
import { SelectContent, SelectTrigger } from "@radix-ui/react-select";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import CategorySchema from "@/schema/category.schema";

export default function CategoryForm({
  categoryId = "",
  categoryName = "",
  imageUrl = "",
  status = "active",
}: CategoryFormType) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categoryId,
      categoryName,
      imageUrl,
      status,
    },
    resolver: zodResolver(CategorySchema),
  });

  const onSubmit = (data: CategoryFormType) => console.log({ data });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 space-y-4 rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800 w-full md:w-[50%]"
    >
      <div className="flex flex-col space-y-2">
        <Label htmlFor="categoryName">Category Name</Label>
        <Controller
          name="categoryName"
          control={control}
          render={({ field }) => <Input {...field} id="categoryName" />}
        />
        {errors.categoryName && (
          <span className="text-red-500">{errors.categoryName.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="imageUrl">Category Image</Label>
        <Controller
          control={control}
          name="imageUrl"
          render={({ field }) => (
            <Input id="categoryImage" {...field} type="file" />
          )}
        />
        {errors.imageUrl && (
          <span className="text-red-500">{errors.imageUrl.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="status">Status</Label>
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger asChild className="w-[180px]">
                <SelectValue placeholder="Theme" className="border w-full" />
              </SelectTrigger>
              <SelectContent className="bg-background border">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.status && (
          <span className="text-red-500">{errors.status.message}</span>
        )}
      </div>

      <Button type="submit" variant="outline" className="w-full">
        Submit
      </Button>
    </form>
  );
}
