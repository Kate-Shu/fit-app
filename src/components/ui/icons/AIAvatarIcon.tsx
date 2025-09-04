import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
 size?: number;
 title?: string;
 strokeWidth?: number;
};

export const AIAvatarIcon: React.FC<IconProps> = ({
 size = 24,
 title = "AI (Chip)",
 strokeWidth = 1.8,
 ...props
}) => (
 <svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  role="img"
  aria-label={title}
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  stroke="currentColor"
  strokeWidth={strokeWidth}
  strokeLinecap="round"
  strokeLinejoin="round"
  {...props}
 >
  {/* Chip body */}
  <rect x="6" y="6" width="12" height="12" rx="2" />
  {/* Pins */}
  <path d="M9 3v3M12 3v3M15 3v3M9 21v-3M12 21v-3M15 21v-3M3 9h3M3 12h3M3 15h3M21 9h-3M21 12h-3M21 15h-3" />
  {/* AI core / neural node */}
  <circle cx="12" cy="12" r="2.3" />
  <path d="M12 9.7v-1.2M12 15.5v-1.2M9.7 12H8.5M15.5 12h-1.2" />
 </svg>
);