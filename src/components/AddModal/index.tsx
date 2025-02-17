
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Button,
    Typography,
    IconButton,
    Box,
} from "@mui/material"

import { type DeviceFormSchema, deviceSchema } from "../../schemas/device"
import FormProvider from "../../providers/FormProvider"
import { Text } from "../formComponents/Text"
import { Select } from "../formComponents/Select"
import { useCreateDevice } from "../../hooks/useCreateDevice"
import { DEVICES_QUERY_KEY, DeviceType, DeviceTypeValue } from "../../constants/device"
import { Close } from "@mui/icons-material"

interface AddModalProps {
    open: boolean
    onClose: () => void
}

export default function AddModal({ open, onClose }: AddModalProps) {
    const { mutateAsync, error } = useCreateDevice([DEVICES_QUERY_KEY])


    const onSubmitForm = async (data: DeviceFormSchema) => {
        await mutateAsync({
            type: data.type,
            hddCapacity: data.hddCapacity,
            systemName: data.systemName
        }, {
            onSuccess: () => {
                onClose()
            }
        })
    }


    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <DialogTitle variant="h5" fontWeight="500">Add device</DialogTitle>
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

