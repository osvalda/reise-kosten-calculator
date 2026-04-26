"use client"

import * as React from "react";
import {
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
    IconLayoutColumns,
    IconTrash,
    IconPencil,
    IconCurrentLocation
} from "@tabler/icons-react";
import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type Row,
    type SortingState,
    type VisibilityState,
} from "@tanstack/react-table";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox"
import {
    SheetTrigger,
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter
} from "../ui/sheet";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
    ButtonGroup,
} from "@/components/ui/button-group";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TravelsTable } from "@/app/lib/definitions";
import { formatDateToLocal, formatCurrency, formatDuration } from '@/app/lib/utils';
import { AddModal } from "./add-modal";
import { usePreferences } from "@/app/lib/userPrefferenceProvider";
import { UserData } from "@/app/lib/definitions";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from '@/components/ui/dialog';
import { deleteTravel } from "@/app/lib/actions";
import { editTravel, State, FormResponse } from '@/app/lib/actions';
import { LoaderCircleIcon } from 'lucide-react';
import { toast } from "sonner";

const columns: ColumnDef<TravelsTable>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
            return formatDateToLocal(row.original.date.toString());
        },
        enableHiding: false,
    },
    {
        accessorKey: "destination",
        header: "Destination",
        cell: ({ row }) => (
            row.original.destination
        ),
    },
    {
        accessorKey: "zip",
        header: "Zip Code",
        cell: ({ row }) => (
            <Badge variant="outline" className="px-1.5 text-muted-foreground">
                <IconCurrentLocation /> {row.original.zip}
            </Badge>
        ),
    },
    {
        accessorKey: "start time",
        header: "Start time",
        cell: ({ row }) => { return row.original.start_time },
    },
    {
        accessorKey: "end time",
        header: "End time",
        cell: ({ row }) => (
            <div>{row.original.end_time}</div>
        ),
    },
    {
        accessorKey: "duration",
        header: "IST (h)",
        cell: ({ row }) => {
            return formatDuration(row.original.duration);
        },
    },
    {
        accessorKey: "rounded duration",
        header: "Rounded duration (h)",
        cell: ({ row }) => {
            return formatDuration(row.original.rounded_duration);
        },
    },
    {
        accessorKey: "daily amount",
        header: "Daily amount (€)",
        cell: ({ row }) => {
            return formatCurrency(row.original.rounded_duration * 2.5)
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <ButtonGroup>
                <SheetOpen item={row.original} />
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive" >
                            <IconTrash />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-md'>
                        <DialogHeader className='space-y-2'>
                            <DialogTitle>Delete travel record</DialogTitle>
                            <div className='text-muted-foreground text-sm'>
                                Delete this travel record permanently. This action cannot be undone.
                            </div>
                        </DialogHeader>
                        <DialogFooter className='mt-4 gap-4 sm:justify-end'>
                            <DialogClose asChild>
                                <Button variant='outline'>Cancel</Button>
                            </DialogClose>
                            <form action={() => deleteTravel(row.original.id)}>
                                <Button variant='destructive' type="submit">Delete</Button>
                            </form>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </ButtonGroup>
        ),
    },
]

function NormalTableRow({ row }: { row: Row<TravelsTable> }) {
    return (
        <TableRow
            data-state={row.getIsSelected() && "selected"}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    );
}

export function DataTable({
    data: initialData,
}: {
    data: TravelsTable[]
}) {
    const preferences: UserData = usePreferences();
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    })

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data: initialData,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        getRowId: (row) => row.id || "",
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    return (
        <div>
            {/* Table header */}
            <div className="flex items-center justify-end px-0 lg:px-0">
                <div className="flex items-center gap-2 pb-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary">
                                <IconLayoutColumns />
                                <span className="hidden lg:inline">Customize Columns</span>
                                <span className="lg:hidden">Columns</span>
                                <IconChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) =>
                                        typeof column.accessorFn !== "undefined" &&
                                        column.getCanHide()
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <AddModal preferences={preferences.preferences} />
                </div>
            </div>
            {/* Table body */}
            <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader className="sticky top-0 z-10 bg-muted">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="**:data-[slot=table-cell]:first:w-8">
                        {table.getRowModel().rows?.length ? (
                            <>
                                {
                                    table.getRowModel().rows.map((row) => (
                                        <NormalTableRow key={row.id} row={row} />
                                    ))
                                }
                            </>
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between px-0 pt-4">
                <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex w-full items-center gap-8 lg:w-fit">
                    <div className="hidden items-center gap-2 lg:flex">
                        <Label htmlFor="rows-per-page" className="text-sm font-medium">
                            Rows per page
                        </Label>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value))
                            }}
                        >
                            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                                <SelectValue
                                    placeholder={table.getState().pagination.pageSize}
                                />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 30, 40, 50, 100].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-fit items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="ml-auto flex items-center gap-2 lg:ml-0">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to first page</span>
                            <IconChevronsLeft />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <IconChevronLeft />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to next page</span>
                            <IconChevronRight />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden size-8 lg:flex"
                            size="icon"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to last page</span>
                            <IconChevronsRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--primary)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--primary)",
    },
} satisfies ChartConfig

function SheetOpen({ item }: { item: TravelsTable; }) {
    const isMobile = useIsMobile();
    const [open, setOpen] = React.useState(false);
    const preferences: UserData = usePreferences();
    const formId = React.useId();

    const initialState: State = { message: null, errors: {} };
    const [response, editAction, isPending] = React.useActionState(
        async (response: FormResponse | undefined, payload: FormData | null) => {
            if (payload === null) {
                return undefined;
            }

            return await editTravel(item.id, preferences.preferences, initialState, payload);
        },
        undefined,
    );

    const [, startTransition] = React.useTransition();
    const reset = () => {
        startTransition(() => {
            editAction(null);
        });
    };

    React.useEffect(() => {
        if (response) {
            setOpen(response.keepOpen);
        } if (response && response.status === 'success' && !response.keepOpen) {
            queueMicrotask(() => {
                toast.success(response.message || 'Tour date edited successfully.');
            });
        }
    }, [response]);

    return (
        <Sheet open={open} key={item.id} onOpenChange={() => {
            setOpen(!open);
            if (open) {
                reset();
            }
        }}>
            <SheetTrigger asChild>
                <Button variant="secondary">
                    <IconPencil />
                </Button>
            </SheetTrigger>
            <SheetContent side={isMobile ? "bottom" : "right"} className="size-full">
                <SheetHeader className="gap-1">
                    <SheetTitle>{item.destination}</SheetTitle>
                    <SheetDescription>
                        Edit the travel record details and submit to save the changes.
                    </SheetDescription>
                    <Separator />
                </SheetHeader>
                <div className="flex flex-col gap-4 overflow-y-auto px-6 text-sm">
                    {!isMobile && (
                        <>
                            <ChartContainer config={chartConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={chartData}
                                    margin={{
                                        left: 0,
                                        right: 10,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                        hide
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="dot" />}
                                    />
                                    <Area
                                        dataKey="mobile"
                                        type="natural"
                                        fill="var(--color-mobile)"
                                        fillOpacity={0.6}
                                        stroke="var(--color-mobile)"
                                        stackId="a"
                                    />
                                    <Area
                                        dataKey="desktop"
                                        type="natural"
                                        fill="var(--color-desktop)"
                                        fillOpacity={0.4}
                                        stroke="var(--color-desktop)"
                                        stackId="a"
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </>
                    )}
                    <form id={formId} action={editAction} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="date">Date {item.date?.toString()}</Label>
                            <Input id="date" name='date' aria-invalid={!!response?.errors?.date} defaultValue={response?.data?.date?.toString() || Temporal.PlainDate.from({ year:  item.date.getFullYear(), month: item.date.getMonth() + 1, day: item.date.getDate() }).toString()} type="date" disabled={isPending} />
                            <div id="date-error" aria-live="polite" aria-atomic="true">
                                {response?.errors?.date &&
                                    response.errors.date.map((error: string) => (
                                        <p className='text-destructive text-xs' key={error}>{error}</p>
                                    ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="destination">Destination</Label>
                                <Input id="destination" name='destination' aria-invalid={!!response?.errors?.destination} defaultValue={response?.data?.destination || item.destination} disabled={isPending} />
                                <div id="destination-error" aria-live="polite" aria-atomic="true">
                                    {response?.errors?.destination &&
                                        response.errors.destination.map((error: string) => (
                                            <p className='text-destructive text-xs' key={error}>{error}</p>
                                        ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="zip">ZIP</Label>
                                <Input id="zip" name='zip' aria-invalid={!!response?.errors?.zip} defaultValue={response?.data?.zip || item.zip} disabled={isPending} />
                                <div id="zip-error" aria-live="polite" aria-atomic="true">
                                    {response?.errors?.zip &&
                                        response.errors.zip.map((error: string) => (
                                            <p className='text-destructive text-xs' key={error}>{error}</p>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="startTime">Start Time</Label>
                                <Input id="startTime" name='startTime' aria-invalid={!!response?.errors?.startTime} defaultValue={response?.data?.startTime || item.start_time} type="time" disabled={isPending} />
                                <div id="startTime-error" aria-live="polite" aria-atomic="true">
                                    {response?.errors?.startTime &&
                                        response.errors.startTime.map((error: string) => (
                                            <p className='text-destructive text-xs' key={error}>{error}</p>
                                        ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="endTime">End Time</Label>
                                <Input id="endTime" name='endTime' aria-invalid={!!response?.errors?.endTime} defaultValue={response?.data?.endTime || item.end_time} type="time" disabled={isPending} />
                                <div id="endTime-error" aria-live="polite" aria-atomic="true">
                                    {response?.errors?.endTime &&
                                        response.errors.endTime.map((error: string) => (
                                            <p className='text-destructive text-xs' key={error}>{error}</p>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <SheetFooter>
                    <Button type="submit" form={formId} disabled={isPending}>
                        {isPending && <LoaderCircleIcon className='animate-spin' />}
                        Save
                    </Button>
                </SheetFooter>

            </SheetContent>
        </Sheet>
    );
}