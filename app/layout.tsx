import { ThemeProvider } from 'next-themes';
import { Geist } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';

import './globals.css';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata = {
  metadataBase: new URL(
    (() => {
      let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ??
        process?.env?.NEXT_PUBLIC_VERCEL_URL ??
        'http://localhost:3000/';
      url = url.startsWith('http') ? url : `https://${url}`;
      url = url.endsWith('/') ? url : `${url}/`;
      return url;
    })()
  ),
  title: 'Acme. Inc',
  description: 'Next.js + Supabase + shadcn/ui tempplate',
};

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={geistSans.className} suppressHydrationWarning>
      <body className='bg-background text-foreground'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster className='dark' />
        </ThemeProvider>
      </body>
    </html>
  );
}
