import React from "react"

export type ISVGProps = {
  strokeColor?: string
  className?: string
}

const CrevronRightSVG: React.FC<ISVGProps> = props => {
  const { strokeColor, className } = props
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke={strokeColor || "#1E1E20"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default CrevronRightSVG
