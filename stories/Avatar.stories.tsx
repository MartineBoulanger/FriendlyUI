import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Avatar', component: Avatar, argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } }, args: { alt: "Alex Morgan", size: "md" } } satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

