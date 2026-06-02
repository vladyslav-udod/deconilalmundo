import type { IconProps } from './types'

export default function Check({ className, ...props }: IconProps) {
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
      <path d="M5 12l5 5L20 6" />
    </svg>
  )
}
