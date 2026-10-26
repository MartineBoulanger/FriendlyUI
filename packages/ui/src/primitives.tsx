import type { ComponentPropsWithRef, ReactNode } from "react";

function cx(...values: (string | undefined)[]) {
  return values.filter(Boolean).join(" ");
}

type CheckProps = Omit<ComponentPropsWithRef<"input">, "type">;
export function Checkbox({ className, ...props }: CheckProps) {
  return (
    <input
      {...props}
      type="checkbox"
      className={cx("fui-checkbox", className)}
    />
  );
}
export function Radio({ className, ...props }: CheckProps) {
  return (
    <input {...props} type="radio" className={cx("fui-radio", className)} />
  );
}
/** A native checkbox with switch semantics. Participates in forms without hydration. */
export function Switch({ className, ...props }: CheckProps) {
  return (
    <input
      {...props}
      type="checkbox"
      role="switch"
      className={cx("fui-switch", className)}
    />
  );
}
export function Select({
  className,
  ...props
}: ComponentPropsWithRef<"select">) {
  return (
    <select {...props} className={cx("fui-input fui-select", className)} />
  );
}
/** Dropdown is a native select, not an action menu. */
export const Dropdown = Select;

export type HeadingProps = ComponentPropsWithRef<"h1"> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
};
export function Heading({ as: Tag = "h1", className, ...props }: HeadingProps) {
  return <Tag {...props} className={cx("fui-heading", className)} />;
}
export type SeparatorProps = ComponentPropsWithRef<"div"> & {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
};
export function Separator({
  orientation = "horizontal",
  decorative = true,
  className,
  ...props
}: SeparatorProps) {
  return (
    <div
      {...props}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      data-orientation={orientation}
      className={cx("fui-separator", className)}
    />
  );
}
export const Divider = Separator;

export type SidebarProps = ComponentPropsWithRef<"aside"> & {
  side?: "left" | "right";
  size?: "sm" | "md" | "lg";
};
/** An in-flow layout region. Use Modal for an overlaid, dismissible mobile drawer. */
export function Sidebar({
  side = "left",
  size = "md",
  className,
  ...props
}: SidebarProps) {
  return (
    <aside
      {...props}
      data-side={side}
      data-size={size}
      className={cx("fui-sidebar", className)}
    />
  );
}

export type SearchProps = Omit<ComponentPropsWithRef<"input">, "type">;
/** Pair with a visible Label or an accessible name; wrap in a form to submit. */
export function Search({ className, ...props }: SearchProps) {
  return (
    <input
      {...props}
      type="search"
      className={cx("fui-input fui-search", className)}
    />
  );
}

export type AvatarProps = Omit<ComponentPropsWithRef<"span">, "children"> & {
  src?: string;
  alt: string;
  fallback?: ReactNode;
  size?: "sm" | "md" | "lg";
  imageProps?: Omit<ComponentPropsWithRef<"img">, "src" | "alt" | "children">;
};
export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  className,
  imageProps,
  ...props
}: AvatarProps) {
  return (
    <span
      {...props}
      role={!src && alt ? "img" : undefined}
      aria-label={!src && alt ? alt : undefined}
      aria-hidden={!alt ? true : undefined}
      data-size={size}
      className={cx("fui-avatar", className)}
    >
      {src ? (
        <img {...imageProps} src={src} alt={alt} />
      ) : (
        <span aria-hidden="true">
          {fallback ??
            alt
              .trim()
              .split(/\s+/)
              .slice(0, 2)
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
        </span>
      )}
    </span>
  );
}

export type PaginationProps = Omit<ComponentPropsWithRef<"nav">, "children"> & {
  page: number;
  totalPages: number;
  href: (page: number) => string;
  siblingCount?: number;
  nextLabel?: ReactNode;
  previousLabel?: ReactNode;
};
/** Work is bounded even for very large page counts. */
export function Pagination({
  page,
  totalPages,
  href,
  siblingCount = 1,
  nextLabel = "Next",
  previousLabel = "Previous",
  className,
  ...props
}: PaginationProps) {
  if (
    !Number.isSafeInteger(totalPages) ||
    totalPages < 1 ||
    !Number.isSafeInteger(page) ||
    page < 1 ||
    page > totalPages
  ) {
    throw new RangeError(
      "Pagination requires totalPages >= 1 and page between 1 and totalPages.",
    );
  }
  const siblings = Number.isFinite(siblingCount)
    ? Math.min(5, Math.max(0, Math.floor(siblingCount)))
    : 1;
  const pages = [
    ...new Set([
      1,
      ...Array.from(
        { length: siblings * 2 + 1 },
        (_, i) => page - siblings + i,
      ).filter((n) => n > 0 && n <= totalPages),
      totalPages,
    ]),
  ].sort((a, b) => a - b);
  return (
    <nav
      aria-label="Pagination"
      {...props}
      className={cx("fui-pagination", className)}
    >
      <ul>
        <li>
          {page > 1 ? (
            <a href={href(page - 1)} rel="prev">
              {previousLabel}
            </a>
          ) : (
            <span aria-disabled="true">{previousLabel}</span>
          )}
        </li>
        {pages.map((n, i) => (
          <li key={n}>
            {i > 0 && n - pages[i - 1] > 1 && (
              <span className="fui-pagination-gap" aria-hidden="true">
                …
              </span>
            )}
            <a
              href={href(n)}
              aria-label={`Page ${n}`}
              aria-current={n === page ? "page" : undefined}
            >
              {n}
            </a>
          </li>
        ))}
        <li>
          {page < totalPages ? (
            <a href={href(page + 1)} rel="next">
              {nextLabel}
            </a>
          ) : (
            <span aria-disabled="true">{nextLabel}</span>
          )}
        </li>
      </ul>
    </nav>
  );
}

export function Table({ className, ...props }: ComponentPropsWithRef<"table">) {
  return <table {...props} className={cx("fui-table", className)} />;
}
export function TableContainer({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return <div {...props} className={cx("fui-table-container", className)} />;
}
export function TableHeader(props: ComponentPropsWithRef<"thead">) {
  return <thead {...props} />;
}
export function TableBody(props: ComponentPropsWithRef<"tbody">) {
  return <tbody {...props} />;
}
export function TableFooter(props: ComponentPropsWithRef<"tfoot">) {
  return <tfoot {...props} />;
}
export function TableRow(props: ComponentPropsWithRef<"tr">) {
  return <tr {...props} />;
}
export function TableHead({
  scope = "col",
  ...props
}: ComponentPropsWithRef<"th">) {
  return <th {...props} scope={scope} />;
}
export function TableCell(props: ComponentPropsWithRef<"td">) {
  return <td {...props} />;
}
export function TableCaption(props: ComponentPropsWithRef<"caption">) {
  return <caption {...props} />;
}
