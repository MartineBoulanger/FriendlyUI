import {
  Button,
  CloseButton,
  Pagination,
  type ButtonVariant,
} from "@fwenthehunter/friendly-ui";
import { Toast, type ToastVariant } from "@fwenthehunter/friendly-ui/client";

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
const invalidToastVariant: ToastVariant = { name: "brand" };

import { Avatar, Sidebar, type Size } from "@fwenthehunter/friendly-ui";
import {
  Modal,
  SidebarDrawer,
  type ModalSize,
} from "@fwenthehunter/friendly-ui/client";
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
