import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Heading', component: Heading, argTypes: { as: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] } }, args: { as: "h2", children: "Build something friendly" } } satisfies Meta<typeof Heading>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

