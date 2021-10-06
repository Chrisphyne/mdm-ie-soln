import { IPermissionGrant } from 'app/shared/model/policy/permission-grant.model';
import { IManagedConfigurationTemplate } from 'app/shared/model/policy/managed-configuration-template.model';

enum InstallType {
  'InstallTypeUnspecified' = 'INSTALL_TYPE_UNSPECIFIED',
  'Preinstalled' = 'PREINSTALLED',
  'ForceInstalled' = 'FORCE_INSTALLED',
  'Blocked' = 'BLOCKED',
  'Available' = 'AVAILABLE',
  'RequiredForSetup' = 'REQUIRED_FOR_SETUP',
  'Kiosk' = 'KIOSK',
}

enum PermissionPolicy {
  'PermissionPolicyUnspecified' = 'PERMISSION_POLICY_UNSPECIFIED',
  'Prompt' = 'PROMPT',
  'Grant' = 'GRANT',
  'Deny' = 'DENY',
}

enum DelegatedScope {
  'DelegatedScopeUnspecified' = 'DELEGATED_SCOPE_UNSPECIFIED',
  'CertInstall' = 'CERT_INSTALL',
  'ManagedConfigurations' = 'MANAGED_CONFIGURATIONS',
  'BlockUninstall' = 'BLOCK_UNINSTALL',
  'PermissionGrant' = 'PERMISSION_GRANT',
  'PackageAccess' = 'PACKAGE_ACCESS',
  'EnableSystemApp' = 'ENABLE_SYSTEM_APP',
}

enum ConnectedWorkAndPersonalApp {
  'ConnectedWorkAndPersonalAppUnspecified' = 'CONNECTED_WORK_AND_PERSONAL_APP_UNSPECIFIED',
  'ConnectedWorkAndPersonalAppDisallowed' = 'CONNECTED_WORK_AND_PERSONAL_APP_DISALLOWED',
  'ConnectedWorkAndPersonalAppAllowed' = 'CONNECTED_WORK_AND_PERSONAL_APP_ALLOWED',
}

enum AutoUpdateMode {
  'AutoUpdateModeUnspecified' = 'AUTO_UPDATE_MODE_UNSPECIFIED',
  'AutoUpdateDefault' = 'AUTO_UPDATE_MODE_UNSPECIFIED',
  'AutoUpdatePostponed' = 'AUTO_UPDATE_POSTPONED',
  'AutoUpdateHighPriority' = 'AUTO_UPDATE_HIGH_PRIORITY',
}

export interface IApplicationPolicy {
  packageName?: string;
  installType?: InstallType;
  lockTaskAllowed?: boolean;
  defaultPermissionPolicy?: PermissionPolicy;
  permissionGrants?: IPermissionGrant[];
  managedConfiguration?: JSON;
  disabled?: boolean;
  minimumVersionCode?: number;
  delegatedScopes?: DelegatedScope[];
  managedConfigurationTemplate?: IManagedConfigurationTemplate;
  accessibleTrackIds?: string[];
  connectedWorkAndPersonalApp?: ConnectedWorkAndPersonalApp;
  autoUpdateMode?: AutoUpdateMode;
}
export const defaultValue: Readonly<IApplicationPolicy> = {};
