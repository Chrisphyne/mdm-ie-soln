import { INonComplianceDetail } from 'app/shared/model/devices/noncomplicancedetail.model';
import { IUserFacingMessage } from 'app/shared/model/devices/user-facing-message.model';
import { ISoftwareInfo } from 'app/shared/model/devices/software-info.model';
import { IHardwareInfo } from 'app/shared/model/devices/hardware-info.model';
import { IDisplay } from 'app/shared/model/devices/display.model';
import { IApplicationReport } from 'app/shared/model/devices/application-report.model';
import { INetworkInfo } from 'app/shared/model/devices/network-info.model';
import { IMemoryInfo } from 'app/shared/model/devices/memory-info.model';
import { IMemoryEvent } from 'app/shared/model/devices/memory-event.model';
import { IPowerManagementEvent } from 'app/shared/model/devices/power-management-event.model';
import { IHardwareStatus } from 'app/shared/model/devices/hardware-status.model';
import { IDeviceSettings } from 'app/shared/model/devices/device-settings.model';
import { IDeviceUser } from 'app/shared/model/devices/device-user.model';
import { ISecurityPosture } from 'app/shared/model/devices/security-posture.model';
import Map from 'immutable';
enum ManagementMode {
  ManagementModeUnspecified = 'MANAGEMENT_MODE_UNSPECIFIED',
  DeviceOwner = 'DEVICE_OWNER',
  ProfileOwner = 'PROFILE_OWNER',
}

enum DeviceState {
  DeviceStateUnspecified = 'DEVICE_STATE_UNSPECIFIED',
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
  Deleted = 'DELETED',
  Provisioning = 'PROVISIONING',
}

enum Ownership {
  'OwnershipUnspecified' = 'OWNERSHIP_UNSPECIFIED',
  'CompanyOwned' = 'COMPANY_OWNED',
  'PersonallyOwned' = 'PERSONALLY_OWNED',
}

export interface IDevice {
  userLogin?: string;
  name?: string;
  userName?: string;
  managementMode?: ManagementMode;
  state?: DeviceState;
  appliedState?: DeviceState;
  policyCompliant?: boolean;
  nonComplianceDetails?: INonComplianceDetail[];
  enrollmentTime?: string;
  lastStatusReportTime?: string;
  lastPolicyComplianceReportTime?: string;
  lastPolicySyncTime?: string;
  policyName?: string;
  appliedPolicyName?: string;
  appliedPolicyVersion?: string;
  apiLevel?: string;
  enrollmentTokenData?: string;
  enrollmentTokenName?: string;
  disabledReason?: IUserFacingMessage;
  softwareInfo?: ISoftwareInfo;
  hardwareInfo?: IHardwareInfo;
  displays?: IDisplay[];
  applicationReports?: IApplicationReport[];
  previousDeviceNames?: string[];
  networkInfo?: INetworkInfo;
  memoryInfo?: IMemoryInfo;
  memoryEvents?: IMemoryEvent[];
  powerManagementEvents?: IPowerManagementEvent[];
  hardwareStatusSamples?: IHardwareStatus[];
  deviceSettings?: IDeviceSettings;
  user?: IDeviceUser;
  systemProperties?: Map<string, string>;
  securityPosture?: ISecurityPosture;
  ownership?: Ownership;
}

export const defaultValue: Readonly<IDevice> = {};
