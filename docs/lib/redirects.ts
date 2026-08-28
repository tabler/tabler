// Renamed/moved docs pages. Add an entry here whenever a docs URL changes.
// Consumed by astro.config.mjs (turned into real HTTP redirects at Vercel's
// routing layer) and by middleware.ts (which must let these urls fall through
// to the redirect instead of rewriting them to nonexistent `.md` mirrors).
// The plural component slugs are the pre-Astro URLs still present in the
// Google index, Algolia search results and external backlinks.

type Redirect = { status: 301; destination: string }

export const redirects: Record<string, Redirect> = {
  '/ui/base/markdown': { status: 301, destination: '/ui/base/prose' },
  // @tabler/icons-eps is no longer maintained; PDF is the vector format to use.
  '/icons/static-files/eps': { status: 301, destination: '/icons/static-files/pdf' },
  ...Object.fromEntries(
    [
      ['alerts', 'alert'],
      ['avatars', 'avatar'],
      ['badges', 'badge'],
      ['buttons', 'button'],
      ['cards', 'card'],
      ['dropdowns', 'dropdown'],
      ['icons', 'icon'],
      ['modals', 'modal'],
      ['ribbons', 'ribbon'],
      ['spinners', 'spinner'],
      ['statuses', 'status'],
      ['steps', 'step'],
      ['tables', 'table'],
      ['tabs', 'tab'],
      ['timelines', 'timeline'],
      ['toasts', 'toast'],
      ['tooltips', 'tooltip'],
    ].map(([from, to]): [string, Redirect] => [`/ui/components/${from}`, { status: 301, destination: `/ui/components/${to}` }]),
  ),
  // Components that need a third-party library moved to /ui/plugins/.
  ...Object.fromEntries(['autosize', 'chart', 'countup', 'dropzone', 'fullcalendar', 'inline-player', 'lightbox', 'range-slider', 'signature', 'vector-map', 'wysiwyg'].map((slug): [string, Redirect] => [`/ui/components/${slug}`, { status: 301, destination: `/ui/plugins/${slug}` }])),
  // Pre-Astro plural urls for two of those pages, sent straight to the new home.
  '/ui/components/charts': { status: 301, destination: '/ui/plugins/chart' },
  '/ui/components/vector-maps': { status: 301, destination: '/ui/plugins/vector-map' },
  // The form- prefix was redundant inside /ui/forms/.
  '/ui/forms/form-elements': { status: 301, destination: '/ui/forms/elements' },
  '/ui/forms/form-fieldset': { status: 301, destination: '/ui/forms/fieldset' },
  '/ui/forms/form-floating': { status: 301, destination: '/ui/forms/floating-labels' },
  '/ui/forms/form-helpers': { status: 301, destination: '/ui/forms/helpers' },
  '/ui/forms/form-selectboxes': { status: 301, destination: '/ui/forms/select-group' },
  '/ui/forms/form-image-check': { status: 301, destination: '/ui/forms/image-check' },
  '/ui/forms/form-color-check': { status: 301, destination: '/ui/forms/color-check' },
  '/ui/forms/form-select-tomselect': { status: 301, destination: '/ui/plugins/advanced-select' },
  '/ui/forms/form-colorpicker': { status: 301, destination: '/ui/plugins/color-picker' },
  '/ui/forms/form-datepicker': { status: 301, destination: '/ui/plugins/date-picker' },
  '/ui/forms/form-input-mask': { status: 301, destination: '/ui/plugins/input-mask' },
  '/ui/forms/form-validation': { status: 301, destination: '/ui/forms/validation' },
  // Illustrations and Emails lost their "introduction" wrapper.
  '/illustrations/introduction': { status: 301, destination: '/illustrations' },
  '/illustrations/introduction/preview': { status: 301, destination: '/illustrations/preview' },
  '/illustrations/introduction/contents': { status: 301, destination: '/illustrations/contents' },
  '/illustrations/introduction/customization': { status: 301, destination: '/illustrations/customization' },
  '/illustrations/introduction/license': { status: 301, destination: '/illustrations/license' },
  '/emails/introduction': { status: 301, destination: '/emails' },
  '/emails/introduction/contents': { status: 301, destination: '/emails/contents' },
  '/emails/introduction/compiled-html': { status: 301, destination: '/emails/compiled-html' },
  '/emails/introduction/source-html': { status: 301, destination: '/emails/source-html' },
}
