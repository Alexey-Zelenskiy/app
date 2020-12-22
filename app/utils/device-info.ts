import {getUniqueId, getDeviceId} from 'react-native-device-info';

export function getAuthRequiredDeviceInfo() {
  return {
    device: `${getDeviceId()}`,
    deviceUid: getUniqueId(),
  };
}
