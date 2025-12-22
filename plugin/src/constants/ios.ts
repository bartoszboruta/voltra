/**
 * iOS-related constants for the Voltra plugin
 */

export const IOS = {
  /** Minimum iOS deployment target version */
  DEPLOYMENT_TARGET: '17.0',

  /** Swift language version */
  SWIFT_VERSION: '5.0',

  /** Target device families (1 = iPhone, 2 = iPad) */
  DEVICE_FAMILY: '1,2',

  /** Last Swift migration version for Xcode */
  LAST_SWIFT_MIGRATION: 1250,
} as const
