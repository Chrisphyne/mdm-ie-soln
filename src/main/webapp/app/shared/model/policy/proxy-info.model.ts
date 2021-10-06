export interface IProxyInfo {
  host?: string;
  port?: number;
  excludedHosts?: string[];
  pacUri?: string;
}
export const defaultValue: Readonly<IProxyInfo> = {};
