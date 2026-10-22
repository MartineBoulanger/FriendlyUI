import type { ComponentPropsWithRef } from "react";

function cx(...values: (string | undefined)[]) {
  return values.filter(Boolean).join(" ");
}

type ButtonProps = ComponentPropsWithRef<"button"> & {
  variant?: "primary" | "secondary" | "ghost";
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

export function Badge({ className, ...props }: ComponentPropsWithRef<"span">) {
  return <span {...props} className={cx("fui-badge", className)} />;
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
