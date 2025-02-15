import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
} from "@mui/material"

import { type DeviceFormSchema, deviceSchema } from "../schemas/device"
import type { Device } from "../types/device"
import { Text } from "./formComponents/Text"
import { Select } from "./formComponents/Select"
import FormProvider from "../providers/FormProvider"
import { useUpdateDevice } from "../hooks/useDevices"

interface EditDeviceModalProps {
    open: boolean
    onClose: () => void
    device: Device
}

export default function EditModal({ open, onClose, device }: EditDeviceModalProps) {
    const { mutateAsync } = useUpdateDevice(["devices"])

    const onSubmitForm = async (data: DeviceFormSchema) => {
        await mutateAsync({
            deviceType: data.deviceType,
            hddCapacity: data.hddCapacity,
            systemName: data.systemName,
            id: device.id
        }, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Edit device</DialogTitle>
            <FormProvider
                onSubmit={onSubmitForm}
                formProps={{
                    resolver: zodResolver(deviceSchema),
                    defaultValues: {
                        systemName: device.systemName,
                        deviceType: device.deviceType,
                        hddCapacity: device.hddCapacity,
                    },
                }}
            >
                <DialogContent>
                    <Text
                        label="System Name"
                        fullWidth
                        margin="normal"
                        formProps={{
                            name: "systemName"
                        }}
                    />

                    <Select
                        label="Device Type"
                        fullWidth
                        formProps={{
                            name: "deviceType"
                        }}
                    >

                        <MenuItem value="Windows workstation">Windows workstation</MenuItem>
                        <MenuItem value="Mac workstation">Mac workstation</MenuItem>
                        <MenuItem value="Linux workstation">Linux workstation</MenuItem>
                    </Select>

                    <Text
                        label="HDD Capacity (GB)"
                        fullWidth
                        type="number"
                        margin="normal"
                        formProps={{
                            name: "hddCapacity"
                        }}
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </FormProvider>
        </Dialog>
    )
}

