import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';
import NotificationManager from '@/components/NotificationMagager';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        <NavBar />
        <main className="mx-auto p-4">{children}</main>
        <NotificationManager />
      </body>
    </html>
  );
}