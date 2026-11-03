import type { Meta, StoryObj } from '@storybook/react-vite';
import { CloseButton } from '../packages/ui/src/index.js';
const meta = { title: 'Components/CloseButton', component: CloseButton,  args: { label: "Close" } } satisfies Meta<typeof CloseButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

