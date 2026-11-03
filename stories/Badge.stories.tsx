import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../packages/ui/src/index.js';
import { Button } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Badge', component: Badge,  args: { content: 5, children: <Button>Notifications</Button> } } satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Dot: Story = { args: { dot: true, label: "Unread notifications" } };
export const Overflow: Story = { args: { content: 120 } };
