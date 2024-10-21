"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import formatDate from "@/lib/formatDate";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const DataTableDemo = () => {
    const router = useRouter();
    const [data, setData] = React.useState([]); // Blog data state
    const [loading, setLoading] = React.useState(false);
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});
    // Fetch blog data from the API
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/api/blogs/");
                if (res.status === 200) {
                    setData(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    // Delete blog post function
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/api/blogs/${id}`);
            if (res.status === 200) {
                setData((prevData) => prevData.filter((blog) => blog._id !== id));
                toast({
                    variant: '',
                    title: "Deleted successfully",
                    // description: "There was a problem with your request.",
                });
            } else {
                console.error("Failed to delete blog");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    const columns = [
        {
            accessorKey: "image",
            header: "Post Image",
            cell: ({ row }) => <div><Image src={row.getValue("image")?.url} width={100} height={100} className="rounded" priority={false} alt="image" /></div>,
        },
        {
            accessorKey: "posttitle",
            header: "Title",
            cell: ({ row }) => <div>{row.getValue("posttitle")}</div>,
        },
        {
            accessorKey: "createdAt",
            header: "Post date",
            cell: ({ row }) => <div className="capitalize">{formatDate(row.getValue("createdAt"))}</div>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const blog = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(blog._id)}
                            >
                                Copy blog ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => router.push(`/admin/manage-posts/edit-post/${blog._id}`)}>
                                Edit Blog
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(blog._id)}>
                                Delete Blog
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div>
            <div className="flex justify-between">
                <h1 className='font-bold text-gray-700 text-2xl mb-7'>Add New Post</h1>
                <Link href="/admin/manage-posts/add-post">
                    <Button className="">Add New Post</Button>
                </Link>
            </div>
            <div className="w-full">
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter by title..."
                        value={(table.getColumn("posttitle")?.getFilterValue()) ?? ""}
                        onChange={(event) =>
                            table.getColumn("posttitle")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                ?.getAllColumns()
                                ?.filter((column) => column.getCanHide())
                                ?.map((column) => (
                                    <DropdownMenuItem
                                        key={column.id}
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table?.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataTableDemo;