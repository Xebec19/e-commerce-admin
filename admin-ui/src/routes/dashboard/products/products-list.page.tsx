import { columns } from "@/components/columns/product-columns";
import { DataTable } from "@/components/ui/data-table/table-with-pagination";
import { getProductAPI } from "@/lib/http/product";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import useSWR from "swr";

export default function ProductList() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data: products, error } = useSWR(
    ["product/list", pageIndex, pageSize],
    () => getProductAPI({ pageIndex, pageSize })
  );

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

  const pageCount =
    products?.length && !isNaN(products[0].totalCount)
      ? Math.round(products[0].totalCount / pageSize)
      : 0;

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
        onPaginationChange={setPagination}
      />
    </div>
  );
}
