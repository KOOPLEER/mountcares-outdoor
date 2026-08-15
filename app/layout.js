import './globals.css'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export const metadata = {
  title: 'Mountcares Outdoor Store & Sewa Alat Camping',
  description:
    'Penyedia perlengkapan aktivitas luar ruangan terintegrasi di Singosari, Malang.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>

      <body>
        <Navbar />

        {children}

        <Footer />

        <FloatingWhatsApp />
      </body>
    </html>
  )
}