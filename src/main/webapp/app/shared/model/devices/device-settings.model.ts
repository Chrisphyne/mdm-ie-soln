enum EncryptionStatus {
  'EncryptionStatusUnspecified' = 'ENCRYPTION_STATUS_UNSPECIFIED',
  'Unsupported' = 'UNSUPPORTED',
  'Inactive' = 'INACTIVE',
  'Activating' = 'ACTIVATING',
  'Active' = 'ACTIVE',
  'ActiveDefaultKey' = 'ACTIVE_DEFAULT_KEY',
  'ActivePerUser' = 'ACTIVE_PER_USER',
}

export interface IDeviceSettings {
  isDeviceSecure?: boolean;
  unknownSourcesEnabled?: boolean;
  developmentSettingsEnabled?: boolean;
  adbEnabled?: boolean;
  isEncrypted?: boolean;
  encryptionStatus?: EncryptionStatus;
  verifyAppsEnabled?: boolean;
}

export const defaultValue: Readonly<IDeviceSettings> = {};
