import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
    IconButton,
    Box,
    Typography,
} from "@mui/material"

import { type DeviceFormSchema, deviceSchema } from "../../schemas/device"
import { DEVICES_QUERY_KEY, DeviceType, DeviceTypeValue, type Device } from "../../constants/device"
import { Text } from "../formComponents/Text"
import { Select } from "../formComponents/Select"
import FormProvider from "../../providers/FormProvider"
import { useUpdateDevice } from "../../hooks/useUpdateDevice"
import { Close } from "@mui/icons-material"

interface EditDeviceModalProps {
    open: boolean
    onClose: () => void
    device: Device
}

export default function EditModal({ open, onClose, device }: EditDeviceModalProps) {
    const { mutateAsync, error } = useUpdateDevice([DEVICES_QUERY_KEY])

    const onSubmitForm = async (data: DeviceFormSchema) => {
        await mutateAsync({
            type: data.type,
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
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <DialogTitle variant="h5" fontWeight="500">Edit device</DialogTitle>
                <IconButton onClick={onClose} sx={{
                    marginInline: 2
                }}>
                    <Close />
                </IconButton>
            </Box>
            <FormProvider
                onSubmit={onSubmitForm}
                formProps={{
                    resolver: zodResolver(deviceSchema),
                    defaultValues: {
                        systemName: device.systemName,
                        type: device.type,
                        hddCapacity: device.hddCapacity,
                    },
                }}
            >
                <DialogContent
                    sx={{
                        "> div": {
                            marginBottom: "12px"
                        },
                        paddingY: 1
                    }}
                >
                    {!!error && <Typography color="error" variant="h5" textAlign="center">Please, try again later! There is an error!</Typography>}
                    <Typography>
                        System Name *
                    </Typography>
                    <Text
                        fullWidth
                        margin="dense"
                        formProps={{
                            name: "systemName"
                        }}
                    />

                    <Typography>
                        Device type *
                    </Typography>


                    <Select
                        fullWidth
                        formProps={{
                            name: "type"
                        }}
                        margin="dense"
                    >
                        <MenuItem value={DeviceTypeValue.WINDOWS}>{DeviceType.WINDOWS}</MenuItem>
                        <MenuItem value={DeviceTypeValue.MAC}>{DeviceType.MAC}</MenuItem>
                        <MenuItem value={DeviceTypeValue.LINUX}>{DeviceType.LINUX}</MenuItem>
                    </Select>



                    <Typography>
                        HDD capacity (GB) *
                    </Typography>
                    <Text
                        label=""
                        fullWidth
                        type="number"
                        margin="dense"
                        formProps={{
                            name: "hddCapacity"
                        }}
                    />
                </DialogContent>
                <DialogActions
                    sx={{
                        margin: 2,
                    }}
                >
                    <Button
                        sx={{
                            textTransform: "none"
                        }}
                        variant="outlined"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{
                            textTransform: "none"
                        }}
                        type="submit"
                        variant="contained"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </FormProvider>
        </Dialog>
    )
}

