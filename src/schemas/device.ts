import { DeviceTypeValue } from "../constants/device"
import { z } from "zod"

export const deviceSchema = z.object({
  systemName: z.string().min(1, "System name is required").max(100, "System name must be less than 100 characters"),
  type: z.nativeEnum(DeviceTypeValue, {
    errorMap: () => ({ message: "Please select a device type" }),
  }),
  hddCapacity: z
    .string()
    .min(1, "HDD capacity must be greater than 0")
    .max(10000, "HDD capacity must be less than 10000 GB")
})

export type DeviceFormSchema = z.infer<typeof deviceSchema>

