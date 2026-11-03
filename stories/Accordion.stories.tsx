import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Accordion', component: Accordion,  args: { title: "What is Friendly UI?", children: "Small, server-first React components." } } satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Open: Story = { args: { open: true } };
