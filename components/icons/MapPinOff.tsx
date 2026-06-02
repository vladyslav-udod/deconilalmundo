import type { IconProps } from './types'

/** Map pin with a slash — "no results / no destinations" state. */
export default function MapPinOff(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5.43 5.43A8 8 0 0 0 4 10c0 6 8 11 8 11a30 30 0 0 0 4.34-3.42" />
      <path d="M9.84 4.59A8 8 0 0 1 20 10c0 1.43-.45 2.86-1.13 4.22" />
      <circle cx="12" cy="10" r="2.2" />
      <line x1="3" y1="3" x2="21" y2="21" />
    </svg>
  )
}
