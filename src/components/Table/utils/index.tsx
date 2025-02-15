
import { DeviceType, DeviceTypeValue } from "../../../constants/device";
import LinuxIcon from '../../../assets/linux.svg'
import MacIcon from '../../../assets/mac.svg'
import WindowsIcon from '../../../assets/windows.svg'


export const getDeviceInfoFirstColumn = (type: keyof typeof DeviceTypeValue) => {
    return {
        [DeviceTypeValue.LINUX]: {
            icon: <img src={LinuxIcon} aria-hidden />,
            copy: DeviceType.LINUX
        },
        [DeviceTypeValue.MAC]: {
            icon: <img src={MacIcon} aria-hidden />,
            copy: DeviceType.MAC
        },
        [DeviceTypeValue.WINDOWS]: {
            icon: <img src={WindowsIcon} aria-hidden />,
            copy: DeviceType.WINDOWS
        },
    }[type]
}