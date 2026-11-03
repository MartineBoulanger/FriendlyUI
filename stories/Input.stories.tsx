import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Input', component: Input,  args: { "aria-label": "Your name", placeholder: "Your name" } } satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
