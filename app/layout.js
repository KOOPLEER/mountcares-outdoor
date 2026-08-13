import './globals.css'
import Link from 'next/link' // Jangan lupa pastikan Link diimport jika digunakan di layout (atau biarkan jika ini bagian file page.js Anda)

export const metadata = {
  // Menggunakan URL lokal atau environment variable untuk menghindari warning metadataBase
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),

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
    description:
      'Rental, sewa, dan perlengkapan camping & outdoor untuk kebutuhan petualangan Anda.',
    siteName: 'MOUNTCARES Outdoor',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        // 1. Untuk OpenGraph (Media Sosial), gunakan file statis di folder public
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
        {/* 
          2. Untuk Tampilan Website (UI), Anda bebas menggunakan Google Drive 
             menggunakan struktur Link & img dengan onError yang sudah Anda buat:
        */}
        {children}
      </body>
    </html>
  )
}