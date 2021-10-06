enum PasswordQuality {
  'PasswordQualityUnspecified' = 'PASSWORD_QUALITY_UNSPECIFIED',
  'BiometricWeak' = 'BIOMETRIC_WEAK',
  'Something' = 'SOMETHING',
  'Numeric' = 'NUMERIC',
  'NumericComplex' = 'NUMERIC_COMPLEX',
  'Alphabetic' = 'ALPHABETIC',
  'AlphaNumeric' = 'ALPHANUMERIC',
  'Complex' = 'COMPLEX',
}

enum PasswordPolicyScope {
  'ScopeUnspecified' = 'SCOPE_UNSPECIFIED',
  'ScopeDevice' = 'SCOPE_DEVICE',
  'ScopeProfile' = 'SCOPE_PROFILE',
}

enum RequirePasswordUnlock {
  'RequiredPasswordUnlockUnspecified' = 'REQUIRE_PASSWORD_UNLOCK_UNSPECIFIED',
  'UseDefaultDeviceTimeout' = 'USE_DEFAULT_DEVICE_TIMEOUT',
  'RequireEveryDay' = 'REQUIRE_EVERY_DAY',
}

export interface IPasswordRequirements {
  passwordMinimumLength?: number;
  passwordMinimumLetters?: number;
  passwordMinimumLowerCase?: number;
  passwordMinimumNonLetter?: number;
  passwordMinimumNumeric?: number;
  passwordMinimumSymbols?: number;
  passwordMinimumUpperCase?: number;
  passwordQuality?: PasswordQuality;
  passwordHistoryLength?: number;
  maximumFailedPasswordsForWipe?: number;
  passwordExpirationTimeout?: string;
  passwordScope?: PasswordPolicyScope;
  requirePasswordUnlock?: RequirePasswordUnlock;
}
export const defaultValue: Readonly<IPasswordRequirements> = {};
