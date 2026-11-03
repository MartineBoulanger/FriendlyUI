import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Sidebar', component: Sidebar,  args: { children: <nav aria-label="Example navigation"><a href="#overview">Overview</a></nav>, size: "md" } } satisfies Meta<typeof Sidebar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

