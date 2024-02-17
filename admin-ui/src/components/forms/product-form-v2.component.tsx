import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { MAX_FILE_SIZE } from "@/lib/utils";
import { X } from "lucide-react";
import { Select, SelectItem, SelectValue } from "../ui/select";
import { SelectContent, SelectTrigger } from "@radix-ui/react-select";
import useSWR from "swr";
import { getCategoryAPI } from "@/lib/http/category";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const ZodProduct = z.object({
  category_id: z.string().min(1, { message: "Required" }),
  product_name: z.string().min(1, { message: "Required" }),
  price: z
    .string({ invalid_type_error: "Invalid" })
    .transform((val) => parseInt(val, 10)),
  delivery_price: z
    .string({ invalid_type_error: "Invalid" })
    .transform((val) => parseInt(val, 10)),
  gender: z.string(),
  product_desc: z.string(),
  quantity: z
    .string({ invalid_type_error: "Invalid" })
    .transform((val) => parseInt(val, 10)),
  country_id: z.string().min(1, { message: "Required" }),
  featured_image: z.any(),
  images: z.any(),
});

export default function ProductFormComponent() {
  const [featImg, setFeatImg] = useState<string>();
  const [productImg, setProductImg] = useState<string[]>();

  const featImgRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const { data: categories = [] } = useSWR("category/list", getCategoryAPI);

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof ZodProduct>>({
    defaultValues: {
      category_id: "",
      product_name: "",
      price: 0,
      delivery_price: 0,
      gender: "male",
      product_desc: "",
      quantity: 0,
      country_id: "1",
      featured_image: "",
      images: [],
    },
    resolver: zodResolver(ZodProduct),
  });

  const onSubmit = (data: z.infer<typeof ZodProduct>) => console.log({ data });

  function handleFeatImgUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("featured_image", {
        message: "Image should be less than 5MB",
      });
    }

    const url = URL.createObjectURL(file);
    setFeatImg(url);
  }

  function handleImgUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) {
      return;
    }

    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const url = URL.createObjectURL(files[i]);
      urls.push(url);
    }
    setProductImg(urls);
  }

  function removeImg(idx: number) {
    const tempFiles = Array.from(productImg || []).filter(
      (_, index) => index !== idx
    );
    if (imgRef.current) {
      const selectedFiles = imgRef.current?.files as FileList;
      const dt = new DataTransfer();
      Array.from(selectedFiles || []).forEach((prd, index) => {
        if (index != idx) {
          dt.items.add(prd);
        }
      });
      imgRef.current.files = dt.files;
    }
    setProductImg(tempFiles);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 grid grid-cols-1 gap-4 rounded-lg border  hover:border-blue-600 elative border-neutral-200 dark:border-neutral-800 w-full md:w-[50%]"
    >
      <div className="flex flex-col space-y-2">
        <Label htmlFor="product_name">Name</Label>
        <Controller
          control={control}
          name="product_name"
          render={({ field }) => <Input id="product_name" {...field} />}
        />

        {errors.product_name && (
          <span className="text-red-500  text-sm">
            {errors.product_name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="featured_image">Featured Image</Label>
        <Controller
          control={control}
          name="featured_image"
          render={() => (
            <>
              <Input
                id="featured_image"
                type="file"
                onChange={handleFeatImgUpload}
                ref={featImgRef}
              />
              {featImg && (
                <div className="relative">
                  <img
                    src={featImg}
                    className="size-6 rounded-md aspect-square"
                  />
                  <X
                    className="absolute top-2 right-2 pointer"
                    onClick={() => {
                      setFeatImg("");
                      if (featImgRef.current) {
                        featImgRef.current.value = "";
                      }
                    }}
                  />
                </div>
              )}
            </>
          )}
        />
        {errors.featured_image && (
          <span className="text-sm text-red-50">
            {errors.featured_image.message + ""}
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="Image">Images</Label>
        <Controller
          control={control}
          name="images"
          render={() => (
            <>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                ref={imgRef}
                onChange={handleImgUpload}
              />
              <div className="flex flex-wrap">
                {Array.from(productImg || []).length > 0 ? (
                  productImg?.map((prd, index) => (
                    <div key={prd} className="relative">
                      <img src={prd} className="size-4 rounded-md m-2" />
                      <X
                        className="absolute top-4 right-2 cursor-pointer"
                        onClick={() => removeImg(index)}
                      />
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </>
          )}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="category">Category</Label>
        <Controller
          control={control}
          name="category_id"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger className="min-w-[11rem] border px-3 py-2 rounded-md h-10">
                <SelectValue
                  placeholder="Select Category"
                  className="border w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-background border rounded-md px-3 py-2">
                {categories.map((cat) => (
                  <SelectItem key={cat.categoryId} value={cat.categoryId + ""}>
                    {cat.categoryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.category_id && (
          <span className="text-red-500 text-sm">
            {errors.category_id.message}
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="price">Price</Label>
        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <Input
              id="price"
              placeholder="Enter Price"
              type="number"
              min={0}
              max={100000}
              {...field}
            />
          )}
        />
        {errors.price && (
          <span className="text-red-500 text-sm">{errors.price.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="delivery_price">Delivery Price</Label>
        <Controller
          control={control}
          name="delivery_price"
          render={({ field }) => (
            <Input
              id="delivery_price"
              type="number"
              min={0}
              max={100000}
              placeholder="Enter Delivery Price"
              {...field}
            />
          )}
        />
        {errors.delivery_price && (
          <span className="text-red-500 text-sm">
            {errors.delivery_price.message}
          </span>
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
              <SelectTrigger className="min-w-[11rem] border px-3 py-2 rounded-md">
                <SelectValue
                  placeholder="Select Gender"
                  className="border w-full"
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
          <span className="text-red-500 text-sm">{errors.gender.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="product_desc">Product Description</Label>
        <Controller
          control={control}
          name="product_desc"
          render={({ field }) => (
            <Textarea
              id="product_desc"
              placeholder="Enter Product Description"
              rows={10}
              {...field}
            />
          )}
        />
        {errors.product_desc && (
          <span className="text-red-500 text-sm">
            {errors.product_desc.message}
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Controller
          control={control}
          name="quantity"
          render={({ field }) => (
            <Input
              id="quantity"
              type="number"
              min={0}
              max={1000}
              placeholder="Enter Quantity"
              {...field}
            />
          )}
        />
        {errors.quantity && (
          <span className="text-red-500 text-sm">
            {errors.quantity.message}
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="country">Country</Label>
        <Controller
          control={control}
          name="country_id"
          render={({ field }) => (
            <Select
              value={field.value + ""}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger className="min-w-[11rem] border px-3 py-2 rounded-md h-10">
                <SelectValue
                  placeholder="Select Country"
                  className="border w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-background border rounded-md px-3 py-2">
                <SelectItem value="1">India</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.country_id && (
          <span className="text-red-500 text-sm">
            {errors.country_id.message}
          </span>
        )}
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}
