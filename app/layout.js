import './globals.css'

export const metadata = {
  title: 'Mountcares Outdoor Store & Sewa Alat Camping',
  description: 'Penyedia perlengkapan aktivitas luar ruangan terintegrasi di Singosari, Malang.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        {/* Tambahkan baris CDN Font Awesome di sini */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}