import { IFreezePeriod } from 'app/shared/model/policy/freeze-period.model';

enum SystemUpdateType {
  'SystemUpdateTypeUnspecified' = 'SYSTEM_UPDATE_TYPE_UNSPECIFIED',
  'Automatic' = 'AUTOMATIC',
  'Windowed' = 'WINDOWED',
  'Postpone' = 'POSTPONE',
}

export interface ISystemUpdate {
  type?: SystemUpdateType;
  startMinutes?: number;
  endMinutes?: number;
  freezePeriods?: IFreezePeriod[];
}
export const defaultValue: Readonly<ISystemUpdate> = {};
