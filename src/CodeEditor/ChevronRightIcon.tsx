import React from "react";

export const ChevronRightIcon = ({
  size = "24px",
  color = "currentColor",
  className,
}: {
  size?: string;
  color?: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0" />

        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M9 6L15 12L9 18"
            stroke={color}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />{" "}
        </g>
      </svg>
    </div>
  );
};
