import ProductSchema from "@/schema/product.schema";
import { ProductFormType } from "@/types/form.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectItem, SelectValue } from "../ui/select";
import { SelectContent, SelectTrigger } from "@radix-ui/react-select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function ProductFormComponent({
  productId = "",
  categoryId = "",
  productName = "",
  price = 0,
  deliveryPrice = 0,
  gender = "male",
  productDesc = "",
  quantity = 0,
  status = "active",
}: ProductFormType) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormType>({
    defaultValues: {
      productId,
      categoryId,
      productName,
      price,
      deliveryPrice,
      gender,
      productDesc,
      quantity,
      status,
    },
    resolver: zodResolver(ProductSchema),
  });

  console.log({ errors });

  const onSubmit = (data: ProductFormType) => console.log({ data });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 grid grid-cols-1 gap-4 rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800 w-full md:w-[50%]"
    >
      <div className="flex flex-col space-y-2">
        <Label htmlFor="productName">Name</Label>
        <Controller
          control={control}
          name="productName"
          render={({ field }) => <Input id="productName" {...field} />}
        />
        {errors.productName && (
          <span className="text-red-500">{errors.productName.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="price">Price</Label>
        <Controller
          control={control}
          name="price"
          render={({ field }) => <Input id="price" type="number" {...field} />}
        />
        {errors.price && (
          <span className="text-red-500">{errors.price.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="deliveryPrice">Delivery Price</Label>
        <Controller
          control={control}
          name="deliveryPrice"
          render={({ field }) => (
            <Input id="deliveryPrice" type="number" {...field} />
          )}
        />
        {errors.deliveryPrice && (
          <span className="text-red-500">{errors.deliveryPrice.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  id="gender"
                  placeholder="Gender"
                  className="border w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-background border">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.gender && (
          <span className="text-red-500">{errors.gender.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="productDesc">Description</Label>
        <Controller
          control={control}
          name="productDesc"
          render={({ field }) => <Textarea id="productDesc" {...field} />}
        />
        {errors.productDesc && (
          <span className="text-red-500">{errors.productDesc.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="categoryId">Category</Label>
        <Controller
          control={control}
          name="categoryId"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  id="categoryId"
                  placeholder="Category"
                  className="border w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-background border">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.categoryId && (
          <span className="text-red-500">{errors.categoryId.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Controller
          control={control}
          name="quantity"
          render={({ field }) => (
            <Input {...field} type="number" id="quantity" />
          )}
        />
        {errors.quantity && (
          <span className="text-red-500">{errors.quantity.message}</span>
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
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  id="status"
                  placeholder="Status"
                  className="border w-full"
                />
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

      <Button
        type="submit"
        className="md:col-span-2 w-full"
        variant={"outline"}
      >
        Submit
      </Button>
    </form>
  );
}
