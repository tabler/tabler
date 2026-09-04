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

/**
 * A preset is one tile that sets several settings at once, the way AppStack's
 * "color scheme" picks the page theme and the sidebar theme together. The
 * switcher script knows nothing about presets: the panel expands one into
 * the keys it stands for, and reads the tile back from those keys.
 */
export interface ThemePreset extends ThemeOption {
  values: Partial<Record<ThemeKey, string>>
}

export interface ThemeSetting {
  /** input name; a real switcher key, or the preset group's own name */
  key: ThemeKey | string
  /** fieldset legend */
  legend: string
  /** help text under the legend */
  hint: string
  /**
   * 'radio' renders chips, 'color' renders color swatches, 'font' renders "Aa"
   * tiles in each font, 'tile' renders a thumbnail per value, 'preset' renders
   * thumbnails that set several keys at once.
   */
  control: 'radio' | 'color' | 'font' | 'tile' | 'preset'
  options: ThemeOption[] | ThemePreset[]
  /**
   * Only meaningful while the sidebar is on screen; the panel hides these
   * settings when the navigation is horizontal, the way Dashkit hides its
   * sidebar sizing group.
   */
  sidebarOnly?: boolean
  /** Only meaningful with the top navbar; hidden while the navigation is vertical. */
  navbarOnly?: boolean
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
        key: 'scheme',
        legend: 'Color scheme',
        hint: 'The page and its navigation, in one pick.',
        control: 'preset',
        options: [
          { value: 'auto', label: 'Auto', values: { 'theme': 'auto', 'navbar-theme': 'default' } },
          { value: 'light', label: 'Light', values: { 'theme': 'light', 'navbar-theme': 'default' } },
          { value: 'dark', label: 'Dark', values: { 'theme': 'dark', 'navbar-theme': 'default' } },
          { value: 'dark-nav', label: 'Dark nav', values: { 'theme': 'light', 'navbar-theme': 'dark' } },
          { value: 'colored', label: 'Colored', values: { 'theme': 'light', 'navbar-theme': 'primary' } },
        ],
      },
      {
        key: 'theme-primary',
        legend: 'Accent color',
        hint: 'The accent color used across the app.',
        control: 'color',
        options: autoOptions([...site.themeColors, 'inverted']),
      },
      {
        key: 'theme-font',
        legend: 'Font family',
        hint: 'The typeface used across the app.',
        control: 'font',
        options: autoOptions(site.themeFonts),
      },
      {
        key: 'theme-base',
        legend: 'Theme base',
        hint: 'The gray palette behind every surface.',
        control: 'tile',
        options: autoOptions(site.themeBases),
      },
      {
        key: 'theme-radius',
        legend: 'Corner radius',
        hint: 'How round corners are drawn.',
        control: 'tile',
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
        hint: 'Where the main menu lives.',
        control: 'tile',
        options: [
          { value: 'horizontal', label: 'Navbar' },
          { value: 'vertical', label: 'Sidebar' },
        ],
      },
      {
        key: 'layout',
        legend: 'Container width',
        hint: 'How wide the page content runs.',
        control: 'tile',
        options: autoOptions(['default', 'fluid', 'boxed']),
      },
      {
        key: 'navbar',
        legend: 'Navbar behavior',
        hint: 'Keep the navbar visible while scrolling.',
        control: 'tile',
        navbarOnly: true,
        options: [
          { value: 'default', label: 'Default' },
          { value: 'sticky', label: 'Sticky' },
        ],
      },
      {
        key: 'sidebar',
        legend: 'Sidebar',
        hint: 'How the sidebar behaves.',
        control: 'tile',
        sidebarOnly: true,
        options: [
          { value: 'default', label: 'Expanded' },
          { value: 'folded', label: 'Folded' },
          { value: 'folded-hover', label: 'On hover' },
        ],
      },
    ],
  },
]

/** Every setting, in panel order. */
export const themeSettings: ThemeSetting[] = themeSections.flatMap((section) => section.settings)

/** The preset groups, keyed by input name: tile value -> the keys and values it sets. */
export const themePresets: Record<string, Record<string, Partial<Record<ThemeKey, string>>>> = Object.fromEntries(themeSettings.filter((setting) => setting.control === 'preset').map((setting) => [setting.key, Object.fromEntries((setting.options as ThemePreset[]).map((option) => [option.value, option.values]))]))

/** Input names of the settings the panel hides while the navigation is horizontal. */
export const sidebarOnlyKeys: string[] = themeSettings.filter((setting) => setting.sidebarOnly).map((setting) => setting.key)

/** Input names of the settings the panel hides while the navigation is vertical. */
export const navbarOnlyKeys: string[] = themeSettings.filter((setting) => setting.navbarOnly).map((setting) => setting.key)

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
