import React from "react";
import { Box, Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export default function Loader() {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Skeleton variant="rectangular" width="100%" height={10} />
                        </Box>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                                <Skeleton variant="rectangular" width={30} height={30} />
                                <Skeleton variant="rectangular" width={200} height={20} />
                            </Box>
                            <Skeleton variant="rectangular" width={280} height={10} />
                        </Box>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                                <Skeleton variant="rectangular" width={30} height={30} />
                                <Skeleton variant="rectangular" width={200} height={20} />
                            </Box>
                            <Skeleton variant="rectangular" width={280} height={10} />
                        </Box>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                                <Skeleton variant="rectangular" width={30} height={30} />
                                <Skeleton variant="rectangular" width={200} height={20} />
                            </Box>
                            <Skeleton variant="rectangular" width={280} height={10} />
                        </Box>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                                <Skeleton variant="rectangular" width={30} height={30} />
                                <Skeleton variant="rectangular" width={200} height={20} />
                            </Box>
                            <Skeleton variant="rectangular" width={280} height={10} />
                        </Box>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                                <Skeleton variant="rectangular" width={30} height={30} />
                                <Skeleton variant="rectangular" width={200} height={20} />
                            </Box>
                            <Skeleton variant="rectangular" width={280} height={10} />
                        </Box>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                                <Skeleton variant="rectangular" width={30} height={30} />
                                <Skeleton variant="rectangular" width={200} height={20} />
                            </Box>
                            <Skeleton variant="rectangular" width={280} height={10} />
                        </Box>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                                <Skeleton variant="rectangular" width={30} height={30} />
                                <Skeleton variant="rectangular" width={200} height={20} />
                            </Box>
                            <Skeleton variant="rectangular" width={280} height={10} />
                        </Box>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}