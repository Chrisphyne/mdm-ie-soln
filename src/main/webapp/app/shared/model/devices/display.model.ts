enum DisplayState {
  'DisplayStateUnspecified' = 'DISPLAY_STATE_UNSPECIFIED',
  'Off' = 'OFF',
  'On' = 'ON',
  'Doze' = 'DOZE',
  'Suspended' = 'SUSPENDED',
}

export interface IDisplay {
  name?: string;
  displayId?: number;
  refreshRate?: number;
  state?: DisplayState;
  width?: number;
  height?: number;
  density?: number;
}

export const defaultValue: Readonly<IDisplay> = {};
