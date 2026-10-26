import type { ComponentPropsWithRef } from "react";
import type { ExtensibleVariant } from "./types.js";
export type { ExtensibleVariant } from "./types.js";

export type ButtonVariant = ExtensibleVariant<"primary" | "secondary" | "ghost">;

function cx(...values: (string | undefined)[]) {
  return values.filter(Boolean).join(" ");
}

type ButtonProps = ComponentPropsWithRef<"button"> & {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
};
export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      data-variant={variant}
      data-size={size}
      className={cx("fui-button", className)}
    />
  );
}

export type CloseButtonProps = Omit<ButtonProps, "children"> & {
  label?: string;
};
/** Shared, theme-colored dismiss control with a 44px touch target. */
export function CloseButton({
  label = "Close",
  className,
  ...props
}: CloseButtonProps) {
  return (
    <Button
      variant="ghost"
      {...props}
      aria-label={props["aria-label"] ?? label}
      className={cx("fui-close-button", className)}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="m6 6 12 12M18 6 6 18" />
      </svg>
    </Button>
  );
}

export function Card({ className, ...props }: ComponentPropsWithRef<"div">) {
  return <div {...props} className={cx("fui-card", className)} />;
}

export function Input({ className, ...props }: ComponentPropsWithRef<"input">) {
  return <input {...props} className={cx("fui-input", className)} />;
}

export function Textarea({
  className,
  ...props
}: ComponentPropsWithRef<"textarea">) {
  return (
    <textarea {...props} className={cx("fui-input fui-textarea", className)} />
  );
}

export function Label({ className, ...props }: ComponentPropsWithRef<"label">) {
  return <label {...props} className={cx("fui-label", className)} />;
}

export function Chip({ className, ...props }: ComponentPropsWithRef<"span">) {
  return <span {...props} className={cx("fui-chip", className)} />;
}

export type BadgeProps = Omit<ComponentPropsWithRef<"span">, "content"> & {
  content?: number | string;
  dot?: boolean;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  max?: number;
  showZero?: boolean;
  label?: string;
};
/** Wrap an avatar or control; the marker is an indicator, not a second control. */
export function Badge({
  children,
  content,
  dot = false,
  position = "top-right",
  max = 99,
  showZero = false,
  label,
  className,
  ...props
}: BadgeProps) {
  const visible =
    dot ||
    (content !== undefined && content !== "" && (content !== 0 || showZero));
  const limit = Number.isFinite(max) ? Math.max(0, Math.floor(max)) : 99;
  const text =
    typeof content === "number" && content > limit ? `${limit}+` : content;
  const accessibleLabel =
    label ?? (typeof content === "number" ? String(content) : undefined);
  return (
    <span
      {...props}
      className={cx("fui-badge", className)}
      data-position={position}
    >
      {children}
      {visible && (
        <span
          className="fui-badge-indicator"
          data-dot={dot || undefined}
          role={accessibleLabel ? "img" : undefined}
          aria-label={accessibleLabel}
          aria-hidden={dot && !accessibleLabel ? true : undefined}
        >
          {!dot && text}
        </span>
      )}
    </span>
  );
}

type AccordionProps = Omit<ComponentPropsWithRef<"details">, "title"> & {
  title: React.ReactNode;
};
/** Native details/summary provides disclosure behavior without client JavaScript. */
export function Accordion({
  title,
  children,
  className,
  ...props
}: AccordionProps) {
  return (
    <details {...props} className={cx("fui-accordion", className)}>
      <summary>{title}</summary>
      <div className="fui-accordion-content">{children}</div>
    </details>
  );
}

export type { ButtonProps, AccordionProps };

export {
  Checkbox,
  Radio,
  Switch,
  Select,
  Dropdown,
  Heading,
  Separator,
  Divider,
  Sidebar,
  Search,
  Avatar,
  Pagination,
  Table,
  TableContainer,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./primitives.js";
export type {
  HeadingProps,
  SeparatorProps,
  SidebarProps,
  SearchProps,
  AvatarProps,
  PaginationProps,
} from "./primitives.js";
