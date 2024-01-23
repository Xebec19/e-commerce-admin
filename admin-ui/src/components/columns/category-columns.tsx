import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { DataTableColumnHeader } from "../ui/data-table/column-header";

export type Column = {
  categoryId: number;
  categoryName: string;
  createdOn: string;
  imageUrl: string;
  status: string;
};

export const columns: ColumnDef<Column>[] = [
  // {
  //   accessorKey: "categoryId",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Category ID" />
  //   ),
  // },
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
