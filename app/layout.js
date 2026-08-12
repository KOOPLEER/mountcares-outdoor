import './globals.css'

export const metadata = {
  title: 'MountCares Outdoor',
  description: 'Katalog Persewaan Alat Camping & Outdoor',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}