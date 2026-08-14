'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion'; // Tambahkan ini

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

        {/* Marquee Wrapper */}
        <div className="relative flex overflow-hidden">
          <motion.div 
            className="flex gap-16 sm:gap-24 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 25, // Kecepatan gerak (semakin besar angkanya, semakin lambat)
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {/* Duplikasi list agar loop terlihat seamless */}
            {[...clients, ...clients].map((client, index) => {
              const logoUrl = getDirectDriveUrl(client.link_logo);
              return (
                <div key={`${client.id}-${index}`} className="flex-shrink-0">
                  {logoUrl && (
                    <img 
                      src={logoUrl} 
                      alt={client.atas_nama || client.kode_klien} 
                      className="h-16 sm:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}