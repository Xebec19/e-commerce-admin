import { CategoryFormType } from "@/types/form.type";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectItem, SelectValue } from "../ui/select";
import { SelectContent, SelectTrigger } from "@radix-ui/react-select";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import CategorySchema from "@/schema/category.schema";
import { ChangeEvent, useRef } from "react";
import { X } from "lucide-react";

export default function CategoryForm({
  categoryId = "",
  categoryName = "",
  imageUrl = "",
  status = "active",
}: CategoryFormType) {
  const {
    handleSubmit,
    control,
    setValue,
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setValue("imageUrl", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 space-y-4 rounded-lg border hover:border-blue-600  border-neutral-200 dark:border-neutral-800 w-full md:w-[50%]"
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
            <div className="space-y-2">
              <Input
                id="categoryImage"
                onChange={handleImageUpload}
                type="file"
                ref={fileInputRef}
                accept="image/*"
              />
              {field.value ? (
                <div className="relative rounded-md border aspect-square w-20">
                  <X
                    className="absolute right-1 top-1 h-4 w-4 cursor-pointer rounded-full "
                    onClick={() => {
                      field.onChange("");
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                  />
                  <img
                    src={field.value}
                    className="h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105 "
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
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
              <SelectTrigger className="w-[180px] border rounded-md px-3 py-2">
                <SelectValue
                  placeholder="Status"
                  className="border w-full bg-foreground"
                />
              </SelectTrigger>
              <SelectContent className="bg-background border rounded-md px-3 py-2">
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
