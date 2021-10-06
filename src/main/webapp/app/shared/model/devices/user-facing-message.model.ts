export interface IUserFacingMessage {
  localizedMessages?: Map<string, string>;
  defaultMessage?: string;
}

export const defaultValue: Readonly<IUserFacingMessage> = {};
