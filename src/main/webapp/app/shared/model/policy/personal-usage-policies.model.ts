import { IPersonalApplicationPolicy } from 'app/shared/model/policy/personal-application-policy.model';

enum PlayStoreMode {
  'PLAY_STORE_MODE_UNSPECIFIED' = 'PLAY_STORE_MODE_UNSPECIFIED',
  'WHITELIST' = 'WHITELIST',
  'BLACKLIST' = 'BLACKLIST',
}

export interface IPersonalUsagePolicies {
  cameraDisabled?: boolean;
  screenCaptureDisabled?: boolean;
  accountTypesWithManagementDisabled?: string[];
  maxDaysWithWorkOff?: number;
  personalPlayStoreMode?: PlayStoreMode;
  personalApplications?: IPersonalApplicationPolicy[];
}
export const defaultValue: Readonly<IPersonalUsagePolicies> = {};
