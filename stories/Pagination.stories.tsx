import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Pagination', component: Pagination,  args: { page: 3, totalPages: 12, href: (page: number) => `#page-${page}` } } satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

