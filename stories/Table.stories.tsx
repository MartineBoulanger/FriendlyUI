import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, TableContainer, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from '../packages/ui/src/index.js';
const meta = {
  title: 'Components/Table', component: Table,
  subcomponents: { TableContainer, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption },
  render: (args) => <TableContainer><Table {...args}><TableCaption>Team members</TableCaption><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Role</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Alex Morgan</TableCell><TableCell>Designer</TableCell></TableRow><TableRow><TableCell>Sam Chen</TableCell><TableCell>Developer</TableCell></TableRow></TableBody><TableFooter><TableRow><TableCell colSpan={2}>2 members</TableCell></TableRow></TableFooter></Table></TableContainer>,
} satisfies Meta<typeof Table>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
