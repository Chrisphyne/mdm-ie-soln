enum UpdateStatus {
  'UpdateStatusUnknown' = 'UPDATE_STATUS_UNKNOWN',
  'UpToDate' = 'UP_TO_DATE',
  'UnknownUpdateAvailable' = 'UNKNOWN_UPDATE_AVAILABLE',
  'SecurityUpdateAvailable' = 'SECURITY_UPDATE_AVAILABLE',
  'OsUpdateAvailable' = 'OS_UPDATE_AVAILABLE',
}

interface SystemUpdateInfo {
  updateStatus?: UpdateStatus;
  updateReceivedTime?: string;
}

export interface ISoftwareInfo {
  androidVersion?: string;
  androidDevicePolicyVersionCode?: number;
  androidDevicePolicyVersionName?: string;
  androidBuildNumber?: string;
  deviceKernelVersion?: string;
  bootloaderVersion?: string;
  androidBuildTime?: string;
  securityPatchLevel?: string;
  primaryLanguageCode?: string;
  deviceBuildSignature?: string;
  systemUpdateInfo?: SystemUpdateInfo;
}

export const defaultValue: Readonly<ISoftwareInfo> = {};
