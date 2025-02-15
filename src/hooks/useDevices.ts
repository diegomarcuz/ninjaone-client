import { useQuery, QueryKey } from "@tanstack/react-query";

import { fetchDevices, } from "../utils/fetchDevices";

export const useDevices = (queryKey: QueryKey) => {
    return useQuery({
        queryKey,
        queryFn: fetchDevices,
        refetchOnMount: false,
        retryOnMount: false
    });
};


