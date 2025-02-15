import React, { useMemo } from "react";
import { Table as TableMui, TableBody, TableCell, TableHead, TableRow, IconButton, Box, Typography } from '@mui/material';
import { Computer, Apple, Terminal, Edit, Delete } from "@mui/icons-material"
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    createColumnHelper,
    flexRender,
    sortingFns,
    FilterFn
} from "@tanstack/react-table"
import { useSearchParams } from 'react-router';
import {
    RankingInfo,
    rankItem,
} from '@tanstack/match-sorter-utils'

import { Device } from "../types/device";
import { useDevices } from "../hooks/useDevices";
import Loader from './Loader';


const columnHelper = createColumnHelper<Device>()

const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
        case "Windows workstation":
            return <Computer />
        case "Mac workstation":
            return <Apple />
        case "Linux workstation":
            return <Terminal />
        default:
            return <Computer />
    }
}

interface TableProps {
    setDeleteDevice: (device: Device) => void;
    setEditDevice: (device: Device) => void;
}

const fallbackData = []


declare module '@tanstack/react-table' {
    //add fuzzy filter to the filterFns
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
        itemRank: RankingInfo
    }
}


const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    addMeta({
        itemRank,
    })

    return itemRank.passed
}

export default function Table({ setEditDevice, setDeleteDevice }: TableProps) {
    const [searchParams] = useSearchParams();
    const deviceType = searchParams.get("deviceType") as "windows" | "mac" | "linux" | 'all'
    const sortBy = searchParams.get("sortBy") as "desc" | "asc"


    const { data, isPending, isFetching, isLoading } = useDevices(["devices"])


    const columns = useMemo(
        () => [
            columnHelper.accessor("systemName", {
                header: "Device",
                enableHiding: false,
                cell: (info) => (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                            <Typography variant="body1">{getDeviceIcon(info.row.original.deviceType)}</Typography>
                            <Typography variant="body1">{info.getValue()}</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            {info.row.original.deviceType} - {info.row.original.hddCapacity} GB
                        </Typography>
                    </Box>
                ),
            }),
            columnHelper.accessor("hddCapacity", {
                id: "hddCapacity",
                enableHiding: true,
            }),
            columnHelper.accessor("deviceType", {
                id: "deviceType",
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
        [columnHelper, getDeviceIcon],
    )

    const sorting = useMemo(() => {
        if (!sortBy) return [];
        return [{ id: "hddCapacity", desc: sortBy === "desc" }];
    }, [sortBy]);

    const columnFilters = useMemo(() => {
        if (!deviceType || deviceType === "all") return [];
        return [{ id: "deviceType", value: deviceType }];
    }, [deviceType]);

    const table = useReactTable({
        data: data as Device[] || fallbackData,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            globalFilter: searchParams.get("search"),
            sorting,
            columnFilters
        },
        globalFilterFn: "includesString",
        onSortingChange: (data) => { console.log({ data }) },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })


    if (isPending || isFetching || isLoading) {
        return <Loader />
    }

    return (
        <TableMui>

            <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (

                                <>
                                    {!header.column.getCanHide() && (
                                        <TableCell key={header.id}>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </Box>
                                        </TableCell>
                                    )}
                                </>
                            )
                        })}
                    </TableRow>
                ))}
            </TableHead>

            <TableBody>
                {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getAllCells().map((cell) => {
                            return (
                                <>
                                    {!cell.column.getCanHide() && <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>}
                                </>
                            )
                        })}
                    </TableRow>
                ))}
            </TableBody>

        </TableMui>

    )
}