import React, { useState } from 'react';
import { TextField, Select, MenuItem, Button, IconButton, Box, Typography, InputLabel, type SelectChangeEvent, FormControl } from '@mui/material';
import { Search, Add } from "@mui/icons-material"
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from "react-router";

import AddModal from './components/AddModal';
import { Device, DeviceType, DEVICES_QUERY_KEY, DeviceTypeValuePlusAll } from './constants/device';
import EditModal from './components/EditModal';
import DeleteModal from './components/DeleteModal';
import Table from './components/Table';

import RefreshIcon from './assets/refresh.svg'


const DeviceList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient()
  const search = searchParams.get("search")
  const type = searchParams.get("type")
  const sortBy = searchParams.get("sortBy")

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editDevice, setEditDevice] = useState<Device | null>(null)
  const [deleteDevice, setDeleteDevice] = useState<Device | null>(null)
  

  const handleDeviceTypeChange = (event: SelectChangeEvent) => {
    setSearchParams(prevSearchParams => {
      prevSearchParams.set("type", event.target.value)
      return prevSearchParams;
    }, {
      preventScrollReset: true,
    });
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchParams(prevSearchParams => {
      prevSearchParams.set("search", event.target.value)
      return prevSearchParams;
    }, {
      preventScrollReset: true,
    });

  }

  const handleSortByChange = (event: SelectChangeEvent) => {
    setSearchParams(prevSearchParams => {
      prevSearchParams.set("sortBy", event.target.value)
      return prevSearchParams;
    }, {
      preventScrollReset: true,
    });
  }


  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" component="h1">
          Devices
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setIsAddModalOpen(true)}>
          Add device
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 3, justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 2, flexGrow: 1 }}>
          <TextField
            size="small"
            placeholder="Search"
            value={search || ''}
            onChange={handleSearch}
            slotProps={{
              input: {
                startAdornment: <Search sx={{ color: "action.active", mr: 1 }} />,
              }
            }}
            sx={{ flexGrow: 0.1 }}
          />


          <FormControl sx={{ flexGrow: 0.1 }}>
            <InputLabel>Device Type</InputLabel>
            <Select value={type || "ALL"} label="Device Type" onChange={handleDeviceTypeChange} sx={{ height: 40 }}>
              <MenuItem value={DeviceTypeValuePlusAll.ALL}>All</MenuItem>
              <MenuItem value={DeviceTypeValuePlusAll.WINDOWS}>{DeviceType.WINDOWS}</MenuItem>
              <MenuItem value={DeviceTypeValuePlusAll.MAC}>{DeviceType.MAC}</MenuItem>
              <MenuItem value={DeviceTypeValuePlusAll.LINUX}>{DeviceType.LINUX}</MenuItem>
            </Select>
          </FormControl>


          <FormControl sx={{ flexGrow: 0.1 }}>
            <InputLabel>Sort by</InputLabel>
            <Select value={sortBy || "desc"} label="Sort by" onChange={handleSortByChange} sx={{ height: 40 }}>
              <MenuItem value="desc">HDD Capacity (Descending)</MenuItem>
              <MenuItem value="asc">HDD Capacity (Ascending)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <IconButton onClick={async () => await queryClient.invalidateQueries({ queryKey: [DEVICES_QUERY_KEY] })}>
        <img src={RefreshIcon} aria-label='Refresh device list' />
        </IconButton>
      </Box>


      <Table setDeleteDevice={setDeleteDevice} setEditDevice={setEditDevice} />


      <AddModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {editDevice && (
        <EditModal
          open={!!editDevice}
          onClose={() => setEditDevice(null)}
          device={editDevice}
        />
      )}

      {deleteDevice && (
        <DeleteModal
          open={!!deleteDevice}
          onClose={() => setDeleteDevice(null)}
          device={deleteDevice}
        />
      )}
    </Box>
  );
};

export default DeviceList;