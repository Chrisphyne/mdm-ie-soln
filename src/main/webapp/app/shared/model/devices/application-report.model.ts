enum ApplicationEventType {
  'ApplicationEventTypeUnspecified' = 'APPLICATION_EVENT_TYPE_UNSPECIFIED',
  'Installed' = 'INSTALLED',
  'Changed' = 'CHANGED',
  'DataCleared' = 'DATA_CLEARED',
  'Removed' = 'REMOVED',
  'Replaced' = 'REPLACED',
  'Restarted' = 'RESTARTED',
  'Pinned' = 'PINNED',
  'Unpinned' = 'UNPINNED',
}

interface ApplicationEvent {
  eventType?: ApplicationEventType;
  createTime?: string;
}

export interface IApplicationReport {
  packageName?: string;
  versionName?: string;
  versionCode?: number;
  events?: ApplicationEvent[];
}

export const defaultValue: Readonly<IApplicationReport> = {};
