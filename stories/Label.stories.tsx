import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '../packages/ui/src/index.js';
const meta = { title: 'Components/Label', component: Label,  args: { children: "Email address", htmlFor: "email" } } satisfies Meta<typeof Label>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

