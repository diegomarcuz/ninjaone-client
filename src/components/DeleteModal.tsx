import React from "react"
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"

import { useDeleteDevice } from "../hooks/useDevices"
import { Device } from "../types/device"

interface DeleteDeviceModalProps {
  open: boolean
  onClose: () => void
  device: Device
}

export default function DeleteModal({ open, onClose, device }: DeleteDeviceModalProps) {
  const { mutateAsync } = useDeleteDevice(["devices"])


  const handleConfirm = async () => {
    await mutateAsync(device.id, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Delete device?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are about to delete the device {device.systemName}. This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={async () => await handleConfirm()} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

