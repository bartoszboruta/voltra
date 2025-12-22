/**
 * Widget-related type definitions
 */

/**
 * Supported widget size families
 */
export type WidgetFamily =
  | 'systemSmall'
  | 'systemMedium'
  | 'systemLarge'
  | 'systemExtraLarge'
  | 'accessoryCircular'
  | 'accessoryRectangular'
  | 'accessoryInline'

/**
 * Configuration for a single home screen widget
 */
export interface WidgetConfig {
  /**
   * Unique identifier for the widget (used as the widget kind and in JS API)
   * Must be alphanumeric with underscores only
   */
  id: string
  /**
   * Display name shown in the widget gallery
   */
  displayName: string
  /**
   * Description shown in the widget gallery
   */
  description: string
  /**
   * Supported widget sizes
   * @default ['systemSmall', 'systemMedium', 'systemLarge']
   */
  supportedFamilies?: WidgetFamily[]
  /**
   * Path to a file that default exports a WidgetVariants object for initial widget state.
   * This will be pre-rendered at build time and bundled into the iOS app.
   */
  initialStatePath?: string
}

/**
 * Structure describing the files in a widget extension target.
 * Used for configuring Xcode build phases and groups.
 */
export interface WidgetFiles {
  swiftFiles: string[]
  entitlementFiles: string[]
  plistFiles: string[]
  assetDirectories: string[]
  intentFiles: string[]
}
