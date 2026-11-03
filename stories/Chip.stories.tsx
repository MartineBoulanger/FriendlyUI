import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Chip', component: Chip, argTypes: { variant: { control: 'select', options: ['neutral', 'info', 'success', 'warning', 'error'] } }, args: { children: "Ready", variant: "success" } } satisfies Meta<typeof Chip>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

