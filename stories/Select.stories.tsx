import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Select', component: Select,  args: { "aria-label": "Choose a plan", children: <><option>Personal</option><option>Team</option></> } } satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

