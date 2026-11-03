import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Search', component: Search,  args: { "aria-label": "Search components", placeholder: "Search components" } } satisfies Meta<typeof Search>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

