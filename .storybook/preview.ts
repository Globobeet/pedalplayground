import type { Preview } from '@storybook/nextjs';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    backgrounds: { default: 'dark' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
