import ProductFormComponent from "@/components/forms/product-form.component";
import { useToast } from "@/components/ui/use-toast";
import { createProduct } from "@/lib/http/product";
import { ZodProductForm as ZodProduct } from "@/schema/product.schema";
import { z } from "zod";

export default function CreateProduct() {
  const { toast } = useToast();
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
  return (
    <div className="p-4">
      <h1 className="font-semibold pb-2">Create Product</h1>
      <ProductFormComponent onSubmit={handleSubmit} />
    </div>
  );
}
