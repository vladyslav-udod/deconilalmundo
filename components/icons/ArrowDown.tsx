import type { IconProps } from './types'

export default function ArrowDown(props: IconProps) {
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
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  )
}
