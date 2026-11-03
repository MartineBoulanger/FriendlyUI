import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from '../packages/ui/src/client.js';
import { Button } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Tooltip', component: Tooltip, argTypes: { side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] } }, args: { content: "Save your changes", children: <Button>Hover or focus me</Button>, side: "bottom" } } satisfies Meta<typeof Tooltip>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

