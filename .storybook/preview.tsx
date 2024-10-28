import { MantineProvider } from '@mantine/core';
import type { Preview } from '@storybook/react';
import '@mantine/core/styles.css';
import React from 'react';
import customTheme from '../src/theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
    <MantineProvider theme={customTheme}>
         <Story />
      </MantineProvider>
    ),
  ],
};

export default preview;
