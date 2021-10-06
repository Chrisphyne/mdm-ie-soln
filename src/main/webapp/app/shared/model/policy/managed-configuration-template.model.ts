export interface IManagedConfigurationTemplate {
  templateId?: string;
  configurationVariables?: Map<string, string>;
}

export const defaultValue: Readonly<IManagedConfigurationTemplate> = {};
