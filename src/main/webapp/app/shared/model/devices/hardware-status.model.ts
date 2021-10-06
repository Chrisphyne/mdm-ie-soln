export interface IHardwareStatus {
  createTime?: string;
  batteryTemperatures?: number[];
  cpuTemperatures?: number[];
  gpuTemperatures?: number[];
  skinTemperatures?: number[];
  fanSpeeds?: number[];
  cpuUsages?: number[];
}

export const defaultValue: Readonly<IHardwareStatus> = {};
