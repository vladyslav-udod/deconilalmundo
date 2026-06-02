import type { IconProps } from './types'

export default function Cross({ className, ...props }: IconProps) {
  return (
    <svg
      className={className ?? 'cross'}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      {...props}
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}
