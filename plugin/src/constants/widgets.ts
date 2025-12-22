import type { WidgetFamily } from '../types'

/**
 * Widget-related constants for the Voltra plugin
 */

/** Maximum image size in bytes for Live Activities (4KB limit) */
export const MAX_IMAGE_SIZE_BYTES = 4096

/** Supported image extensions for widget assets */
export const SUPPORTED_IMAGE_EXTENSIONS = /\.(png|jpg|jpeg)$/i

/** Default widget families when not specified */
export const DEFAULT_WIDGET_FAMILIES: WidgetFamily[] = ['systemSmall', 'systemMedium', 'systemLarge']

/** Maps JS widget family names to SwiftUI WidgetFamily enum cases */
export const WIDGET_FAMILY_MAP: Record<WidgetFamily, string> = {
  systemSmall: '.systemSmall',
  systemMedium: '.systemMedium',
  systemLarge: '.systemLarge',
  systemExtraLarge: '.systemExtraLarge',
  accessoryCircular: '.accessoryCircular',
  accessoryRectangular: '.accessoryRectangular',
  accessoryInline: '.accessoryInline',
}

/** Extensions to try when resolving module paths for pre-rendering */
export const MODULE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '']
