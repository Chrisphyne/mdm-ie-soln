export interface INetworkInfo {
  imei?: string;
  meid?: string;
  wifiMacAddress?: string;
  networkOperatorName?: string;
}

export const defaultValue: Readonly<INetworkInfo> = {};
