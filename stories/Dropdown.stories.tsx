import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Dropdown', component: Dropdown,  args: { "aria-label": "Choose a plan", children: <><option>Personal</option><option>Team</option></> } } satisfies Meta<typeof Dropdown>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

