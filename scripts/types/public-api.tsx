import { Button, CloseButton, Pagination, type ButtonVariant } from '@friendly-ui/react';
import { Toast, type ToastVariant } from '@friendly-ui/react/client';

const customButton: ButtonVariant = 'danger';
const customToast: ToastVariant = 'brand';
<Button variant={customButton}>Delete</Button>;
<CloseButton variant="custom-close" />;
<Toast open onOpenChange={() => {}} title="Welcome" variant={customToast} />;
<Pagination page={1} totalPages={3} href={page => `?page=${page}`} nextLabel={<span>Next →</span>} previousLabel="Vorige" />;
// @ts-expect-error Variant names must still be strings.
<Button variant={42} />;
// @ts-expect-error Variant names must still be strings.
<Toast open onOpenChange={() => {}} title="Invalid" variant={{name:'brand'}} />;
