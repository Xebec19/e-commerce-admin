import { ProductFormType } from "@/types/form.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectItem, SelectValue } from "../ui/select";
import { SelectContent, SelectTrigger } from "@radix-ui/react-select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import ZodProduct from "@/schema/product.schema";

export default function ProductFormComponent({
  product_id = "",
  product_name = "",
  featured_image = "",
  image_url = [],
  quantity = 0,
  price = 0,
  delivery_price = 0,
  product_desc = "",
  gender = "",
  category_id = 0,
}: ProductFormType) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormType>({
    defaultValues: {
      product_id,
      product_name,
      featured_image,
      image_url,
      quantity,
      price,
      delivery_price,
      product_desc,
      gender,
      category_id,
    },
    resolver: zodResolver(ZodProduct),
  });

  const onSubmit = (data: ProductFormType) => console.log({ data });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 grid grid-cols-1 gap-4 rounded-lg border  hover:border-blue-600 border-neutral-200 dark:border-neutral-800 w-full md:w-[50%]"
    >
      <div className="flex flex-col space-y-2">
        <Label htmlFor="product_name">Name</Label>
        <Controller
          control={control}
          name="product_name"
          render={({ field }) => <Input id="product_name" {...field} />}
        />
        {errors.product_name && (
          <span className="text-red-500">{errors.product_name.message}</span>
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
        <Label htmlFor="delivery_price">Delivery Price</Label>
        <Controller
          control={control}
          name="delivery_price"
          render={({ field }) => (
            <Input id="delivery_price" type="number" {...field} />
          )}
        />
        {errors.delivery_price && (
          <span className="text-red-500">{errors.delivery_price.message}</span>
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
              <SelectTrigger className="w-[180px] border rounded-md px-3 py-2">
                <SelectValue
                  id="gender"
                  placeholder="Gender"
                  className="border w-full bg-foreground"
                />
              </SelectTrigger>
              <SelectContent className="bg-background border rounded-md px-3 py-2">
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
        <Label htmlFor="product_desc">Description</Label>
        <Controller
          control={control}
          name="product_desc"
          render={({ field }) => <Textarea id="product_desc" {...field} />}
        />
        {errors.product_desc && (
          <span className="text-red-500">{errors.product_desc.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="category_id">Category</Label>
        <Controller
          control={control}
          name="category_id"
          render={({ field }) => (
            <Select
              value={field.value + ""}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger className="w-[180px] border rounded-md px-3 py-2">
                <SelectValue
                  id="category_id"
                  placeholder="Category"
                  className="border w-full bg-foreground"
                />
              </SelectTrigger>
              <SelectContent className="bg-background border rounded-md px-3 py-2">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.category_id && (
          <span className="text-red-500">{errors.category_id.message}</span>
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
