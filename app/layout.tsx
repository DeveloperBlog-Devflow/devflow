import type { Metadata } from 'next';
import './globals.css';
import ToastProvider from '@/components/common/ToastProvider';

export const metadata: Metadata = {
  title: 'DevFlow',
  description: 'DevFlow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
