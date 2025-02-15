import { Device } from "../constants/device";
import { convertSnakeToCamelCase } from "./convertSnakeToCamelCase";

const DOMAIN_URL = 'http://localhost:3000/devices'


const fetchDevices = async () => {
    const response = await fetch(DOMAIN_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return data.map(convertSnakeToCamelCase)
};


const createDevice = async (systemName: string, type: Device["type"], hddCapacity: string) => {
    const response = await fetch(DOMAIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            system_name: systemName,
            type,
            hdd_capacity: hddCapacity
        })
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return convertSnakeToCamelCase(data) as unknown as Device
};

const updateDevice = async (id: string, systemName: string, type: Device["type"], hddCapacity: string) => {
    const response = await fetch(`${DOMAIN_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            system_name: systemName,
            type,
            hdd_capacity: hddCapacity
        })
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return convertSnakeToCamelCase(data) as unknown as Device
};


const deleteDevice = async (id: string) => {
    const response = await fetch(`${DOMAIN_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}



export { createDevice, fetchDevices, updateDevice, deleteDevice };
