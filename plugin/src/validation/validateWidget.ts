import type { WidgetConfig, WidgetFamily } from '../types'

const VALID_FAMILIES: Set<WidgetFamily> = new Set([
  'systemSmall',
  'systemMedium',
  'systemLarge',
  'systemExtraLarge',
  'accessoryCircular',
  'accessoryRectangular',
  'accessoryInline',
])

/**
 * Validates a widget configuration.
 * Throws an error if validation fails.
 */
export function validateWidgetConfig(widget: WidgetConfig): void {
  // Validate widget ID
  if (!widget.id || typeof widget.id !== 'string') {
    throw new Error('Widget ID is required and must be a string')
  }

  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(widget.id)) {
    throw new Error(
      `Widget ID '${widget.id}' is invalid. ` +
        'Must start with a letter or underscore and contain only alphanumeric characters and underscores.'
    )
  }

  // Validate display name
  if (!widget.displayName?.trim()) {
    throw new Error(`Widget '${widget.id}': displayName is required`)
  }

  // Validate description
  if (!widget.description?.trim()) {
    throw new Error(`Widget '${widget.id}': description is required`)
  }

  // Validate supported families if provided
  if (widget.supportedFamilies) {
    if (!Array.isArray(widget.supportedFamilies)) {
      throw new Error(`Widget '${widget.id}': supportedFamilies must be an array`)
    }

    for (const family of widget.supportedFamilies) {
      if (!VALID_FAMILIES.has(family)) {
        throw new Error(
          `Widget '${widget.id}': Invalid widget family '${family}'. ` +
            `Valid families are: ${Array.from(VALID_FAMILIES).join(', ')}`
        )
      }
    }
  }
}
