import type { IconProps } from './types'

export default function ArrowRight(props: IconProps) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}
