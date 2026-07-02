import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'The Ever House — Pure Vegetarian All Day Bistro',
  description: 'A 100% vegetarian, alcohol-free all-day bistro in Thaltej, Ahmedabad. Good food and great mocktails, any hour of the day.',
  openGraph: {
    title: 'The Ever House',
    description: 'Pure Vegetarian All Day Bistro in Ahmedabad',
    url: 'https://theeverhouse.com',
    siteName: 'The Ever House',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1800&q=80',
        width: 1800,
        height: 1200,
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-inter antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
