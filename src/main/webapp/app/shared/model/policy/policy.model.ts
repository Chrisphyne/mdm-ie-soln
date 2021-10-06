import { IApplicationPolicy } from 'app/shared/model/policy/application-policy.model';
import { IPersistentPreferredActivity } from 'app/shared/model/policy/persisted-preferred-activity.model';
import { ISystemUpdate } from 'app/shared/model/policy/system-update.model';
import { IStatusReportingSettings } from 'app/shared/model/policy/status-reporting-settings.model';
import { IUserFacingMessage } from 'app/shared/model/devices/user-facing-message.model';
import { IPasswordRequirements } from 'app/shared/model/policy/password-requirements.model';
import { IPackageNameList } from 'app/shared/model/policy/packaged-name-list.model';
import { IProxyInfo } from 'app/shared/model/policy/proxy-info.model';
import { IChoosePrivateKeyRule } from 'app/shared/model/policy/c hoose-private-key-rule.model';
import { IAlwaysOnVpnPackage } from 'app/shared/model/policy/always-on-vps-package.model';
import { IPermissionGrant } from 'app/shared/model/policy/permission-grant.model';
import { ISetupAction } from 'app/shared/model/policy/setup-action.model';
import { IPolicyEnforcementRule } from 'app/shared/model/policy/policy-enforcement-rule.model';
import { IKioskCustomization } from 'app/shared/model/policy/kiosk-customization.model';
import { IAdvancedSecurityOverrides } from 'app/shared/model/policy/advanced-security-overrides.model';
import { IPersonalUsagePolicies } from 'app/shared/model/policy/personal-usage-policies.model';

enum KeyguardDisabledFeature {
  'KeyGuardDisabled' = 'KEYGUARD_DISABLED_FEATURE_UNSPECIFIED',
  'Camera' = 'CAMERA',
  'Notification' = 'NOTIFICATIONS',
  'UnredactedNotifications' = 'UNREDACTED_NOTIFICATIONS',
  'TrustAgents' = 'TRUST_AGENTS',
  'DisableFingerprint' = 'DISABLE_FINGERPRINT',
  'DisableRemoteInput' = 'DISABLE_REMOTE_INPUT',
  'Face' = 'FACE',
  'Iris' = 'IRIS',
  'Biometrics' = 'BIOMETRICS',
  'AllFeatures' = 'ALL_FEATURES',
}

enum PermissionPolicy {
  'PermissionPolicyUnspecified' = 'PERMISSION_POLICY_UNSPECIFIED',
  'Prompt' = 'PROMPT',
  'Grant' = 'GRANT',
  'Deny' = 'DENY',
}

enum BatteryPluggedMode {
  'BATTERY_PLUGGED_MODE_UNSPECIFIED' = 'BATTERY_PLUGGED_MODE_UNSPECIFIED',
  'AC' = 'AC',
  'USB' = 'USB',
  'WIRELESS' = 'WIRELESS',
}

enum LocationMode {
  'LOCATION_MODE_UNSPECIFIED' = 'LOCATION_MODE_UNSPECIFIED',
  'HIGH_ACCURACY' = 'HIGH_ACCURACY',
  'SENSORS_ONLY' = 'SENSORS_ONLY',
  'BATTERY_SAVING' = 'BATTERY_SAVING',
  'OFF' = 'OFF',
  'LOCATION_USER_CHOICE' = 'LOCATION_USER_CHOICE',
  'LOCATION_ENFORCED' = 'LOCATION_ENFORCED',
  'LOCATION_DISABLED' = 'LOCATION_DISABLED',
}

enum AppAutoUpdatePolicy {
  'APP_AUTO_UPDATE_POLICY_UNSPECIFIED' = 'APP_AUTO_UPDATE_POLICY_UNSPECIFIED',
  'CHOICE_TO_THE_USER' = 'CHOICE_TO_THE_USER',
  'NEVER' = 'NEVER',
  'WIFI_ONLY' = 'WIFI_ONLY',
  'ALWAYS' = 'ALWAYS',
}

enum EncryptionPolicy {
  'ENCRYPTION_POLICY_UNSPECIFIED' = 'ENCRYPTION_POLICY_UNSPECIFIED',
  'ENABLED_WITHOUT_PASSWORD' = 'ENABLED_WITHOUT_PASSWORD',
  'ENABLED_WITH_PASSWORD' = 'ENABLED_WITH_PASSWORD',
}

enum PlayStoreMode {
  'PLAY_STORE_MODE_UNSPECIFIED' = 'PLAY_STORE_MODE_UNSPECIFIED',
  'WHITELIST' = 'WHITELIST',
  'BLACKLIST' = 'BLACKLIST',
}

enum AutoDateAndTimeZone {
  'AUTO_DATE_AND_TIME_ZONE_UNSPECIFIED' = 'AUTO_DATE_AND_TIME_ZONE_UNSPECIFIED',
  'AUTO_DATE_AND_TIME_ZONE_USER_CHOICE' = 'AUTO_DATE_AND_TIME_ZONE_USER_CHOICE',
  'AUTO_DATE_AND_TIME_ZONE_ENFORCED' = 'AUTO_DATE_AND_TIME_ZONE_ENFORCED',
}

export interface IPolicy {
  userLogin?: string;
  name?: string;
  version?: string;
  applications?: IApplicationPolicy[];
  maximumTimeToLock?: string;
  screenCaptureDisabled?: boolean;
  cameraDisabled?: boolean;
  keyguardDisabledFeatures?: KeyguardDisabledFeature[];
  defaultPermissionPolicy?: PermissionPolicy;
  persistentPreferredActivities?: IPersistentPreferredActivity[];
  openNetworkConfiguration?: JSON;
  systemUpdate?: ISystemUpdate;
  accountTypesWithManagementDisabled?: string[];
  addUserDisabled?: boolean;
  adjustVolumeDisabled?: boolean;
  factoryResetDisabled?: boolean;
  installAppsDisabled?: boolean;
  mountPhysicalMediaDisabled?: boolean;
  modifyAccountsDisabled?: boolean;
  safeBootDisabled?: boolean;
  uninstallAppsDisabled?: boolean;
  statusBarDisabled?: boolean;
  keyguardDisabled?: boolean;
  minimumApiLevel?: number;
  statusReportingSettings?: IStatusReportingSettings;
  bluetoothContactSharingDisabled?: boolean;
  shortSupportMessage?: IUserFacingMessage;
  longSupportMessage?: IUserFacingMessage;
  passwordRequirements?: IPasswordRequirements;
  wifiConfigsLockdownEnabled?: boolean;
  bluetoothConfigDisabled?: boolean;
  cellBroadcastsConfigDisabled?: boolean;
  credentialsConfigDisabled?: boolean;
  mobileNetworksConfigDisabled?: boolean;
  tetheringConfigDisabled?: boolean;
  vpnConfigDisabled?: boolean;
  wifiConfigDisabled?: boolean;
  createWindowsDisabled?: boolean;
  networkResetDisabled?: boolean;
  outgoingBeamDisabled?: boolean;
  outgoingCallsDisabled?: boolean;
  removeUserDisabled?: boolean;
  shareLocationDisabled?: boolean;
  smsDisabled?: boolean;
  unmuteMicrophoneDisabled?: boolean;
  usbFileTransferDisabled?: boolean;
  ensureVerifyAppsEnabled?: boolean;
  permittedInputMethods?: IPackageNameList;
  stayOnPluggedModes?: BatteryPluggedMode[];
  recommendedGlobalProxy?: IProxyInfo;
  setUserIconDisabled?: boolean;
  setWallpaperDisabled?: boolean;
  choosePrivateKeyRules?: IChoosePrivateKeyRule[];
  alwaysOnVpnPackage?: IAlwaysOnVpnPackage;
  frpAdminEmails?: string[];
  deviceOwnerLockScreenInfo?: IUserFacingMessage;
  dataRoamingDisabled?: boolean;
  locationMode?: LocationMode;
  networkEscapeHatchEnabled?: boolean;
  bluetoothDisabled?: boolean;
  blockApplicationsEnabled?: boolean;
  installUnknownSourcesAllowed?: boolean;
  debuggingFeaturesAllowed?: boolean;
  funDisabled?: boolean;
  autoTimeRequired?: boolean;
  permittedAccessibilityServices?: IPackageNameList;
  appAutoUpdatePolicy?: AppAutoUpdatePolicy;
  kioskCustomLauncherEnabled?: boolean;
  skipFirstUseHintsEnabled?: boolean;
  privateKeySelectionEnabled?: boolean;
  encryptionPolicy?: EncryptionPolicy;
  usbMassStorageEnabled?: boolean;
  permissionGrants?: IPermissionGrant[];
  playStoreMode?: PlayStoreMode;
  setupActions?: ISetupAction[];
  passwordPolicies?: IPasswordRequirements[];
  policyEnforcementRules?: IPolicyEnforcementRule[];
  kioskCustomization?: IKioskCustomization;
  advancedSecurityOverrides?: IAdvancedSecurityOverrides;
  personalUsagePolicies?: IPersonalUsagePolicies;
  autoDateAndTimeZone?: AutoDateAndTimeZone;
}
export const defaultValue: Readonly<IPolicy> = {};
