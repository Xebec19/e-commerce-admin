import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ChangeEvent, useRef, useState } from "react";
import { MAX_FILE_SIZE } from "@/lib/utils";
import { FileUp, X } from "lucide-react";
import { Select, SelectItem, SelectValue } from "../ui/select";
import { SelectContent, SelectTrigger } from "@radix-ui/react-select";
import useSWR from "swr";
import { getCategoryAPI } from "@/lib/http/category";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ZodProductForm as ZodProduct } from "@/schema/product.schema";
import { useToast } from "../ui/use-toast";

type ProductFormComponentProps = {
  category_id?: number;
  product_name?: string;
  price?: number;
  delivery_price?: number;
  gender?: string;
  product_desc?: string;
  quantity?: number;
  country_id?: number;
  featured_image?: string;
  images?: string[];
  onSubmit: (val: z.infer<typeof ZodProduct>) => Promise<boolean>;
};

export default function ProductFormComponent({
  category_id = 1,
  product_name = "",
  price = 0,
  delivery_price = 0,
  gender = "male",
  product_desc = "",
  quantity = 0,
  country_id = 1,
  featured_image = "",
  images = [],
  onSubmit,
}: ProductFormComponentProps) {
  const [featImg, setFeatImg] = useState<string>(featured_image);
  const [productImg, setProductImg] = useState<string[]>(images);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const featImgRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const { data: categories = [] } = useSWR("category/list", getCategoryAPI);

  const {
    handleSubmit,
    control,
    setError,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof ZodProduct>>({
    defaultValues: {
      category_id: category_id + "",
      product_name,
      price: price + "",
      delivery_price: delivery_price + "",
      gender,
      product_desc,
      quantity: quantity + "",
      country_id,
      featured_image,
      images,
    },
    resolver: zodResolver(ZodProduct),
  });

  const imagesVal = watch("images");

  function resetForm() {
    reset();
    setFeatImg("");
    setProductImg([]);
    if (featImgRef.current) {
      featImgRef.current.value = "";
    }
    if (imgRef.current) {
      imgRef.current.value = "";
    }
  }

  const submit = async (data: z.infer<typeof ZodProduct>) => {
    try {
      setIsLoading(true);
      const response = await onSubmit(data);
      if (!response) {
        throw new Error("Request failed");
      }
      resetForm();
      toast({
        title: "Product added successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Request failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  function handleFeatImgUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("featured_image", {
        message: "Image should be less than 5MB",
      });

      return;
    }

    const url = URL.createObjectURL(file);
    setFeatImg(url);
    setValue("featured_image", file);
  }

  function handleImgUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) {
      return;
    }

    const urls = [] as string[];
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > MAX_FILE_SIZE) {
        setError("images", {
          message: "Image should be less than 5MB",
        });
        return;
      }
      const url = URL.createObjectURL(files[i]);
      urls.push(url);
    }
    setValue("images", [...productImg, ...files]);
    setProductImg((prevState) => [...prevState, ...urls]);
  }

  function removeImg(idx: number) {
    const tempFiles = Array.from(productImg || []).filter(
      (_, index) => index !== idx
    );
    setProductImg(tempFiles);

    const tempVals = Array.from(imagesVal || []).filter(
      (_, index) => index != idx
    );
    setValue("images", tempVals);
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
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
                className="hidden"
                onChange={handleFeatImgUpload}
                ref={featImgRef}
              />
              <Button
                type="button"
                variant={"outline"}
                className="w-full"
                onClick={() => featImgRef.current?.click()}
              >
                <FileUp className="size-4" />
                &nbsp;&nbsp;<span>Upload Featured Image</span>
              </Button>
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
                        setValue("featured_image", "");
                      }
                    }}
                  />
                </div>
              )}
            </>
          )}
        />
        {errors.featured_image && (
          <span className="text-sm text-red-500">
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
                className="hidden"
                ref={imgRef}
                onChange={handleImgUpload}
              />
              <Button
                type="button"
                variant={"outline"}
                className="w-full"
                onClick={() => imgRef.current?.click()}
              >
                <FileUp className="size-4" />
                &nbsp;&nbsp;<span>Upload Images</span>
              </Button>
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
            <select
              className="bg-background border px-3 py-2 rounded-md space-y-2"
              value={field.value}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                field.onChange(e.target.value)
              }
            >
              {categories.map((cat) => (
                <option
                  key={cat.categoryId}
                  value={cat.categoryId}
                  className="my-2"
                >
                  {cat.categoryName}
                </option>
              ))}
            </select>
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
            <select
              className="bg-background border px-3 py-2 rounded-md space-y-2"
              value={field.value}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                field.onChange(e.target.value)
              }
            >
              <option value={"male"} className="my-2">
                Male
              </option>
              <option value={"female"} className="my-2">
                Female
              </option>
            </select>
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

      <Button type="submit" className={"w-full"} disabled={isLoading}>
        Submit
      </Button>
    </form>
  );
}
