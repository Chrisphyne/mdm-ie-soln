/*
Possible security posture values of a device under management.
*/
import { IUserFacingMessage } from 'app/shared/model/devices/user-facing-message.model';

enum DevicePosture {
  'PostureUnspecified' = 'POSTURE_UNSPECIFIED',
  'Secure' = 'SECURE',
  'AtRisk' = 'AT_RISK',
  'PotentiallyCompromised' = 'POTENTIALLY_COMPROMISED',
}

enum SecurityRisk {
  'SecurityRiskUnspecified' = 'SECURITY_RISK_UNSPECIFIED',
  'UnknownOS' = 'UNKNOWN_OS',
  'CompromisedOS' = 'COMPROMISED_OS',
}

interface PostureDetails {
  securityRisk?: SecurityRisk;
  advice?: IUserFacingMessage[];
}

export interface ISecurityPosture {
  devicePosture?: DevicePosture;
  postureDetails?: PostureDetails[];
}

export const defaultValue: Readonly<ISecurityPosture> = {};
