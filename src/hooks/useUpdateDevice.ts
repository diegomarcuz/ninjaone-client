import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { Device } from "../constants/device";
import { updateDevice } from "../utils/fetchDevices";

export const useUpdateDevice = (queryKey: QueryKey) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (updatedDevice: Device) => updateDevice(updatedDevice.id, updatedDevice.systemName, updatedDevice.type, updatedDevice.hddCapacity),
        onSuccess: (updateDevice) => {
            queryClient.setQueryData<Device[]>(queryKey, (previousDevices = []) => {
                return previousDevices.map(previousDevice => previousDevice.id === updateDevice.id ? updateDevice : previousDevice)
            });
        },
    });
};
