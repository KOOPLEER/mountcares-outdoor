import './globals.css';

export const metadata = {
  title: 'MountCares Outdoor',
  description: 'Katalog Persewaan Alat Camping & Outdoor',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}