enum BlockScope {
  'BLOCK_SCOPE_UNSPECIFIED' = 'BLOCK_SCOPE_UNSPECIFIED',
  'BLOCK_SCOPE_WORK_PROFILE' = 'BLOCK_SCOPE_WORK_PROFILE',
  'BLOCK_SCOPE_DEVICE' = 'BLOCK_SCOPE_DEVICE',
}

export interface IBlockAction {
  blockAfterDays?: number;
  blockScope?: BlockScope;
}
export const defaultValue: Readonly<IBlockAction> = {};
