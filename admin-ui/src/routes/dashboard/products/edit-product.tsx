import ProductFormComponent from "@/components/forms/product-form.component";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { createProduct, getProductByIdAPI } from "@/lib/http/product";
import { ZodProductForm as ZodProduct } from "@/schema/product.schema";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { z } from "zod";

export default function EditProduct() {
  const { toast } = useToast();
  const params = useParams();
  const id = params.id;
  const { data, isLoading } = useSWR(id ? `product/${id}` : null, () =>
    getProductByIdAPI(id!)
  );

  async function handleSubmit(val: z.infer<typeof ZodProduct>) {
    try {
      const payload = new FormData();
      payload.append("category_id", val.category_id + "");
      payload.append("product_name", val.product_name);
      payload.append("price", val.price + "");
      payload.append("delivery_price", val.delivery_price + "");
      payload.append("gender", val.gender);
      payload.append("product_desc", val.product_desc);
      payload.append("quantity", val.quantity + "");
      payload.append("country_id", val.country_id + "");
      payload.append("featured_image", val.featured_image);
      Array.from(val.images).forEach((fi) =>
        payload.append("images", fi as Blob)
      );

      const response = await createProduct(payload);

      if (!response.data.status) {
        throw new Error(response.data.message);
      }

      toast({
        title: "Product added",
      });

      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
      });
    }

    return false;
  }

  if (!isLoading && !data) {
    return (
      <div className="p-4">
        <span className="text-sm text-red-500">No Product Found!</span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="font-semibold pb-2">Edit Product</h1>
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <ProductFormComponent {...data} onSubmit={handleSubmit} />
      )}
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="p-4 border rounded-md space-y-4">
      <Skeleton className="h-4 rounded-md" />
      <Skeleton className="h-4 rounded-md" />
      <Skeleton className="h-4 rounded-md" />
      <Skeleton className="h-4 rounded-md" />
      <Skeleton className="h-4 rounded-md" />
      <br />
      <Skeleton className="h-4 w-1/4 rounded-md" />
    </div>
  );
}
