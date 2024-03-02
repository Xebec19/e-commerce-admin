import { cn } from "@/lib/utils";
import { ZodOrder } from "@/schema/order.schema";
import { Row } from "@tanstack/react-table";
import { HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";

interface OrderActionProps extends HTMLAttributes<HTMLDivElement> {
  row: Row<z.infer<typeof ZodOrder>>;
}

export default function OrderActions({ row, className }: OrderActionProps) {
  const id = row.original.orderId;

  return (
    <div className={cn("flex space-x-2", className)}>
      <Link to={`/dashboard/order/${id}`}>
        <Button size={"icon"}>
          <Eye className="size-4" />
        </Button>
      </Link>
    </div>
  );
}
