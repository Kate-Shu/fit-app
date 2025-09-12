import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
 size?: number;
 title?: string;
 strokeWidth?: number;
};

export const UserAvatarIcon: React.FC<IconProps> = ({
 size = 26,
 title = "Fitness User",
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
  <circle cx="12" cy="7" r="2.5" />
  <path
   d="M8 8
     C8 5.5, 10 4, 12 4
     C14 4, 16 5.5, 16 8
     C16.2 9.5, 17 10.5, 17.5 11.5
     M8 8
     C7.8 9.5, 7 10.5, 6.5 11.5
     M6.5 11.5
     C7.5 14, 16.5 14, 17.5 11.5"
   strokeWidth={strokeWidth + 0.3}
  />
  <path d="M5 20a7 7 0 0 1 14 0" />
  <line x1="14" y1="16.5" x2="21" y2="16.5" />
  <rect x="13" y="15" width="1.8" height="3" rx="0.3" />
  <rect x="20" y="15" width="1.8" height="3" rx="0.3" />
  <rect x="11.8" y="14.5" width="1.5" height="4" rx="0.2" />
  <rect x="21.2" y="14.5" width="1.5" height="4" rx="0.2" />
 </svg>
);