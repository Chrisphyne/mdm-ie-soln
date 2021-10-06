export interface IWipeAction {
  wipeAfterDays?: number;
  preserveFrp?: boolean;
}
export const defaultValue: Readonly<IWipeAction> = {};
