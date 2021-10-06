export interface IHardwareInfo {
  brand?: string;
  hardware?: string;
  deviceBasebandVersion?: string;
  manufacturer?: string;
  serialNumber?: string;
  model?: string;
  batteryShutdownTemperatures?: number[];
  batteryThrottlingTemperatures?: number[];
  cpuShutdownTemperatures?: number[];
  cpuThrottlingTemperatures?: number[];
  gpuShutdownTemperatures?: number[];
  gpuThrottlingTemperatures?: number[];
  skinShutdownTemperatures?: number[];
  skinThrottlingTemperatures?: number[];
}

export const defaultValue: Readonly<IHardwareInfo> = {};
