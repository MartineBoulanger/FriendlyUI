import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Textarea', component: Textarea,  args: { "aria-label": "Message", placeholder: "Write a message", rows: 4 } } satisfies Meta<typeof Textarea>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

