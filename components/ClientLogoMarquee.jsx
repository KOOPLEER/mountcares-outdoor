'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// Menggunakan weserv.nl sebagai proxy agar bypass CORS & proteksi Google
function getDirectDriveUrl(url) {
  if (!url) return '';
  const value = String(url).trim();
  const match = value.match(/\/d\/([a-zA-Z0-9_-]+)/) || value.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  
  if (match && match[1]) {
    const directDrive = `https://drive.google.com/uc?export=view&id=${match[1]}`;
    return `https://images.weserv.nl/?url=${encodeURIComponent(directDrive)}`;
  }
  return value;
}

export default function ClientLogoMarquee() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function loadClients() {
      const { data, error } = await supabase
        .from('client_partners')
        .select('*')
        .ilike('status', '%aktif%');

      if (!error && data) {
        setClients(data);
      }
    }

    loadClients();
  }, []);

  if (clients.length === 0) return null;

  return (
    <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h4 className="text-xs font-bold uppercase tracking-widest text-muted">
          Telah Dipercaya Oleh Berbagai Komunitas & Instansi
        </h4>

        <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-16 opacity-95">
          {clients.map((client) => {
            const logoUrl = getDirectDriveUrl(client.link_logo);

            return (
              <div 
                key={client.id} 
                className="flex items-center justify-center transition-transform hover:scale-105 duration-200"
              >
                {logoUrl && (
                  <img 
                    src={logoUrl} 
                    alt={client.atas_nama || client.kode_klien} 
                    className="h-16 sm:h-20 w-auto object-contain"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}