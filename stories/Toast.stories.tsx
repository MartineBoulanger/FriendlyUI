import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from '../packages/ui/src/client.js';
import { Button } from '../packages/ui/src/index.js';
const meta = {
  title: 'Components/Toast', component: Toast,
  argTypes: { variant: { control: 'select', options: ['default', 'success', 'error', 'warning', 'info'] } },
  args: { title: 'Changes saved', children: 'Your profile has been updated.', duration: 5000, variant: 'success', showTimer: true, open: false, onOpenChange: () => {} },
  render: function Example(args) {
    const [open, setOpen] = useState(false);
    return <><Button onClick={() => setOpen(true)}>Show notification</Button><Toast {...args} open={open} onOpenChange={setOpen} /></>;
  },
} satisfies Meta<typeof Toast>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
