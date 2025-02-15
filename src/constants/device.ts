
export enum DeviceType {
    MAC = "Mac workstation",
    WINDOWS = "Windows workstation",
    LINUX = 'Linux workstation'
}

export enum DeviceTypeValue {
    MAC = "MAC",
    WINDOWS = "WINDOWS",
    LINUX = "LINUX",
}

export enum DeviceTypeValuePlusAll {
    MAC = "MAC",
    WINDOWS = "WINDOWS",
    LINUX = "LINUX",
    ALL = "ALL"
}

export interface Device {
    id: string
    systemName: string
    type: `${DeviceTypeValue}`
    hddCapacity: string
}

export interface DeviceApi {
    id: string
    system_name: string
    type: `${DeviceTypeValue}`
    hdd_capacity: string
}


export const DEVICES_QUERY_KEY = "devices"


