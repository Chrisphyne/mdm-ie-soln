enum MemoryEventType {
  'MemoryEventTypeUnspecified' = 'MEMORY_EVENT_TYPE_UNSPECIFIED',
  'RamMeasured' = 'RAM_MEASURED',
  'InternalStorageMeasured' = 'INTERNAL_STORAGE_MEASURED',
  'ExternalStorageDetected' = 'EXTERNAL_STORAGE_DETECTED',
  'ExternalStorageRemoved' = 'EXTERNAL_STORAGE_REMOVED',
  'ExternalStorageMeasured' = 'EXTERNAL_STORAGE_MEASURED',
}

export interface IMemoryEvent {
  eventType?: MemoryEventType;
  createTime?: string;
  byteCount?: string;
}

export const defaultValue: Readonly<IMemoryEvent> = {};
