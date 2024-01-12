import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";

export type Column = {
  categoryId: number;
  categoryName: string;
  createdOn: string;
  imageUrl: string;
  status: string;
};

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: "categoryId",
    header: "Category ID",
  },
  {
    accessorKey: "categoryName",
    header: "Category Name",
  },
  {
    accessorKey: "imageUrl",
    header: "Image URL",
  },
  {
    accessorKey: "createdOn",
    header: "Created On",
    cell: ({ row }) => (
      <span>{format(new Date(row.getValue("createdOn")), "dd/MM/yyyy")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
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
