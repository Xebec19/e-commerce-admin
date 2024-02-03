import { CategoryFormType } from "@/types/form.type";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectItem, SelectValue } from "../ui/select";
import { SelectContent, SelectTrigger } from "@radix-ui/react-select";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import CategorySchema from "@/schema/category.schema";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type CategoryForm = {
  categoryId: number;
  categoryName: string;
  image: File;
  status: string;
};
type CategoryFormProps = {
  categoryId?: number;
  categoryName?: string;
  status?: string;
  imageUrl?: string;
  onSubmit: (value: CategoryFormType) => void;
};

export default function CategoryForm({
  categoryId = 0,
  categoryName = "",
  imageUrl = "",
  status = "active",
  onSubmit,
}: CategoryFormProps) {
  const [imagePreview, setImagePreview] = useState<string>(imageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoryForm>({
    defaultValues: {
      categoryId,
      categoryName,
      status,
    },
    resolver: zodResolver(CategorySchema),
  });

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setValue("image", file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
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
        <Label htmlFor="image">Category Image</Label>
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <div className="space-y-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />
              {imagePreview ? (
                <div className="relative rounded-md border aspect-square w-20">
                  <X
                    className="absolute right-1 top-1 h-4 w-4 cursor-pointer rounded-full "
                    onClick={() => {
                      field.onChange("");
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                  />
                  <img
                    src={imagePreview}
                    className="h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105 "
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
        />
        {errors.image && (
          <span className="text-red-500">
            {errors.image.type === "custom"
              ? "Invalid image"
              : errors.image.message}
          </span>
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
