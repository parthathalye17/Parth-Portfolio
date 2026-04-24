import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Parth Athalye',
  description: 'AI Engineer · Full Stack Developer based in Sydney, AU.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
