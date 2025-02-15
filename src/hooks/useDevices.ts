import { useQuery, QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchDevices, createDevice, updateDevice, deleteDevice } from "../utils/fetchDevices";
import { Device } from "../types/device";

export const useDevices = (queryKey: QueryKey) => {
    return useQuery({
        queryKey,
        queryFn: fetchDevices,
        refetchOnMount: false,
        retryOnMount: false
    });
};


export const useCreateDevice = (queryKey: QueryKey) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Omit<Device, "id">) => createDevice(data.systemName, data.deviceType, data.hddCapacity),
        onSuccess: (createdDevice) => {
            queryClient.setQueryData<Device[]>(queryKey, (oldData = []) => [createdDevice, ...oldData]);
        },
    });
};



export const useUpdateDevice = (queryKey: QueryKey) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updatedDevice: Device) => {
            return updateDevice(updatedDevice.id, updatedDevice.systemName, updatedDevice.deviceType, updatedDevice.hddCapacity);
        },
        onSuccess: (updateDevice) => {
            queryClient.setQueryData<Device[]>(queryKey, (oldData = []) => {
                return oldData.map(o => o.id === updateDevice.id ? updateDevice : o)
            });
        },
    });
};


export const useDeleteDevice = (queryKey: QueryKey) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            return deleteDevice(id);
        },
        onSuccess: (_, id) => {
            queryClient.setQueryData<Device[]>(queryKey, (oldData = []) => {
                return oldData.filter(o => o.id !== id)
            });
        },
    });
};

