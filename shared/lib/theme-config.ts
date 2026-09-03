// The theme switcher's settings, described once for both the panel markup and
// the demo script that applies them.
//
// The defaults come from the shipped switcher (@tabler/core/js/src/theme-config)
// so the panel can never disagree with the script about what "default" means.
// Each key maps to a `data-bs-<key>` attribute on <html>, written only when the
// value differs from the default.
import { themeDefaults, type ThemeKey } from '@tabler/core/js/src/theme-config'
import { site } from './site'
import { ucFirst } from './string-format'

export { themeDefaults }
export type { ThemeKey }

export interface ThemeOption {
  value: string
  label: string
}

export interface ThemeSetting {
  key: ThemeKey
  /** fieldset legend */
  legend: string
  /** help text under the legend */
  hint: string
  /** 'radio' renders labelled radios, 'color' renders color swatches */
  control: 'radio' | 'color'
  options: ThemeOption[]
  /**
   * Only meaningful while the sidebar is on screen; the panel hides these
   * settings when the navigation is horizontal, the way Dashkit hides its
   * sidebar sizing group.
   */
  sidebarOnly?: boolean
}

export interface ThemeSection {
  title: string
  settings: ThemeSetting[]
}

/** Turns a list of raw values into options labelled by their capitalized value. */
function autoOptions(values: readonly string[]): ThemeOption[] {
  return values.map((value) => ({ value, label: ucFirst(value) }))
}

export const themeSections: ThemeSection[] = [
  {
    title: 'Appearance',
    settings: [
      {
        key: 'theme',
        legend: 'Color mode',
        hint: 'Choose the color mode for your app.',
        control: 'radio',
        options: autoOptions(['light', 'dark', 'auto']),
      },
      {
        key: 'theme-primary',
        legend: 'Color scheme',
        hint: 'The perfect color mode for your app.',
        control: 'color',
        options: autoOptions([...site.themeColors, 'inverted']),
      },
      {
        key: 'theme-font',
        legend: 'Font family',
        hint: 'Choose the font family that fits your app.',
        control: 'radio',
        options: autoOptions(site.themeFonts),
      },
      {
        key: 'theme-base',
        legend: 'Theme base',
        hint: 'Choose the gray shade for your app.',
        control: 'radio',
        options: autoOptions(site.themeBases),
      },
      {
        key: 'theme-radius',
        legend: 'Corner radius',
        hint: 'Choose the border radius factor for your app.',
        control: 'radio',
        options: site.themeRadiuses.map((value) => ({ value, label: value })),
      },
    ],
  },
  {
    title: 'Layout',
    settings: [
      {
        key: 'navbar-position',
        legend: 'Navigation',
        hint: 'Choose where the main menu lives.',
        control: 'radio',
        options: [
          { value: 'horizontal', label: 'Top navbar' },
          { value: 'vertical', label: 'Sidebar' },
        ],
      },
      {
        key: 'layout',
        legend: 'Container width',
        hint: 'Choose how wide the page content runs.',
        control: 'radio',
        options: autoOptions(['default', 'fluid', 'boxed']),
      },
      {
        key: 'navbar',
        legend: 'Navbar behavior',
        hint: 'Keep the top navbar visible while scrolling.',
        control: 'radio',
        options: [
          { value: 'default', label: 'Default' },
          { value: 'sticky', label: 'Sticky' },
        ],
      },
      {
        key: 'navbar-theme',
        legend: 'Navbar theme',
        hint: 'Default follows the color mode.',
        control: 'radio',
        options: autoOptions(['default', 'dark']),
      },
      {
        key: 'sidebar',
        legend: 'Sidebar',
        hint: 'Choose how the vertical sidebar behaves.',
        control: 'radio',
        sidebarOnly: true,
        options: [
          { value: 'default', label: 'Expanded' },
          { value: 'folded', label: 'Folded' },
          { value: 'folded-hover', label: 'Folded with hover' },
        ],
      },
      {
        key: 'sidebar-theme',
        legend: 'Sidebar theme',
        hint: 'Default follows the color mode.',
        control: 'radio',
        sidebarOnly: true,
        options: autoOptions(['default', 'dark']),
      },
    ],
  },
]

/** Every setting, in panel order. */
export const themeSettings: ThemeSetting[] = themeSections.flatMap((section) => section.settings)

/** Settings the panel hides while the navigation is horizontal. */
export const sidebarOnlyKeys: ThemeKey[] = themeSettings.filter((setting) => setting.sidebarOnly).map((setting) => setting.key)

/**
 * Builds the `data-bs-*` attributes a page renders on <html> to express its own
 * layout. Defaults are omitted, matching what the switcher writes at runtime.
 */
export function themeDataAttributes(values: Partial<Record<ThemeKey, string | undefined>>): Record<string, string> {
  const attributes: Record<string, string> = {}

  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined && value !== themeDefaults[key as ThemeKey]) {
      attributes[`data-bs-${key}`] = value
    }
  }

  return attributes
}
