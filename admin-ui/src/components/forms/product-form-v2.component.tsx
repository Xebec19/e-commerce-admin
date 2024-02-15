import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { MAX_FILE_SIZE } from "@/lib/utils";
import { X } from "lucide-react";

const ZodProduct = z.object({
  category_id: z.string(),
  product_name: z.string(),
  price: z.string(),
  delivery_price: z.string(),
  gender: z.string(),
  product_desc: z.string(),
  quantity: z.string(),
  country_id: z.string(),
  featured_image: z.any(),
  images: z.any(),
});

export default function ProductFormComponent() {
  const [featImg, setFeatImg] = useState<string>();
  const [productImg, setProductImg] = useState<string[]>();

  const featImgRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof ZodProduct>>({
    defaultValues: {
      category_id: "",
      product_name: "",
      price: "0",
      delivery_price: "0",
      gender: "male",
      product_desc: "",
      quantity: "0",
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
    console.log({ files });
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
          <span className="text-red-500 text-sm">
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
                onClick={handleImgUpload}
              />
              <div className="flex flex-wrap">
                {productImg && productImg.length ? (
                  productImg?.map((prd) => (
                    <div key={prd} className="relative">
                      <img src={prd} className="size-4 rounded-md m-2" />
                      <X
                        className="absolute top-4 right-4 pointer"
                        onClick={() => {
                          // setFeatImg("");
                          // if (featImgRef.current) {
                          //   featImgRef.current.value = "";
                          // }
                        }}
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

      <div className="flex flex-col space-y-2"></div>
    </form>
  );
}
