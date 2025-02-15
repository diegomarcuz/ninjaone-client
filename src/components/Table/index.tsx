import { useMemo } from "react";
import { Table as TableMui, TableBody, TableCell, TableHead, TableRow, IconButton, Box, Typography } from '@mui/material';
import { Edit, Delete } from "@mui/icons-material"

import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    createColumnHelper,
    flexRender,
} from "@tanstack/react-table"
import { useSearchParams } from 'react-router';

import { Device, DEVICES_QUERY_KEY, DeviceTypeValuePlusAll } from "../../constants/device";
import { useDevices } from "../../hooks/useDevices";
import Loader from '../Loader';
import { getDeviceInfoFirstColumn } from "./utils";

const columnHelper = createColumnHelper<Device>()

interface TableProps {
    setDeleteDevice: (device: Device) => void;
    setEditDevice: (device: Device) => void;
}

const fallbackData: never[] = []

export default function Table({ setEditDevice, setDeleteDevice }: TableProps) {
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type") as `${DeviceTypeValuePlusAll}`
    const sortBy = searchParams.get("sortBy") as "desc" | "asc"


    const { data, error, isPending, isFetching, isLoading } = useDevices([DEVICES_QUERY_KEY])

    const columns = useMemo(
        () => [
            columnHelper.accessor("systemName", {
                header: "Device",
                enableHiding: false,
                cell: (info) => {
                    const { icon, copy } = getDeviceInfoFirstColumn(info.row.original.type)
                    return (
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                                {icon}
                                <Typography variant="body1">{info.getValue()}</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {copy} - {info.row.original.hddCapacity} GB
                            </Typography>
                        </Box>
                    )
                }
            }),
            columnHelper.accessor("hddCapacity", {
                id: "hddCapacity",
                enableHiding: true,
            }),
            columnHelper.accessor("type", {
                id: "type",
                enableHiding: true,
                filterFn: "includesString"
            }),
            columnHelper.display({
                id: "actions",
                enableHiding: false,
                cell: (info) => (
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton size="small" onClick={() => setEditDevice(info.row.original)}>
                            <Edit />
                        </IconButton>
                        <IconButton size="small" onClick={() => setDeleteDevice(info.row.original)}>
                            <Delete color='error' />
                        </IconButton>
                    </Box>
                ),
            }),
        ],
        [setDeleteDevice, setEditDevice],
    )

    const sorting = useMemo(() => {
        return [{ id: "hddCapacity", desc: !sortBy ? true : sortBy === "desc" }];
    }, [sortBy]);

    const columnFilters = useMemo(() => {
        if (!type || type === "ALL") return [];
        return [{ id: "type", value: type }];
    }, [type]);

    const table = useReactTable({
        data: data as Device[] || fallbackData,
        columns,
        state: {
            globalFilter: searchParams.get("search"),
            sorting,
            columnFilters
        },
        globalFilterFn: "includesString",
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })


    if (isPending || isFetching || isLoading) {
        return <Loader />
    }

    if(error) {
        return <Typography color="error" variant="h5" textAlign="center">Please, try again later! There is an error!</Typography>
    }

    return (
        <TableMui>

            <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => !header.column.getCanHide() && (
                            <TableCell key={header.id}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </Box>
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableHead>

            <TableBody>
                {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getAllCells().map((cell) => !cell.column.getCanHide() &&
                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>

        </TableMui>

    )
}