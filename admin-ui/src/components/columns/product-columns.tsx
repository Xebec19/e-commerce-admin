import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { DataTableColumnHeader } from "../ui/data-table/column-header";
import { z } from "zod";
import ProductSchema from "@/schema/product.schema";

export const columns: ColumnDef<z.infer<typeof ProductSchema>>[] = [
  // {
  //   accessorKey: "productId",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Product ID" />
  //   ),
  // },
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
  },
  {
    accessorKey: "imageUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => (
      <div className="relative border rounded-md w-[11rem]">
        <img className="aspect-square w-full" src={row.getValue("imageUrl")} />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category Name" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => (
      <span>
        {typeof row.original.price === "number"
          ? row.original.price.toFixed(2)
          : "-"}
      </span>
    ),
  },
  {
    accessorKey: "deliveryPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery Price" />
    ),
    cell: ({ row }) => (
      <span>
        {typeof row.original.deliveryPrice === "number"
          ? row.original.deliveryPrice.toFixed(2)
          : "-"}
      </span>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => (
      <span>
        {typeof row.original.quantity === "number"
          ? row.original.quantity.toFixed(2)
          : "-"}
      </span>
    ),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
  },
  {
    accessorKey: "createdOn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created on" />
    ),
    cell: ({ row }) => (
      <span>{format(new Date(row.getValue("createdOn")), "dd/MM/yyyy")}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    accessorFn: () => {
      <span className="flex space-x-2">
        <Button size={"icon"}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button size={"icon"}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </span>;
    },
  },
];
