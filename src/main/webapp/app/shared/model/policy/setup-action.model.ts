import { IUserFacingMessage } from 'app/shared/model/devices/user-facing-message.model';
import { ILaunchAppAction } from 'app/shared/model/policy/launch-app-action.model';

export interface ISetupAction {
  title?: IUserFacingMessage;
  description?: IUserFacingMessage;
  launchApp?: ILaunchAppAction;
}
export const defaultValue: Readonly<ISetupAction> = {};
