enum PermissionPolicy {
  'PermissionPolicyUnspecified' = 'PERMISSION_POLICY_UNSPECIFIED',
  'Prompt' = 'PROMPT',
  'Grant' = 'GRANT',
  'Deny' = 'DENY',
}
export interface IPermissionGrant {
  permission?: string;
  policy?: PermissionPolicy;
}

export const defaultValue: Readonly<IPermissionGrant> = {};
