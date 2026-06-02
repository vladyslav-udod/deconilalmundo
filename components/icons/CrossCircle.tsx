import type { IconProps } from './types'

export default function CrossCircle({ className, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9l6 6M15 9l-6 6" />
    </svg>
  )
}
