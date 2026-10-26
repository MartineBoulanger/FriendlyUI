import {
  Button,
  CloseButton,
  Pagination,
  type ButtonVariant,
} from "@friendly-ui/react";
import { Toast, type ToastVariant } from "@friendly-ui/react/client";

const customButton: ButtonVariant = "danger";
const customToast: ToastVariant = "brand";
<Button variant={customButton}>Delete</Button>;
<CloseButton variant="custom-close" />;
<Toast open onOpenChange={() => {}} title="Welcome" variant={customToast} />;
<Pagination
  page={1}
  totalPages={3}
  href={(page) => `?page=${page}`}
  nextLabel={<span>Next →</span>}
  previousLabel="Vorige"
/>;
// @ts-expect-error Variant names must still be strings.
<Button variant={42} />;
// @ts-expect-error Variant names must still be strings.
<Toast
  open
  onOpenChange={() => {}}
  title="Invalid"
  variant={{ name: "brand" }}
/>;

import { Avatar, Sidebar, type Size } from "@friendly-ui/react";
import {
  Modal,
  SidebarDrawer,
  type ModalSize,
} from "@friendly-ui/react/client";
const extraSize: Size = "xl";
const extraModalSize: ModalSize = "wide";
<Button size={extraSize} />;
<CloseButton size="xl" />;
<Avatar alt="Ada Lovelace" size="xl" />;
<Sidebar size="wide" />;
<Modal title="Details" size={extraModalSize} />;
<SidebarDrawer title="Navigation" size="wide" />;
// @ts-expect-error Size names must be strings.
<Avatar alt="Ada" size={42} />;
// @ts-expect-error Modal size names must be strings.
<Modal title="Details" size={42} />;
