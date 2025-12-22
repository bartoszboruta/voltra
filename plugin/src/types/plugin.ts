import { ConfigPlugin } from '@expo/config-plugins'

import type { WidgetConfig } from './widget'

/**
 * Props for the Voltra config plugin
 */
export interface ConfigPluginProps {
  /**
   * Enable push notification support for Live Activities
   */
  enablePushNotifications?: boolean
  /**
   * App group identifier for sharing data between app and widget extension
   */
  groupIdentifier?: string
  /**
   * Configuration for home screen widgets
   * Each widget will be available in the widget gallery
   */
  widgets?: WidgetConfig[]
}

/**
 * The main Voltra config plugin type
 */
export type VoltraConfigPlugin = ConfigPlugin<ConfigPluginProps | undefined>

/**
 * Props passed to iOS-related plugins
 */
export interface IOSPluginProps {
  targetName: string
  bundleIdentifier: string
  deploymentTarget: string
  widgets?: WidgetConfig[]
  groupIdentifier?: string
  projectRoot: string
  platformProjectRoot: string
}
