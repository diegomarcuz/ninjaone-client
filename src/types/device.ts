export type DeviceType = "Windows workstation" | "Mac workstation" | "Linux workstation"

export interface Device {
    id: string
    systemName: string
    deviceType: DeviceType
    hddCapacity: number
}

export interface DeviceFormData {
    systemName: string
    deviceType: DeviceType
    hddCapacity: number
}

