
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Button,
} from "@mui/material"

import { type DeviceFormSchema, deviceSchema } from "../schemas/device"
import FormProvider from "../providers/FormProvider"
import { Text } from "./formComponents/Text"
import { Select } from "./formComponents/Select"
import React from "react"
import { useCreateDevice } from "../hooks/useDevices"

interface AddDeviceModalProps {
    open: boolean
    onClose: () => void

}

export default function AddDeviceModal({ open, onClose }: AddDeviceModalProps) {
    const { mutateAsync } = useCreateDevice(["devices"])


    const onSubmitForm = async (data: DeviceFormSchema) => {
        console.log({ data })

        await mutateAsync({
            deviceType: data.deviceType,
            hddCapacity: data.hddCapacity,
            systemName: data.systemName
        })
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Add device</DialogTitle>
            <FormProvider onSubmit={onSubmitForm} formProps={{
                resolver: zodResolver(deviceSchema),
            }}>
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
                        Submit
                    </Button>
                </DialogActions>

            </FormProvider>
        </Dialog>
    )
}

