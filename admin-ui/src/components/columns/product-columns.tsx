import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "../ui/data-table/column-header";
import { z } from "zod";
import { ZodProduct as ProductSchema } from "@/schema/product.schema";
import ProductActions from "../product/table-actions";

export const columns: ColumnDef<z.infer<typeof ProductSchema>>[] = [
  {
    accessorKey: "product_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product ID" />
    ),
  },
  {
    accessorKey: "product_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
  },
  {
    accessorKey: "image_url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => (
      <div className="relative border rounded-md w-[11rem]">
        <img className="aspect-square w-full" src={row.getValue("image_url")} />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "category_name",
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
    accessorKey: "delivery_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery Price" />
    ),
    cell: ({ row }) => (
      <span>
        {typeof row.original.delivery_price === "number"
          ? row.original.delivery_price.toFixed(2)
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
    accessorKey: "created_on",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created on" />
    ),
    cell: ({ row }) => (
      <span>
        {format(new Date(row.getValue("created_on")), "dd/MM/yyyy hh:mm a")}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ProductActions row={row} />,
  },
];
