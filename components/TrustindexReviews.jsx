'use client';
import { useEffect, useRef } from 'react';

export default function TrustindexReviews() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Bersihkan dulu jika sudah ada isinya agar tidak double render
    container.innerHTML = '';

    // Buat elemen div khusus atau biarkan script membacanya di dalam container ini
    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?bb3e73479fbd23512b068ca41b7';
    script.defer = true;
    script.async = true;

    // Masukkan script ke dalam container lokal, bukan ke body global
    container.appendChild(script);
  }, []);

  return (
    <section className="py-12 px-4 bg-gray-50/50 w-full">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-brand-blue">
            Ulasan Terbaru dari Google Maps
          </h3>
          <p className="text-xs text-muted max-w-lg mx-auto">
            Ulasan jujur dari pelanggan langsung yang disinkronkan otomatis secara real-time.
          </p>
        </div>

        {/* Ref kontainer lokal tempat widget akan dipaksa muncul */}
        <div ref={containerRef} className="w-full flex justify-center"></div>
      </div>
    </section>
  );
}