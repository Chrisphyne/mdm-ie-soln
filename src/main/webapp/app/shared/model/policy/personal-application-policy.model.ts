enum InstallType {
  'InstallTypeUnspecified' = 'INSTALL_TYPE_UNSPECIFIED',
  'Blocked' = 'BLOCKED',
  'Available' = 'AVAILABLE',
}

export interface IPersonalApplicationPolicy {
  packageName?: string;
  installType?: InstallType;
}
export const defaultValue: Readonly<IPersonalApplicationPolicy> = {};
