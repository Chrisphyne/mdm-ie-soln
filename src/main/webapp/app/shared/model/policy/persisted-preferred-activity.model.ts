export interface IPersistentPreferredActivity {
  receiverActivity?: string;
  actions?: string[];
  categories?: string[];
}
export const defaultValue: Readonly<IPersistentPreferredActivity> = {};
