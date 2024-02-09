import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "../ui/data-table/column-header";
import CategoryActions from "../category/table-actions";
import { z } from "zod";
import { ZodCategory } from "@/schema/category.schema";

export const columns: ColumnDef<z.infer<typeof ZodCategory>>[] = [
  {
    accessorKey: "categoryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category Name" />
    ),
  },
  {
    accessorKey: "imageUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => (
      <div className="relative border rounded-md max-w-[11rem]">
        <img className="aspect-square w-full" src={row.getValue("imageUrl")} />
      </div>
    ),
    enableSorting: false,
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
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CategoryActions row={row} />,
  },
];
