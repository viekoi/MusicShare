"use client";
import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  RowSelection,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AlertModal from "./modals/AlertModal";
import { useAlertModal } from "@/hooks/useAlertModal";
import { Song } from "@/types";
import { ChevronLeft, ChevronRight, Trash } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  onDelete: (songs: Song[]) => void;
  loading: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  onDelete,
  loading,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,

    state: {
      columnFilters,
      rowSelection,
    },
  });

  const alertModal = useAlertModal();

  const selectedSongs = table
    .getFilteredSelectedRowModel()
    .flatRows.map((row) => {
      const data: any = { ...row.original };
      return data;
    });

  const onConfirm = () => {
    onDelete(selectedSongs);
  };

  return (
    <>
      <AlertModal onConfirm={onConfirm} loading={loading} />
      <div>
        <div className="flex items-center py-4">
          <Input
            placeholder="Nhập tên để tìm "
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Không có sản phẩm nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="">
            {selectedSongs.length > 0 && (
              <div className="flex gap-x-2 items-center justify-center">
                <Button
                  size={"icon"}
                  disabled={
                    table.getFilteredSelectedRowModel().rows.length === 0 ||
                    loading
                  }
                  variant={"destructive"}
                  onClick={alertModal.onOpen}
                >
                  <Trash />
                </Button>
                {selectedSongs.length} / {data.length}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2 py-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              type="button"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
