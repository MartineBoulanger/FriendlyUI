"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { Button } from "./index.js";

export type ModalProps = Omit<
  ComponentPropsWithoutRef<"dialog">,
  "open" | "title" | "onClose" | "onCancel"
> & {
  title: ReactNode;
  description?: ReactNode;
  trigger?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: "sm" | "md" | "lg" | "full";
  closeOnEscape?: boolean;
  closeOnOverlay?: boolean;
  closeLabel?: string;
};
export function Modal({
  title,
  description,
  trigger,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  size = "md",
  closeOnEscape = true,
  closeOnOverlay = true,
  closeLabel = "Close dialog",
  className,
  ...props
}: ModalProps) {
  const [internal, setInternal] = useState(defaultOpen);
  const visible = open ?? internal;
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  const pointerStartedOutside = useRef(false);
  function change(next: boolean) {
    if (open === undefined) setInternal(next);
    onOpenChange?.(next);
  }
  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (visible && !node.open) node.showModal();
    if (!visible && node.open) node.close();
    return () => {
      if (node.open) node.close();
    };
  }, [visible]);
  function outside(event: React.PointerEvent<HTMLDialogElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return (
      event.target === event.currentTarget &&
      (event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom)
    );
  }
  return (
    <>
      {trigger != null && (
        <Button
          aria-haspopup="dialog"
          aria-controls={props.id ?? id}
          aria-expanded={visible}
          onClick={() => change(true)}
        >
          {trigger}
        </Button>
      )}
      <dialog
        {...props}
        ref={dialog}
        id={props.id ?? id}
        aria-labelledby={props["aria-labelledby"] ?? `${id}-title`}
        aria-describedby={
          props["aria-describedby"] ??
          (description ? `${id}-description` : undefined)
        }
        data-size={size}
        className={["fui-modal", className].filter(Boolean).join(" ")}
        onCancel={(event) => {
          event.preventDefault();
          if (closeOnEscape) change(false);
        }}
        onClose={(event) => {
          if (!event.currentTarget.open && visible) change(false);
        }}
        onPointerDown={(event) => {
          props.onPointerDown?.(event);
          pointerStartedOutside.current =
            !event.defaultPrevented && outside(event);
        }}
        onPointerUp={(event) => {
          props.onPointerUp?.(event);
          if (
            !event.defaultPrevented &&
            closeOnOverlay &&
            pointerStartedOutside.current &&
            outside(event)
          )
            change(false);
          pointerStartedOutside.current = false;
        }}
      >
        <header className="fui-modal-header">
          <div>
            <h2 id={`${id}-title`}>{title}</h2>
            {description && <p id={`${id}-description`}>{description}</p>}
          </div>
          <Button
            variant="ghost"
            size="sm"
            aria-label={closeLabel}
            onClick={() => change(false)}
          >
            ×
          </Button>
        </header>
        <div className="fui-modal-content">{children}</div>
      </dialog>
    </>
  );
}

export type TabItem = {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};
export type TabsProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "defaultValue" | "onChange"
> & {
  items: TabItem[];
  label: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
};
export function Tabs({
  items,
  label,
  value,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  className,
  ...props
}: TabsProps) {
  const [internal, setInternal] = useState(defaultValue);
  const selected =
    items.find((item) => item.value === (value ?? internal) && !item.disabled)
      ?.value ?? items.find((item) => !item.disabled)?.value;
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  function select(next: string) {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  }
  return (
    <div
      {...props}
      className={["fui-tabs", className].filter(Boolean).join(" ")}
      data-orientation={orientation}
    >
      <div
        role="tablist"
        aria-label={label}
        aria-orientation={orientation}
        className="fui-tablist"
      >
        {items.map((item, i) => (
          <button
            type="button"
            role="tab"
            key={item.value}
            ref={(node) => {
              buttons.current[i] = node;
            }}
            id={`${id}-tab-${i}`}
            aria-controls={`${id}-panel-${i}`}
            aria-selected={selected === item.value}
            tabIndex={selected === item.value ? 0 : -1}
            disabled={item.disabled}
            onClick={() => select(item.value)}
            onKeyDown={(event) => {
              const enabled = items
                .map((item, i) => (item.disabled ? -1 : i))
                .filter((i) => i >= 0);
              const current = enabled.indexOf(i);
              const rtl =
                getComputedStyle(event.currentTarget).direction === "rtl";
              const nextKey =
                orientation === "vertical"
                  ? "ArrowDown"
                  : rtl
                    ? "ArrowLeft"
                    : "ArrowRight";
              const prevKey =
                orientation === "vertical"
                  ? "ArrowUp"
                  : rtl
                    ? "ArrowRight"
                    : "ArrowLeft";
              let target: number | undefined;
              if (event.key === nextKey)
                target = enabled[(current + 1) % enabled.length];
              if (event.key === prevKey)
                target =
                  enabled[(current - 1 + enabled.length) % enabled.length];
              if (event.key === "Home") target = enabled[0];
              if (event.key === "End") target = enabled[enabled.length - 1];
              if (target !== undefined) {
                event.preventDefault();
                buttons.current[target]?.focus();
                select(items[target].value);
              }
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, i) => (
        <div
          key={item.value}
          role="tabpanel"
          tabIndex={0}
          id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`}
          hidden={selected !== item.value}
          className="fui-tabpanel"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}

export type ToastProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "title" | "children"
> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  children?: ReactNode;
  duration?: number;
  variant?: "default" | "success" | "error";
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  closeLabel?: string;
};
/** Mount once in a client wrapper; update open and content to announce messages. */
export function Toast({
  open,
  onOpenChange,
  title,
  children,
  duration = 5000,
  variant = "default",
  position = "bottom-right",
  closeLabel = "Dismiss notification",
  className,
  ...props
}: ToastProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const callback = useRef(onOpenChange);
  const remaining = useRef(duration);
  const wasOpen = useRef(false);
  const lastDuration = useRef(duration);
  useEffect(() => {
    callback.current = onOpenChange;
  }, [onOpenChange]);
  useEffect(() => {
    if ((open && !wasOpen.current) || duration !== lastDuration.current)
      remaining.current = duration;
    lastDuration.current = duration;
    if (!open) {
      setHovered(false);
      setFocused(false);
    }
    wasOpen.current = open;
  }, [open, duration]);
  useEffect(() => {
    if (
      !open ||
      hovered ||
      focused ||
      !Number.isFinite(duration) ||
      duration <= 0
    )
      return;
    const started = Date.now();
    const timer = setTimeout(
      () => callback.current(false),
      Math.max(0, remaining.current),
    );
    return () => {
      clearTimeout(timer);
      remaining.current = Math.max(
        0,
        remaining.current - (Date.now() - started),
      );
    };
  }, [open, hovered, focused, duration]);
  return (
    <div
      {...props}
      className={["fui-toast-region", className].filter(Boolean).join(" ")}
      data-position={position}
    >
      <div role={variant === "error" ? "alert" : "status"} aria-atomic="true">
        {open && (
          <div
            className="fui-toast"
            data-variant={variant}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onFocusCapture={() => setFocused(true)}
            onBlurCapture={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node | null,
                )
              )
                setFocused(false);
            }}
          >
            <div>
              <div className="fui-toast-title">{title}</div>
              {children && (
                <div className="fui-toast-description">{children}</div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              aria-label={closeLabel}
              onClick={() => {
                setHovered(false);
                setFocused(false);
                onOpenChange(false);
              }}
            >
              ×
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
