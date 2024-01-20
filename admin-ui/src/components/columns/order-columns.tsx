import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../ui/data-table/column-header";
import { z } from "zod";
import { ZodOrder } from "@/schema/order.schema";
import { format } from "date-fns";

export const columns: ColumnDef<z.infer<typeof ZodOrder>>[] = [
  {
    accessorKey: "orderId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
  },
  {
    accessorKey: "userName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
  },
  {
    accessorKey: "deliveryPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery Price" />
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
  },
  {
    accessorKey: "discountCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount Code" />
    ),
  },
  {
    accessorKey: "discountAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount amount" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "createdOn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created On" />
    ),
    cell: ({ row }) => (
      <span>{format(new Date(row.getValue("createdOn")), "dd/MM/yyyy")}</span>
    ),
  },
];
