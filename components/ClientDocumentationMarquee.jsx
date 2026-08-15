'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

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

function getYoutubeEmbedUrl(url) {
  if (!url) return '';
  const value = String(url).trim();
  
  let videoId = '';
  if (value.includes('/shorts/')) {
    videoId = value.split('/shorts/')[1]?.split('?')[0];
  } else if (value.includes('v=')) {
    videoId = value.split('v=')[1]?.split('&')[0];
  } else if (value.includes('youtu.be/')) {
    videoId = value.split('youtu.be/')[1]?.split('?')[0];
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
}

export default function ClientDocumentationMarquee() {
  const [screenshots, setScreenshots] = useState([]);
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // State baru

  useEffect(() => {
    async function loadDocumentation() {
      const { data, error } = await supabase
        .from('dokumentasi')
        .select('*')
        .ilike('status', '%AKTIF%')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setScreenshots(data.filter(item => item.jenis === 'SCREENSHOT').slice(0, 10));
        setVideos(data.filter(item => item.jenis === 'VIDEO').slice(0, 6));
      }
    }
    loadDocumentation();
  }, []);

  // Logika Auto-Slide setiap 4 detik
  useEffect(() => {
    if (screenshots.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [screenshots.length]);

  if (screenshots.length === 0 && videos.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 border-y border-gray-100 overflow-hidden space-y-12">
      
      {/* BAGIAN 1: SCREENSHOT SLIDER */}
      {screenshots.length > 0 && (
        <div className="space-y-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted">Dokumentasi & Apresiasi Pendaki</h4>
            <h2 className="text-2xl font-extrabold text-foreground mt-1">Cerita Nyata dari Lapangan</h2>
          </div>

          <div className="relative flex justify-center py-4">
            <div className="relative w-72 sm:w-80 h-72 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              {/* Animasi Fade saat ganti slide */}
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                {getDirectDriveUrl(screenshots[currentIndex].link_dokumentasi) && (
                  <div className="relative h-48 w-full rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <img 
                      src={getDirectDriveUrl(screenshots[currentIndex].link_dokumentasi)} 
                      alt={screenshots[currentIndex].atas_nama} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex justify-between items-center text-xs text-muted">
                  <span className="font-semibold text-brand-blue">{screenshots[currentIndex].atas_nama}</span>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Indikator Titik (Opsional) */}
          <div className="flex justify-center gap-2">
            {screenshots.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 w-2 rounded-full transition-all ${currentIndex === idx ? 'bg-brand-blue w-6' : 'bg-gray-300'}`}
              />
            ))}
          </div>

          <div className="text-center mt-2">
            <a href="https://www.instagram.com/mountcares_outdoor/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-brand-blue hover:underline">
              Lihat koleksi lengkap di Instagram →
            </a>
          </div>
        </div>
      )}

      {/* BAGIAN 2: VIDEO YOUTUBE DI BAWAHNYA */}
      {videos.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted">
              Video Kegiatan & Review Alat
            </h3>
            <p className="text-xs text-muted mt-1">
              Saksikan keseruan dan keandalan gear Mountcares langsung dari petualangan pendaki.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((vid) => {
              const embedUrl = getYoutubeEmbedUrl(vid.link_dokumentasi);
              if (!embedUrl) return null;

              return (
                <div key={vid.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                  <div className="relative w-full aspect-video bg-black">
                    <iframe 
                      src={embedUrl} 
                      title={vid.atas_nama || 'Video Dokumentasi Mountcares'}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div className="text-sm font-semibold text-foreground">
                      {vid.atas_nama}
                    </div>
                    <div className="text-xs text-muted mt-2">
                      Sumber: {vid.sumber_dokumentasi}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tombol Lihat Lebih Banyak di YouTube */}
          <div className="text-center mt-8">
            <a 
              href="https://www.youtube.com/@mountcaresoutdoor" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all shadow-lg inline-block"
            >
              Lihat lebih banyak di YouTube
            </a>
          </div>
        </div>
      )}

    </section>
  );
}