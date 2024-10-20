"use client";

import React, { useState } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { mfData, sipData, saiData, sidData, kimData, otherData, swpData, stpData } from "@/data/downloadforms";

function DataTableDemo({ data }) {
    const [loadingid, setLoadingId] = useState(null)
    const handleDownload = async ({ original }) => {
        console.log(original)
        setLoadingId(original.id)
        const response = await axios.post("/api/generate-pdf", { arnNumber: '1234', euin: '1234', pdfpath: original.pdfUrl, axis: original.axis, euinAxis: original.euinAxis }, {
            responseType: 'blob'
        });

        // Create a blob URL for the PDF
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        setLoadingId(null)
        // Open the PDF in a new tab
        window.open(url, '_blank');
    }
    const columns = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
        },
        {
            accessorKey: "pdf",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-semibold max-w-4xl">{row.getValue("pdf")}</div>,
        },
        {
            id: "actions",
            header: 'Download',
            cell: ({ row }) => {
                const isLoading = loadingid === row.original.id;
                return (
                    <div>
                        {!isLoading ? (<Button onClick={() => handleDownload(row)}>Download</Button>) : (<Button>Loading..</Button>)}
                    </div>
                );
            },
        },
    ];
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter pdfs..."
                    value={table.getColumn("pdf")?.getFilterValue() || ""}
                    onChange={(event) =>
                        table.getColumn("pdf")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
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
                        {table.getRowModel().rows?.length ? (
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
    );
}

export default function DownloadForms() {
    const [selectedCategory, setSelectedCategory] = useState('mf');

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    // Determine which data set to use based on selected category
    const data = selectedCategory === 'sip' ? sipData : selectedCategory === 'mf' ? mfData : selectedCategory === 'stp' ? stpData : selectedCategory === 'sai' ? saiData : selectedCategory === 'sid' ? sidData : selectedCategory === 'kim' ? kimData : selectedCategory === 'other' ? otherData : swpData;
    return (
        <div className='lg:px-40 md:px-20 px-5 my-10'>
            <div className='px-5 py-3 bg-gray-950 text-white flex flex-wrap gap-x-10 rounded'>
                <div className='cursor-pointer' onClick={() => handleCategoryClick('mf')}>
                    <p className={`uppercase font-semibold ${selectedCategory === 'mf' ? 'text-green-600' : ''}`}>MF Forms</p>
                </div>
                <div className='cursor-pointer' onClick={() => handleCategoryClick('sip')}>
                    <p className={`uppercase font-semibold ${selectedCategory === 'sip' ? 'text-green-600' : ''}`}>SIP Forms</p>
                </div>
                <div className='cursor-pointer' onClick={() => handleCategoryClick('stp')}>
                    <p className={`uppercase font-semibold ${selectedCategory === 'stp' ? 'text-green-600' : ''}`}>STP FORM</p>
                </div>
                <div className='cursor-pointer' onClick={() => handleCategoryClick('swp')}>
                    <p className={`uppercase font-semibold ${selectedCategory === 'swp' ? 'text-green-600' : ''}`}>SWP FORM</p>
                </div>
                <div className='cursor-pointer' onClick={() => handleCategoryClick('other')}>
                    <p className={`uppercase font-semibold ${selectedCategory === 'other' ? 'text-green-600' : ''}`}>OTHER</p>
                </div>
                <div className='cursor-pointer' onClick={() => handleCategoryClick('kim')}>
                    <p className={`uppercase font-semibold ${selectedCategory === 'kim' ? 'text-green-600' : ''}`}>KIM FORM</p>
                </div>

                <div className='cursor-pointer' onClick={() => handleCategoryClick('sid')}>
                    <p className={`uppercase font-semibold ${selectedCategory === 'sid' ? 'text-green-600' : ''}`}>SID FORM</p>
                </div>
                <div className='cursor-pointer' onClick={() => handleCategoryClick('sai')}>
                    <p className={`uppercase font-semibold ${selectedCategory === 'sai' ? 'text-green-600' : ''}`}>SAI FORM</p>
                </div>
            </div>
            <div>
                <DataTableDemo data={data} />
            </div>
        </div>
    );
}
