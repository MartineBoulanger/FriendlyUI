import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Switch', component: Switch,  args: { "aria-label": "Enable notifications", defaultChecked: true } } satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

