import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Radio', component: Radio,  args: { "aria-label": "Standard delivery", name: "delivery", value: "standard" } } satisfies Meta<typeof Radio>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

