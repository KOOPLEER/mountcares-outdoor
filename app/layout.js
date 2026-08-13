import './globals.css'

export const metadata = {
  title: 'Mountcares Outdoor Store & Sewa Alat Camping',
  description: 'Penyedia perlengkapan aktivitas luar ruangan terintegrasi di Singosari, Malang.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen bg-background text-foreground">
        {/* Header global dihapus dari sini karena setiap halaman (seperti landing page) 
            sudah mengatur navigasinya sendiri, atau bisa dikondisikan */}
        {children}
      </body>
    </html>
  )
}