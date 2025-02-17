import { fetchDevices, createDevice, updateDevice, deleteDevice } from '../fetchDevices';

global.fetch = jest.fn();

describe('fetchDevices', () => {
    it('should fetch devices and convert snake_case to camelCase', async () => {
        const mockDevices = [
            { system_name: 'Device1', type: 'WINDOWS', hdd_capacity: '500' },
            { system_name: 'Device2', type: 'MAC', hdd_capacity: '256' }
        ];
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockDevices
        });

        const result = await fetchDevices();

        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/devices', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const response = [
            { systemName: 'Device1', type: 'WINDOWS', hddCapacity: '500' },
            { systemName: 'Device2', type: 'MAC', hddCapacity: '256' }
        ]
        expect(result).toEqual(response);
    });

    it('should throw an error if network response is not ok', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

        await expect(fetchDevices()).rejects.toThrow('Network response was not ok');
    });
});

describe('createDevice', () => {
    it('should create a device and convert snake_case to camelCase', async () => {
        const mockDevice = { system_name: 'Device1', type: 'WINDOWS', hdd_capacity: '500' };
        const response = { systemName: 'Device1', type: 'WINDOWS', hddCapacity: '500' };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockDevice
        });

        const result = await createDevice('Device1', 'WINDOWS', '500');

        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/devices', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mockDevice)
        });
        expect(result).toEqual(response);
    });

    it('should throw an error if network response is not ok', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

        await expect(createDevice('Device1', 'WINDOWS', '500')).rejects.toThrow('Network response was not ok');
    });
});

describe('updateDevice', () => {
    it('should update a device and convert snake_case to camelCase', async () => {
        const mockDevice = { system_name: 'Device1', type: 'WINDOWS', hdd_capacity: '500' };
        const response = { systemName: 'Device1', type: 'WINDOWS', hddCapacity: '500' };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockDevice
        });

        const result = await updateDevice('1', 'Device1', 'WINDOWS', '500');

        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/devices/1', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mockDevice)
        });
        expect(result).toEqual(response);
    });

    it('should throw an error if network response is not ok', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

        await expect(updateDevice('1', 'Device1', 'WINDOWS', '500')).rejects.toThrow('Network response was not ok');
    });
});

describe('deleteDevice', () => {
    it('should delete a device', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

        await deleteDevice('1');

        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/devices/1', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
    });

    it('should throw an error if network response is not ok', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

        await expect(deleteDevice('1')).rejects.toThrow('Network response was not ok');
    });
});