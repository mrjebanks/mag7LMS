import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Last Man Standing',
  description: 'Premier League Last Man Standing Competition',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="main-container">{children}</main>
      </body>
    </html>
  );
}