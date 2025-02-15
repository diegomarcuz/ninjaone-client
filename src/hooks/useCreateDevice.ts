import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { Device } from "../constants/device";
import { createDevice } from "../utils/fetchDevices";

export const useCreateDevice = (queryKey: QueryKey) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Omit<Device, "id">) => createDevice(data.systemName, data.type, data.hddCapacity),
        onSuccess: (createdDevice) => {
            queryClient.setQueryData<Device[]>(queryKey, (oldData = []) => [createdDevice, ...oldData]);
        },
    });
};
