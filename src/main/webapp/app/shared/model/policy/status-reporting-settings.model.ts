import { IApplicationReportingSettings } from 'app/shared/model/policy/application-reporting-settings.model';

export interface IStatusReportingSettings {
  applicationReportsEnabled?: boolean;
  deviceSettingsEnabled?: boolean;
  softwareInfoEnabled?: boolean;
  memoryInfoEnabled?: boolean;
  networkInfoEnabled?: boolean;
  displayInfoEnabled?: boolean;
  powerManagementEventsEnabled?: boolean;
  hardwareStatusEnabled?: boolean;
  systemPropertiesEnabled?: boolean;
  applicationReportingSettings?: IApplicationReportingSettings;
  commonCriteriaModeEnabled?: boolean;
}
export const defaultValue: Readonly<IStatusReportingSettings> = {};
