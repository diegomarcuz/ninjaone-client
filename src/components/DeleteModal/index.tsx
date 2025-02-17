import React from "react"
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton, Box, Typography } from "@mui/material"

import { useDeleteDevice } from "../../hooks/useDeleteDevice"
import { Device, DEVICES_QUERY_KEY } from "../../constants/device"
import { Close } from "@mui/icons-material"

interface DeleteDeviceModalProps {
  open: boolean
  onClose: () => void
  device: Device
}

export default function DeleteModal({ open, onClose, device }: DeleteDeviceModalProps) {
  const { mutateAsync, error } = useDeleteDevice([DEVICES_QUERY_KEY])


  const handleConfirm = async () => {
    await mutateAsync(device.id, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DialogTitle variant="h5" fontWeight="500">Delete device?</DialogTitle>
        <IconButton onClick={onClose} sx={{
          marginInline: 2
        }}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        {!!error && (
          <Typography
            color="error"
            variant="h5"
            textAlign="center"
            sx={{
              marginY: 2
            }}
          >
            Please, try again later! There is an error!
          </Typography>
        )}
        <DialogContentText>
          You are about to delete the device {device.systemName}. This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{
        margin: 2
      }}>
        <Button
          sx={{
            textTransform: "none"
          }}
          variant="outlined"
          onClick={onClose}
          color="inherit"
        >
          Cancel
        </Button>
        <Button
          sx={{
            textTransform: "none"
          }}
          onClick={async () => await handleConfirm()}
          color="error"
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

