import { IDate } from 'app/shared/model/policy/date.model';

export interface IFreezePeriod {
  startDate?: IDate;
  endDate?: IDate;
}
export const defaultValue: Readonly<IFreezePeriod> = {};
