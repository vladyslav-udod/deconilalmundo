import type { IconProps } from './types'

export default function CheckCircle({ className, ...props }: IconProps) {
  return (
    <svg
      className={className ?? 'tick'}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  )
}
