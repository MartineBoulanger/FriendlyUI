import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer } from '../packages/ui/src/client.js';
const meta = { title: 'Components/Drawer', component: Drawer, argTypes: { side: { control: 'select', options: ['left', 'right'] } }, args: { title: "Navigation", trigger: "Open drawer", children: <p>Explore your workspace.</p>, side: "left" } } satisfies Meta<typeof Drawer>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

