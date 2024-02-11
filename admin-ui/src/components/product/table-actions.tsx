import { Row } from "@tanstack/table-core";
import { HTMLAttributes } from "react";
import { useToast } from "../ui/use-toast";
import { useSWRConfig } from "swr";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { z } from "zod";
import ProductSchema from "@/schema/product.schema";
import { deleteProduct } from "@/lib/http/product";

interface ProductActionProps extends HTMLAttributes<HTMLDivElement> {
  row: Row<z.infer<typeof ProductSchema>>;
}

export default function ProductActions({ row, className }: ProductActionProps) {
  const { toast } = useToast();
  const { mutate } = useSWRConfig();

  const id = row.original.product_id;

  async function handleDelete(id: string) {
    try {
      if (!confirm("Are you sure?")) {
        return;
      }

      const response = await deleteProduct(id);
      if (!response.data.status) {
        throw new Error("request failed");
      }
      toast({
        title: "Product deleted",
      });
      mutate("product/list");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    }
  }

  return (
    <div className={cn("flex space-x-2", className)}>
      <Link to={`/dashboard/product/${id}`}>
        <Button size={"icon"}>
          <Pencil className="h-4 w-4" />
        </Button>
      </Link>

      <Button size={"icon"} onClick={() => handleDelete(id + "")}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
