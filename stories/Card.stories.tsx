import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Card', component: Card,  args: { children: "A simple surface for your content." } } satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

