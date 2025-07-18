"use client";

import React, { useState, useMemo } from "react";
import {
  ChevronUp,
  ChevronDown,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export type HextaTableColumn<T> = {
  key: keyof T | string;
  header: string;
  searchKey?: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
};

export type DataTableProps<T> = {
  data: T[];
  columns: HextaTableColumn<T>[];
  className?: string;
  searchKey?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  itemsPerPage?: number;
  showPagination?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  emptyIcon?: string;
  onRowClick?: (row: T, index: number) => void;
  variant?: "default" | "minimal" | "bordered";
  size?: "sm" | "default" | "lg";
};

export function HextaTable<T extends Record<string, any>>({
  data,
  columns,
  className,
  searchKey,
  searchable = true,
  searchPlaceholder = "Search...",
  itemsPerPage = 10,
  showPagination = true,
  striped = false,
  hoverable = true,
  bordered = true,
  compact = false,
  loading = false,
  emptyMessage = "No data available",
  emptyIcon = "📊",
  onRowClick,
  variant = "default",
  size = "default",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>(
    {},
  );

  // Helper to access nested properties
  const getNestedValue = (obj: T, key: string | keyof T) => {
    if (typeof key !== "string" || !key.includes(".")) {
      return obj[key as keyof T];
    }
    return key.split(".").reduce((o, k) => (o ? o[k] : undefined), obj as any);
  };

  // Filter data
  const filteredData = useMemo(() => {
    let filtered = [...data];
    if (search) {
      filtered = filtered.filter((row) =>
        columns.some((column) => {
          const key = column.searchKey || column.key;
          const value = getNestedValue(row, key as any);
          return value?.toString().toLowerCase().includes(search.toLowerCase());
        }),
      );
    }
    Object.entries(columnFilters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((row) => {
          const rowValue = getNestedValue(row, key);
          return rowValue
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        });
      }
    });
    return filtered;
  }, [data, search, columnFilters, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = getNestedValue(a, sortConfig.key!);
      const bValue = getNestedValue(b, sortConfig.key!);
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const paginatedData = useMemo(() => {
    if (!showPagination) return sortedData;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage, showPagination]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key: keyof T | string) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleColumnFilter = (key: string, value: string) => {
    setColumnFilters((prev) => ({
      ...prev,
      [searchKey ? searchKey : key]: value,
    }));
    setCurrentPage(1);
  };

  const clearColumnFilter = (key: string) => {
    setColumnFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const generatePageNumbers = () => {
    const pageNumbers: (number | "ellipsis")[] = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++)
          pageNumbers.push(i);
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  if (loading) {
    return (
      <div
        className={cn(
          "w-full bg-card rounded-ele overflow-hidden",
          bordered && "border border-border",
          className,
        )}
      >
        <div className="animate-pulse p-6">
          {searchable && <div className="mb-6 h-10 bg-muted rounded-ele"></div>}
          <div className="border border-border rounded-ele overflow-hidden">
            <div className="bg-muted/30 h-12"></div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="h-14 border-t border-border bg-card"
              ></div>
            ))}
          </div>
          {showPagination && (
            <div className="mt-6 flex justify-between items-center">
              <div className="h-4 bg-muted rounded w-48"></div>
              <div className="flex gap-2">
                <div className="h-9 w-20 bg-muted rounded-ele"></div>
                <div className="h-9 w-9 bg-muted rounded-ele"></div>
                <div className="h-9 w-9 bg-muted rounded-ele"></div>
                <div className="h-9 w-16 bg-muted rounded-ele"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full bg-card rounded-ele overflow-hidden",
        bordered && "border border-border",
        variant === "minimal" && "bg-transparent border-none",
        className,
      )}
      role="table"
      aria-label="Data table"
    >
      {searchable && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 pb-4">
          <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-sm">
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              leftIcon={<Search className="h-5 w-5" />}
              clearable
              onClear={() => {
                setSearch("");
                setCurrentPage(1);
              }}
              className="w-full"
            />
          </div>
          {Object.keys(columnFilters).length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              {Object.entries(columnFilters).map(([key, value]) => (
                <Badge
                  key={`filter-${key}`}
                  variant="secondary"
                  className="text-xs cursor-pointer"
                  onClick={() => clearColumnFilter(key)}
                >
                  {key}: {value} ×
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
      <div
        className={cn(
          "overflow-hidden",
          variant === "bordered" && "border border-border rounded-ele",
          variant === "minimal" && "border-none",
          !searchable && variant !== "minimal" && "rounded-ele",
        )}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead
              className={cn(
                "bg-muted/20",
                variant === "minimal" &&
                  "bg-transparent border-b border-border",
              )}
            >
              <tr>
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={cn(
                      "text-left font-semibold text-foreground",
                      size === "sm" && "px-3 py-2 text-xs",
                      size === "default" && "px-4 py-3 text-sm",
                      size === "lg" && "px-6 py-4 text-base",
                      column.sortable &&
                        "cursor-pointer hover:bgfeet/30 transition-colors",
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right",
                      column.width && `w-[${column.width}]`,
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                    style={column.width ? { width: column.width } : undefined}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-2",
                        column.align === "center" && "justify-center",
                        column.align === "right" && "justify-end",
                      )}
                    >
                      <span>{column.header}</span>
                      {column.sortable && (
                        <div className="flex flex-col">
                          <ChevronUp
                            className={cn(
                              "h-3 w-3 transition-colors",
                              sortConfig.key === column.key &&
                                sortConfig.direction === "asc"
                                ? "text-primary"
                                : "text-muted-foreground/40",
                            )}
                          />
                          <ChevronDown
                            className={cn(
                              "h-3 w-3 -mt-1 transition-colors",
                              sortConfig.key === column.key &&
                                sortConfig.direction === "desc"
                                ? "text-primary"
                                : "text-muted-foreground/40",
                            )}
                          />
                        </div>
                      )}
                      {column.filterable && (
                        <div className="relative">
                          <Filter className="h-3 w-3 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>
                    {column.filterable && (
                      <div className="mt-2">
                        <Input
                          placeholder="Filter..."
                          value={
                            columnFilters[
                              String(column.searchKey || column.key)
                            ] || ""
                          }
                          onChange={(e) =>
                            handleColumnFilter(
                              String(column.searchKey || column.key),
                              e.target.value,
                            )
                          }
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs"
                          clearable
                          onClear={() =>
                            clearColumnFilter(
                              String(column.searchKey || column.key),
                            )
                          }
                        />
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-card">
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className={cn(
                      "text-center text-muted-foreground bg-card",
                      size === "sm" && "px-3 py-8",
                      size === "default" && "px-4 py-12",
                      size === "lg" && "px-6 py-16",
                    )}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <div className="text-4xl opacity-50">{emptyIcon}</div>
                      <div className="font-medium">{emptyMessage}</div>
                      <div className="text-sm opacity-75">
                        Try adjusting your search or filter criteria
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, index) => (
                  <tr
                    key={row.id || `${row.username}-${index}`}
                    className={cn(
                      "border-t border-border bg-card transition-colors",
                      striped && index % 2 === 0 && "bg-muted/10",
                      hoverable && "hover:bg-muted/20",
                      onRowClick && "cursor-pointer",
                      "group",
                    )}
                    onClick={() => onRowClick?.(row, index)}
                  >
                    {columns.map((column) => (
                      <td
                        key={String(column.key)}
                        className={cn(
                          "text-foreground",
                          size === "sm" && "px-3 py-2 text-xs",
                          size === "default" && "px-4 py-3 text-sm",
                          size === "lg" && "px-6 py-4 text-base",
                          column.align === "center" && "text-center",
                          column.align === "right" && "text-right",
                        )}
                      >
                        {column.render
                          ? column.render(getNestedValue(row, column.key), row)
                          : String(getNestedValue(row, column.key) ?? "")}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showPagination && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 pt-4 bg-card border-t border-border">
          <div className="text-sm text-muted-foreground order-2 sm:order-1">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, sortedData.length)} of{" "}
            {sortedData.length} results
          </div>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="hidden sm:flex items-center gap-1">
              {generatePageNumbers().map((pageNumber, index) => {
                if (pageNumber === "ellipsis") {
                  return (
                    <Button
                      key={`ellipsis-${index}`}
                      variant="ghost"
                      size="sm"
                      disabled
                      className="cursor-default"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  );
                }
                return (
                  <Button
                    key={`page-${pageNumber}`}
                    variant={currentPage === pageNumber ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNumber as number)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
