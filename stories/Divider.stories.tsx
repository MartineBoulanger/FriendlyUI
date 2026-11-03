import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Divider', component: Divider,  args: { decorative: false } } satisfies Meta<typeof Divider>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

