import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { Device } from "../constants/device";
import { deleteDevice } from "../utils/fetchDevices";

export const useDeleteDevice = (queryKey: QueryKey) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteDevice(id),
        onSuccess: (_, id) => {
            queryClient.setQueryData<Device[]>(queryKey, (previousDevices = []) => previousDevices.filter(previousDevice => previousDevice.id !== id));
        },
    });
};