"use client";

import * as React from "react";
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
import { Search } from "lucide-react";

interface DataTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessorKey: keyof T | string;
    cell?: (item: T) => React.ReactNode;
  }[];
  searchKey?: string;
  onSearch?: (value: string) => void;
}

export function DataTable<T>({ data, columns, searchKey, onSearch }: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredData = data?.filter((item: any) => {
    if (!searchTerm || !searchKey) return true;
    const value = item[searchKey];
    return typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-4">
      {searchKey && (
        <div className="relative flex items-center max-w-sm">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${searchKey}...`}
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.header}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData?.length ? (
              filteredData.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.header}>
                      {column.cell ? column.cell(item) : (item[column.accessorKey as keyof T] as any)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
