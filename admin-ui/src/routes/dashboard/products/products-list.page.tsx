import { columns } from "@/components/columns/product-columns";
import { DataTable } from "@/components/ui/data-table/table-with-pagination";
import { getProductAPI } from "@/lib/http/product";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function ProductList() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data: products, error } = useSWR(
    ["product/list", pageIndex, pageSize],
    () => getProductAPI({ pageIndex, pageSize })
  );

  const pageCount =
    products?.length && !isNaN(products[0].totalCount)
      ? Math.round(products[0].totalCount / pageSize)
      : 0;

  // todo delete below useEffect
  useEffect(() => {
    console.log({ sorting, columnFilters });
  }, [sorting, columnFilters]);

  if (error) {
    console.error(error);
    return (
      <div className="p-4">
        <span className="text-red-500">
          Something went wrong! Products could not be loaded.
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="font-semibold text-lg">Products</h1>
      <DataTable
        columns={columns}
        data={products ?? []}
        searchableCol="categoryName"
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageCount={pageCount}
        sorting={sorting}
        setSorting={setSorting}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        onPaginationChange={setPagination}
      />
    </div>
  );
}
