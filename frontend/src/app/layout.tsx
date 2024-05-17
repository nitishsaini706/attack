// src/app/layout.tsx
import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <html>
    <body>
      {children}

    </body>
      </html>
    </ThemeProvider>
  );
}
