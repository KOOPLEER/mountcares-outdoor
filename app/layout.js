import './globals.css'
import Link from 'next/link'

export const metadata = {
  // Tambahkan metadataBase di sini agar Next.js tahu domain dasarnya
  metadataBase: new URL('https://mountcares.com'), // Ganti dengan domain asli Anda atau gunakan localhost untuk dev

  title: 'MOUNTCARES Outdoor | One Stop Camping Solution',

  description:
    'MOUNTCARES Outdoor menyediakan perlengkapan camping dan outdoor untuk rental, sewa, retail, dan kebutuhan petualangan di Malang.',

  keywords: [
    'Mountcares Outdoor',
    'sewa alat camping Malang',
    'rental alat camping Malang',
    'perlengkapan camping Malang',
    'alat outdoor Malang',
    'sewa tenda Malang',
    'camping gear Malang',
  ],

  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },

  openGraph: {
    title: 'MOUNTCARES Outdoor | One Stop Camping Solution',
    description: 'Rental, sewa, dan perlengkapan camping & outdoor untuk kebutuhan petualangan Anda.',
    siteName: 'MOUNTCARES Outdoor',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        // Pastikan path ini sesuai dengan folder public Anda
        url: '/Logo/mountcares-horizontal.png', 
        width: 1200,
        height: 630,
        alt: 'MOUNTCARES Outdoor - One Stop Camping Solution',
      },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}