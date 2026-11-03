import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Separator', component: Separator,  args: { decorative: false } } satisfies Meta<typeof Separator>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

