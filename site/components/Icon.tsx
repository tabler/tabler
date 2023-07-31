import clsx from 'clsx';

const icons = {
  plus: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon icon-tabler icon-tabler-plus', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  'brand-github': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-brand-github', className)}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
    </svg>
  ),
  'brand-sketch': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-brand-sketch', className)}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.262 10.878l8 8.789c.4 .44 1.091 .44 1.491 0l8 -8.79c.313 -.344 .349 -.859 .087 -1.243l-3.537 -5.194a1 1 0 0 0 -.823 -.436h-8.926a1 1 0 0 0 -.823 .436l-3.54 5.192c-.263 .385 -.227 .901 .087 1.246z" />
    </svg>
  ),
  'brand-figma': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-brand-figma', className)}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={15} cy={12} r={3} />
      <rect x={6} y={3} width={12} height={6} rx={3} />
      <path d="M9 9a3 3 0 0 0 0 6h3m-3 0a3 3 0 1 0 3 3v-15" />
    </svg>
  ),
  'brand-twitter': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-brand-twitter', className)}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
    </svg>
  ),
  'brand-facebook': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-brand-facebook', className)}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
    </svg>
  ),
  'brand-dribbble': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-brand-dribbble', className)}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={12} cy={12} r={9} />
      <path d="M9 3.6c5 6 7 10.5 7.5 16.2" />
      <path d="M6.4 19c3.5 -3.5 6 -6.5 14.5 -6.4" />
      <path d="M3.1 10.75c5 0 9.814 -.38 15.314 -5" />
    </svg>
  ),
  heart: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-heart', className)}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
    </svg>
  ),
  download: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-download', className)}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
      <polyline points="7 11 12 16 17 11" />
      <line x1={12} y1={4} x2={12} y2={16} />
    </svg>
  ),
  edit: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-edit', className)}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
      <path d="M16 5l3 3" />
    </svg>
  ),
  search: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-search', className)}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={10} cy={10} r={7} />
      <line x1={21} y1={21} x2={15} y2={15} />
    </svg>
  ),
  lock: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-lock', className)}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x={5} y={11} width={14} height={10} rx={2} />
      <circle cx={12} cy={16} r={1} />
      <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
    </svg>
  ),
  'brand-bootstrap': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-brand-bootstrap', className)}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12a2 2 0 0 0 2 -2v-4a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2" />
      <path d="M2 12a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-4a2 2 0 0 1 2 -2" />
      <path d="M9 16v-8h3.5a2 2 0 1 1 0 4h-3.5h4a2 2 0 1 1 0 4h-4z" />
    </svg>
  ),
  'brand-html5': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-brand-html5', className)}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z" />
      <path d="M15.5 8h-7l.5 4h6l-.5 3.5l-2.5 .75l-2.5 -.75l-.1 -.5" />
    </svg>
  ),
  tools: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-tools', className)}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4" />
      <line x1="14.5" y1="5.5" x2="18.5" y2="9.5" />
      <polyline points="12 8 7 3 3 7 8 12" />
      <line x1={7} y1={8} x2="5.5" y2="9.5" />
      <polyline points="16 12 21 17 17 21 12 16" />
      <line x1={16} y1={17} x2="14.5" y2="18.5" />
    </svg>
  ),
  paint: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-paint', className)}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x={5} y={3} width={14} height={6} rx={2} />
      <path d="M19 6h1a2 2 0 0 1 2 2a5 5 0 0 1 -5 5l-5 0v2" />
      <rect x={10} y={15} width={4} height={6} rx={1} />
    </svg>
  ),
  check: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-check', className)}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12l5 5l10 -10" />
    </svg>
  ),
  x: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-x', className)}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  copy: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-copy', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
    </svg>
  ),
  'arrow-down-circle': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-arrow-down-circle', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="8" y1="12" x2="12" y2="16" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="16" y1="12" x2="12" y2="16" />
    </svg>
  ),
  'arrow-right': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-arrow-right', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12l14 0" />
      <path d="M13 18l6 -6" />
      <path d="M13 6l6 6" />
    </svg>
  ),
  'thumb-up': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-thumb-up', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
    </svg>
  ),
  'device-mobile': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-device-mobile', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <line x1="11" y1="4" x2="13" y2="4" />
      <line x1="12" y1="17" x2="12" y2="17.01" />
    </svg>
  ),
  'device-tablet': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-device-tablet', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <circle cx="12" cy="17" r="1" />
    </svg>
  ),
  'device-desktop': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-device-desktop', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="12" rx="1" />
      <line x1="7" y1="20" x2="17" y2="20" />
      <line x1="9" y1="16" x2="9" y2="20" />
      <line x1="15" y1="16" x2="15" y2="20" />
    </svg>
  ),
  'chevron-left': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-chevron-left', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 6 9 12 15 18" />
    </svg>
  ),
  'chevron-right': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-chevron-right', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 6 15 12 9 18" />
    </svg>
  ),
  lego: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-lego', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="9.5" y1="11" x2="9.51" y2="11" />
      <line x1="14.5" y1="11" x2="14.51" y2="11" />
      <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
      <path d="M7 5h1v-2h8v2h1a3 3 0 0 1 3 3v9a3 3 0 0 1 -3 3v1h-10v-1a3 3 0 0 1 -3 -3v-9a3 3 0 0 1 3 -3" />
    </svg>
  ),
  'chevron-up': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-chevron-up', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 15 12 9 18 15" />
    </svg>
  ),
  devices: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-devices', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="13" y="8" width="8" height="12" rx="1" />
      <path d="M18 8v-3a1 1 0 0 0 -1 -1h-13a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h9" />
      <line x1="16" y1="9" x2="18" y2="9" />
    </svg>
  ),
  mailbox: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-mailbox', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 21v-6.5a3.5 3.5 0 0 0 -7 0v6.5h18v-6a4 4 0 0 0 -4 -4h-10.5" />
      <path d="M12 11v-8h4l2 2l-2 2h-4" />
      <path d="M6 15h1" />
    </svg>
  ),
  palette: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-palette', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21a9 9 0 1 1 0 -18a9 8 0 0 1 9 8a4.5 4 0 0 1 -4.5 4h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
      <circle cx="7.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="12" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="16.5" cy="10.5" r=".5" fill="currentColor" />
    </svg>
  ),
  message: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-message', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
      <line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="13" x2="14" y2="13" />
    </svg>
  ),
  settings: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-settings', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  adjustments: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-adjustments', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="10" r="2" />
      <line x1="6" y1="4" x2="6" y2="8" />
      <line x1="6" y1="12" x2="6" y2="20" />
      <circle cx="12" cy="16" r="2" />
      <line x1="12" y1="4" x2="12" y2="14" />
      <line x1="12" y1="18" x2="12" y2="20" />
      <circle cx="18" cy="7" r="2" />
      <line x1="18" y1="4" x2="18" y2="5" />
      <line x1="18" y1="9" x2="18" y2="20" />
    </svg>
  ),
  clipboard: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-clipboard-copy', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h3m9 -9v-5a2 2 0 0 0 -2 -2h-2" />
      <path d="M13 17v-1a1 1 0 0 1 1 -1h1m3 0h1a1 1 0 0 1 1 1v1m0 3v1a1 1 0 0 1 -1 1h-1m-3 0h-1a1 1 0 0 1 -1 -1v-1" />
      <rect x="9" y="3" width="6" height="4" rx="2" />
    </svg>
  ),
  home: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-home', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="5 12 3 12 12 3 21 12 19 12" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
    </svg>
  ),
  box: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-box', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
      <line x1="12" y1="12" x2="20" y2="7.5" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <line x1="12" y1="12" x2="4" y2="7.5" />
    </svg>
  ),
  lifebuoy: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-lifebuoy', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="9" />
      <line x1="15" y1="15" x2="18.35" y2="18.35" />
      <line x1="9" y1="15" x2="5.65" y2="18.35" />
      <line x1="5.65" y1="5.65" x2="9" y2="9" />
      <line x1="18.35" y1="5.65" x2="15" y2="9" />
    </svg>
  ),
  code: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-code', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="7 8 3 12 7 16" />
      <polyline points="17 8 21 12 17 16" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  ),
  versions: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-versions', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="10" y="5" width="10" height="14" rx="2" />
      <line x1="7" y1="7" x2="7" y2="17" />
      <line x1="4" y1="8" x2="4" y2="16" />
    </svg>
  ),
  maximize: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-maximize', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
      <path d="M4 16v2a2 2 0 0 0 2 2h2" />
      <path d="M16 4h2a2 2 0 0 1 2 2v2" />
      <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
    </svg>
  ),
  minimize: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-minimize', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 19v-2a2 2 0 0 1 2 -2h2" />
      <path d="M15 5v2a2 2 0 0 0 2 2h2" />
      <path d="M5 15h2a2 2 0 0 1 2 2v2" />
      <path d="M5 9h2a2 2 0 0 0 2 -2v-2" />
    </svg>
  ),
  'external-link': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-external-link', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" />
      <line x1="10" y1="14" x2="20" y2="4" />
      <polyline points="15 4 20 4 20 9" />
    </svg>
  ),
  star: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-star', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
    </svg>
  ),
  'target-arrow': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-target-arrow', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <path d="M12 7a5 5 0 1 0 5 5" />
      <path d="M13.004 3.055a9 9 0 1 0 7.941 7.945" />
      <path d="M15 6v3h3l3 -3h-3v-3z" />
      <path d="M15 9l-3 3" />
    </svg>
  ),
  brush: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-brush', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21v-4a4 4 0 1 1 4 4h-4" />
      <path d="M21 3a16 16 0 0 0 -12.8 10.2" />
      <path d="M21 3a16 16 0 0 1 -10.2 12.8" />
      <path d="M10.6 9a9 9 0 0 1 4.4 4.4" />
    </svg>
  ),
  'layout-dashboard': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-layout-dashboard', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h6v8h-6z" />
      <path d="M4 16h6v4h-6z" />
      <path d="M14 12h6v8h-6z" />
      <path d="M14 4h6v4h-6z" />
    </svg>
  ),
  'sun-moon': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-sun-moon', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.173 14.83a4 4 0 1 1 5.657 -5.657" />
      <path d="M11.294 12.707l.174 .247a7.5 7.5 0 0 0 8.845 2.492a9 9 0 0 1 -14.671 2.914" />
      <path d="M3 12h1" />
      <path d="M12 3v1" />
      <path d="M5.6 5.6l.7 .7" />
      <path d="M3 21l18 -18" />
    </svg>
  ),
  'circle-x-filled': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-circle-x-filled', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
        strokeWidth="0"
        fill="currentColor"
      ></path>
    </svg>
  ),
  'circle-check-filled': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-circle-check-filled', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
        strokeWidth="0"
        fill="currentColor"
      ></path>
    </svg>
  ),
  'alert-circle-filled': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-alert-circle-filled', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm.01 13l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -8a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z"
        stroke-width="0"
        fill="currentColor"
      ></path>
    </svg>
  ),
  sparkles: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-sparkles', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z"></path>
    </svg>
  ),
  script: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-script', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M17 20h-11a3 3 0 0 1 0 -6h11a3 3 0 0 0 0 6h1a3 3 0 0 0 3 -3v-11a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v8"></path>
    </svg>
  ),
  link: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-link', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5"></path>
      <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5"></path>
    </svg>
  ),
  'brand-linkedin': ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon icon-tabler icon-tabler-brand-linkedin', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
      <path d="M8 11l0 5"></path>
      <path d="M8 8l0 .01"></path>
      <path d="M12 16l0 -5"></path>
      <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
    </svg>
  ),
};

export default function Icon({
  name,
  color,
  filled = false,
  className = null,
}: {
  name: string
  color?: string
  filled?: boolean
  className?: string | null
}) {
  if (icons[name]) {
    const Component = icons[name];

    return (
      <Component
        className={clsx('icon', className, {
          [`text-${color}`]: color,
          'icon-filled': filled,
        })}
      />
    );
  } else {
    throw Error(`Icon ${name} doesn't exists`);
  }
}
