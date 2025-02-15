import { Device, DeviceType } from "../types/device";


// const fetchDevices = async () => {
//     const response = await fetch('http://localhost:3000', {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     });
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json();
// };


let devices: Device[] = [
    { id: "4", systemName: "DESKTOP-0VCBIFF", deviceType: "Windows workstation", hddCapacity: 128 },
    { id: "3", systemName: "LINUX-SMITH-J", deviceType: "Linux workstation", hddCapacity: 64 },
    { id: "2", systemName: "WINXP-125498HQ", deviceType: "Windows workstation", hddCapacity: 64 },
    { id: "1", systemName: "MAC-SMITH-JOHN", deviceType: "Mac workstation", hddCapacity: 64 },
    { id: "0", systemName: "MAC-RODRIGUEZ-J", deviceType: "Mac workstation", hddCapacity: 32 },
];

let idCounter: number = 5;

const createDevice = async (systemName: string, deviceType: DeviceType, hddCapacity: number): Promise<Device> => {
    return new Promise((resolve) => {
        const newDevice: Device = { id: String(idCounter++), systemName, deviceType, hddCapacity };
        devices.unshift(newDevice);
        resolve(newDevice);
    });

    // const response = await fetch('/api/devices', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(newDevice),
    // });
};

const fetchDevices = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...devices]);
        }, 1000); // Simulando um loading fake de 1 segundo
    });
};

const updateDevice = async (id: string, systemName: string, deviceType: DeviceType, hddCapacity: number): Promise<Device> => {
    return new Promise((resolve, reject) => {
        const index = devices.findIndex(device => device.id === id);
        console.log({ index })
        if (index === -1) {
            return reject(new Error("Device not found"));
        }
        devices[index] = { id, systemName, deviceType, hddCapacity };
        console.log({ devices })
        resolve(devices[index]);
    });
};

const deleteDevice = async (id: string): Promise<{ message: string }> => {
    return new Promise((resolve, reject) => {
        const index = devices.findIndex(device => device.id === id);
        if (index === -1) {
            return reject(new Error("Device not found"));
        }
        devices.splice(index, 1);
        resolve({ message: "Device deleted successfully" });
    });
};

export { createDevice, fetchDevices, updateDevice, deleteDevice };
