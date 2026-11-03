import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Checkbox', component: Checkbox,  args: { "aria-label": "Accept terms", defaultChecked: true } } satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

