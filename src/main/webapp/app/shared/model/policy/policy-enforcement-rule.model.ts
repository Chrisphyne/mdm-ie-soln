import { IBlockAction } from 'app/shared/model/policy/block-action.model';
import { IWipeAction } from 'app/shared/model/policy/wipe-action.model';

export interface IPolicyEnforcementRule {
  blockAction?: IBlockAction;
  wipeAction?: IWipeAction;
  settingName?: string;
}
export const defaultValue: Readonly<IPolicyEnforcementRule> = {};
