import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from '../packages/ui/src/client.js';
const meta = { title: 'Components/Tabs', component: Tabs,  args: { label: "Account settings", items: [{ value: "profile", label: "Profile", content: "Your profile" }, { value: "security", label: "Security", content: "Security settings" }, { value: "billing", label: "Billing", content: "Billing settings", disabled: true }] } } satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Vertical: Story = { args: { orientation: "vertical" } };
