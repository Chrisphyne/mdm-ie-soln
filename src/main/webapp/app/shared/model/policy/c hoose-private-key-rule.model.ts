export interface IChoosePrivateKeyRule {
  urlPattern?: string;
  packageNames?: string[];
  privateKeyAlias?: string;
}
export const defaultValue: Readonly<IChoosePrivateKeyRule> = {};
