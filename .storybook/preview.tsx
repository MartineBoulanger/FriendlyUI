import type { Preview } from '@storybook/react-vite';
import '../packages/ui/src/theme.css';
import '../packages/ui/src/styles.css';
import './preview.css';
const preview: Preview = {
  tags: ['autodocs'],
  parameters: { layout: 'padded', controls: { expanded: true } },
  globalTypes: {
    theme: { description: 'Color theme', toolbar: { icon: 'paintbrush', items: ['light', 'dark'], dynamicTitle: true } },
  },
  initialGlobals: { theme: 'light' },
  decorators: [(Story, context) => {
    document.documentElement.dataset.theme = context.globals.theme;
    return <Story />;
  }],
};
export default preview;
