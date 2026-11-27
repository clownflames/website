import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const paths: Record<string, ReactNode> = {
  "arrow-right": <><path d="M4 12h16" /><path d="m14 6 6 6-6 6" /></>,
  "arrow-up-right": <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>,
  "arrow-down": <><path d="M12 4v16" /><path d="m6 14 6 6 6-6" /></>,
  check: <path d="m4 12.5 5 5L20 6.5" />,
  sparkle: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="m6.3 6.3 2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8" /></>,
  code: <><path d="m8 7-5 5 5 5" /><path d="m16 7 5 5-5 5" /><path d="m13.5 4-3 16" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  chat: <><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.9 9.9 0 0 1-4-.8L3 21l1.9-4.9A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4Z" /><path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" /></>,
  video: <><rect x="2.5" y="6" width="13" height="12" rx="2.5" /><path d="m15.5 11 5-3v8l-5-3" /></>,
  palette: <><path d="M12 3a9 9 0 1 0 0 18c1.4 0 2.2-.9 2.2-2 0-.6-.2-1-.6-1.4-.4-.4-.6-.8-.6-1.4 0-1.1.9-2 2-2h2.3A4.7 4.7 0 0 0 22 9.5C22 5.9 17.5 3 12 3Z" /><circle cx="7.5" cy="10.5" r="1" /><circle cx="10" cy="7" r="1" /><circle cx="14.5" cy="7.2" r="1" /><circle cx="17" cy="10" r="1" /></>,
  search: <><circle cx="11" cy="11" r="7.5" /><path d="m20.5 20.5-4.2-4.2" /></>,
  database: <><ellipse cx="12" cy="5.5" rx="8" ry="3" /><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>,
  cart: <><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2.5 3.5h2.8l2.3 11.2h11l2.1-8.2H6" /></>,
  cloud: <path d="M17.5 19H7a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4.75 4.75 0 0 1-.5 9.5Z" />,
  star: <path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1.1 6.3L12 17.5 6.4 20.4l1.1-6.3L3 9.7l6.2-.9L12 3Z" />,
  quote: <><path d="M9 6c-3 1.4-4.5 3.9-4.5 7.5V18h5v-5H6.2c.1-2 1-3.4 2.8-4.2V6Z" /><path d="M19 6c-3 1.4-4.5 3.9-4.5 7.5V18h5v-5h-3.3c.1-2 1-3.4 2.8-4.2V6Z" /></>,
  menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
  close: <><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" /></>,
  phone: <path d="M7 3.5H4.6A1.6 1.6 0 0 0 3 5.2C3 14 10 21 18.8 21a1.6 1.6 0 0 0 1.7-1.6V17l-4-1.5-1.6 2a14.3 14.3 0 0 1-5.9-5.9l2-1.6L9.5 6 7 3.5Z" />,
  "map-pin": <><path d="M20 10.5c0 5.5-8 11-8 11s-8-5.5-8-11a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10.5" r="2.8" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3 2" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2.5" /><path d="M8 3v4M16 3v4M3 10h18" /></>,
  users: <><path d="M16 20v-1.6a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20" /><circle cx="9" cy="7.5" r="3.5" /><path d="M22 20v-1.6a4 4 0 0 0-3-3.87" /><path d="M16.5 4.1a3.5 3.5 0 0 1 0 6.8" /></>,
  briefcase: <><rect x="2.5" y="7" width="19" height="13" rx="2.5" /><path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7" /><path d="M2.5 12.5h19" /></>,
  dashboard: <><rect x="3" y="3" width="7.5" height="8.5" rx="1.5" /><rect x="13.5" y="3" width="7.5" height="5.5" rx="1.5" /><rect x="3" y="14.5" width="7.5" height="6.5" rx="1.5" /><rect x="13.5" y="11.5" width="7.5" height="9.5" rx="1.5" /></>,
  logout: <><path d="M9 21H5.5A1.5 1.5 0 0 1 4 19.5v-15A1.5 1.5 0 0 1 5.5 3H9" /><path d="M16 16.5 20.5 12 16 7.5" /><path d="M20 12H9" /></>,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  trash: <><path d="M3.5 6.5h17" /><path d="M8.5 6.5V4h7v2.5" /><path d="M6 6.5 7 21h10l1-14.5" /><path d="M10 10.5v6M14 10.5v6" /></>,
  external: <><path d="M14 3h7v7" /><path d="m10 14 10.5-10.5" /><path d="M20 13v6.5A1.5 1.5 0 0 1 18.5 21h-13A1.5 1.5 0 0 1 4 19.5v-13A1.5 1.5 0 0 1 5.5 5H12" /></>,
  shield: <><path d="m12 3 8 3v5.5c0 5-3.4 8.3-8 9.5-4.6-1.2-8-4.5-8-9.5V6l8-3Z" /><path d="m8.8 12 2.2 2.2 4.2-4.4" /></>,
  building: <><path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4H14v17" /><path d="M14 9h4.5A1.5 1.5 0 0 1 20 10.5V21" /><path d="M2.5 21h19" /><path d="M8 8h2M8 12h2M8 16h2" /></>,
  chart: <><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 5-6" /></>,
  zap: <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />,
  play: <path d="M8 5.5v13l11-6.5-11-6.5Z" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 16.5 9 5 9-5" /></>,
  rocket: <><path d="M5 15c-1.5 1.5-2 6-2 6s4.5-.5 6-2" /><path d="M9 15 4.5 10.5C8 3 14.5 2.5 20 3c.5 5.5 0 12-7.5 15.5L9 15Z" /><circle cx="14.5" cy="9.5" r="1.6" /></>,
  eye: <><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  edit: <><path d="m14.5 5.5 4 4" /><path d="M4 20h4l11.3-11.3a2.8 2.8 0 0 0-4-4L4 16v4Z" /></>,
  filter: <path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z" />,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2.5" /><path d="M8 10V7.5a4 4 0 0 1 8 0V10" /><path d="M12 14.5v2.5" /></>,
  "file-text": <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h6" /></>,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chart-pie": <><path d="M21 12A9 9 0 1 1 12 3v9h9Z" /><path d="M21 8.5A9 9 0 0 0 15.5 3V8.5H21Z" /></>,
  "external-link": <><path d="M14 3h7v7" /><path d="m10 14 10.5-10.5" /><path d="M20 13v6.5A1.5 1.5 0 0 1 18.5 21h-13A1.5 1.5 0 0 1 4 19.5v-13A1.5 1.5 0 0 1 5.5 5H12" /></>,
  linkedin: <><path d="M6.5 9.5V20" /><circle cx="6.5" cy="5.5" r="2.2" /><path d="M11.5 20V9.5" /><path d="M11.5 13.5c0-2.3 1.7-4 4-4s4 1.7 4 4V20" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1.2" fill="currentColor" stroke="none" /></>,
  youtube: <><rect x="2.5" y="6" width="19" height="12" rx="3.5" /><path d="m10.5 9.5 5 2.5-5 2.5v-5Z" /></>,
  "x-social": <><path d="M4 4l7.2 9.4L4.5 20" /><path d="M20 4l-7.2 9.4L19.5 20" /><path d="M4 4h4l12 16h-4L4 4Z" /></>,
};

export function Icon({ name, size = 20, className, ...rest }: IconProps & { name: string }) {
  const content = paths[name] ?? paths["arrow-right"];
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.7}
      viewBox="0 0 24 24"
      width={size}
      {...rest}
    >
      {content}
    </svg>
  );
}

export function StarRating({ rating = 5, size = 14, className }: { rating?: number; size?: number; className?: string }) {
  return (
    <span className={className ?? "inline-flex items-center gap-0.5 text-ink"}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          fill={index < rating ? "currentColor" : "none"}
          height={size}
          key={index}
          stroke="currentColor"
          strokeWidth={1.4}
          viewBox="0 0 24 24"
          width={size}
        >
          <path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1.1 6.3L12 17.5 6.4 20.4l1.1-6.3L3 9.7l6.2-.9L12 3Z" />
        </svg>
      ))}
    </span>
  );
}
