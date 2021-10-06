enum PowerManagementEventType {
  'PowerManagementEventTypeUnspecified' = 'POWER_MANAGEMENT_EVENT_TYPE_UNSPECIFIED',
  'BatteryLevelCollected' = 'BATTERY_LEVEL_COLLECTED',
  'PowerConnected' = 'POWER_CONNECTED',
  'PowerDisconnected' = 'POWER_DISCONNECTED',
  'BatterLow' = 'BATTERY_LOW',
  'BatteryOkay' = 'BATTERY_OKAY',
  'BootCompleted' = 'BOOT_COMPLETED',
  'Shutdown' = 'SHUTDOWN',
}

export interface IPowerManagementEvent {
  eventType?: PowerManagementEventType;
  createTime?: string;
  batteryLevel?: number;
}

export const defaultValue: Readonly<IPowerManagementEvent> = {};
