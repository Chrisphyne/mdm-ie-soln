enum NonComplianceReason {
  NonComplianceReasonUnspecified = 'NON_COMPLIANCE_REASON_UNSPECIFIED',
  ApiLevel = 'API_LEVEL',
  ManagementMode = 'MANAGEMENT_MODE',
  UserAction = 'USER_ACTION',
  InValidValue = 'INVALID_VALUE',
  AppNotInstalled = 'APP_NOT_INSTALLED',
  Unsupported = 'UNSUPPORTED',
  AppInstalled = 'APP_INSTALLED',
  Pending = 'PENDING',
  AppIncompatible = 'APP_INCOMPATIBLE',
  AppNotUpdated = 'APP_NOT_UPDATED',
}

enum InstallationFailure {
  InstallationFailureReasonUnspecified = 'INSTALLATION_FAILURE_REASON_UNSPECIFIED',
  InstallationFailureReasonUnknown = 'INSTALLATION_FAILURE_REASON_UNKNOWN',
  InProgress = 'IN_PROGRESS',
  NotFound = 'NOT_FOUND',
  NotCompatibleWithDevice = 'NOT_COMPATIBLE_WITH_DEVICE',
  NotApproved = 'NOT_APPROVED',
  PermissionsNotAccepted = 'PERMISSIONS_NOT_ACCEPTED',
  NotAvailableInCountry = 'NOT_AVAILABLE_IN_COUNTRY',
  NoLicensesRemaining = 'NO_LICENSES_REMAINING',
  NotEnrolled = 'NOT_ENROLLED',
  UserInvalid = 'USER_INVALID',
}

export interface INonComplianceDetail {
  settingName?: string;
  nonComplianceReason?: NonComplianceReason;
  packageName?: string;
  fieldPath?: string;
  currentValue?: JSON;
  installationFailureReason?: InstallationFailure;
}

export const defaultValue: Readonly<INonComplianceDetail> = {};
