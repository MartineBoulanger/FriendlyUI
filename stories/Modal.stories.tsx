import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from '../packages/ui/src/client.js';
const meta = { title: 'Components/Modal', component: Modal, argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg', 'full'] } }, args: { title: "Edit profile", description: "Update your public details.", trigger: "Open modal", children: <p>Your profile settings go here.</p>, size: "md" } } satisfies Meta<typeof Modal>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

