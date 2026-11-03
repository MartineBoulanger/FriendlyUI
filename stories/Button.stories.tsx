import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Button', component: Button, argTypes: { variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] }, size: { control: 'select', options: ['sm', 'md', 'lg'] } }, args: { children: "Save changes", variant: "primary", size: "md" } } satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Disabled: Story = { args: { disabled: true } };
