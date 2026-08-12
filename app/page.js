'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Tent, Utensils, Compass, Menu } from 'lucide-react'

export default function LandingPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Data tiruan untuk pratinjau produk
  const featuredProducts = [
    {
      id: 1,
      name: 'Tenda Camping Dome 4-5 Orang',
      category: 'Tenda',
      price: 'Rp 45.000',
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      name: 'Sleeping Bag Bulu Angsa / Polar',
      category: 'Kenyamanan',
      price: 'Rp 15.000',
      image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      name: 'Kompor Portable & Nesting Set',
      category: 'Masak',
      price: 'Rp 20.000',
      image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-orange-500 selection:text-white">
      
      {/* Navbar dengan Dropdown Menu & Ikon Garis Tiga */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-600 flex items-center justify-center font-black text-white text-lg shadow-md shadow-orange-900/40">
              M
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white block leading-none">
                MOUNTCARES <span className="text-orange-500">OUTDOOR</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Rental & Sewa Alat Camping</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-orange-400 transition">Beranda</Link>
            <a href="#fitur" className="hover:text-orange-400 transition">Keunggulan</a>
            <a href="#katalog-preview" className="hover:text-orange-400 transition">Produk</a>
          </nav>

          {/* Dropdown Menu Opsi Katalog */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Delay agar klik menu sempat tereksekusi
              className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-md shadow-orange-900/20 flex items-center gap-2.5"
            >
              <Menu className="w-4 h-4" />
              <span>Menu</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Panel Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-800/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Pilih Menu Opsi
                </div>
                <Link
                  href="/katalog"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-orange-600/10 hover:text-orange-400 transition"
                >
                  <Compass className="w-4 h-4 text-orange-500" />
                  <span>Semua Katalog Alat</span>
                </Link>
                <Link
                  href="/katalog?kategori=tenda"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-orange-600/10 hover:text-orange-400 transition"
                >
                  <Tent className="w-4 h-4 text-orange-500" />
                  <span>Kategori Tenda</span>
                </Link>
                <Link
                  href="/katalog?kategori=masak"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-orange-600/10 hover:text-orange-400 transition"
                >
                  <Utensils className="w-4 h-4 text-orange-500" />
                  <span>Alat Masak & Nesting</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900/40 to-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <span>⛺ Solusi Terbaik Petualangan Anda di Malang</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Sewa Perlengkapan Camping & Outdoor Lebih <span className="text-orange-500">Mudah & Cepat</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Mountcares Outdoor menyediakan berbagai alat kemah berkualitas tinggi siap pakai. Dari tenda, 
            sleeping bag, hingga perlengkapan pendukung keamanan ekspedisi Anda.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/katalog"
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white font-semibold px-8 py-3.5 rounded-xl transition shadow-lg shadow-orange-900/40 text-base"
            >
              Lihat Katalog & Sewa Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Section Fitur / Keunggulan Layanan */}
      <section id="fitur" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Mengapa Memilih Mountcares?</h2>
            <p className="text-sm text-slate-400">Kami berkomitmen memberikan kenyamanan dan keamanan mutlak untuk setiap pendakian Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 border border-slate-800/80 p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 text-xl font-bold">
                🛡️
              </div>
              <h3 className="text-lg font-bold text-white">Alat Berkualitas & Steril</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Seluruh perlengkapan rutin dibersihkan, dirawat, dan dicek kelayakannya sebelum diserahkan ke penyewa.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/80 p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 text-xl font-bold">
                📅
              </div>
              <h3 className="text-lg font-bold text-white">Penjadwalan Fleksibel</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Atur jadwal mulai dan selesai sewa dengan mudah, lengkap dengan opsi pengecekan alat (H-3) sebelum keberangkatan.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/80 p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 text-xl font-bold">
                ⛺
              </div>
              <h3 className="text-lg font-bold text-white">Layanan Tambahan Praktis</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Tersedia opsi bantuan jasa pasang & bongkar tenda agar Anda bisa langsung menikmati momen liburan tanpa repot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section Produk Unggulan / Kategori Populer (Sneak Peek) */}
      <section id="katalog-preview" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Pratinjau Produk Populer</h2>
              <p className="text-sm text-slate-400 mt-1">Beberapa perlengkapan favorit yang paling sering disewa.</p>
            </div>
            <Link 
              href="/katalog"
              className="text-orange-400 hover:text-orange-300 text-sm font-semibold flex items-center gap-1 transition"
            >
              Lihat Seluruh Katalog &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((prod) => (
              <div key={prod.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg group">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur border border-slate-700 text-orange-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {prod.category}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-white text-base">{prod.name}</h3>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-orange-400 font-bold text-sm">{prod.price} <span className="text-xs text-slate-400 font-normal">/ hari</span></span>
                    <Link 
                      href="/katalog"
                      className="bg-slate-800 hover:bg-orange-600 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition"
                    >
                      Sewa
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Section Testimoni / Social Proof */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Apa Kata Petualang?</h2>
            <p className="text-sm text-slate-400">Pengalaman nyata dari mereka yang telah mempercayakan peralatannya pada kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-1 text-orange-400 text-sm">★★★★★</div>
              <p className="text-sm text-slate-300 italic leading-relaxed">
                &ldquo;Pelayanan ramah, kondisi tenda bersih dan tidak ada yang bocor pas badai di puncak. Sangat direkomendasikan untuk pendaki sekitar Malang!&rdquo;
              </p>
              <div className="text-xs font-semibold text-white">- Rifki A., Pendaki Komunitas</div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-1 text-orange-400 text-sm">★★★★★</div>
              <p className="text-sm text-slate-300 italic leading-relaxed">
                &ldquo;Sistem sewanya sangat rapi dan transparan. Bisa atur jadwal pengecekan alat H-3 jadi tenang sebelum berangkat naik gunung.&rdquo;
              </p>
              <div className="text-xs font-semibold text-white">- Dinda P., </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer Informatif */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-3">
            <span className="font-bold text-base tracking-tight text-white block">
              MOUNTCARES <span className="text-orange-500">OUTDOOR</span>
            </span>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Pusat penyedia sewa perlengkapan alat camping danアウトドア tepercaya di Malang, Jawa Timur.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Navigasi Cepat</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/" className="hover:text-orange-400 transition">Beranda</Link></li>
              <li><Link href="/katalog" className="hover:text-orange-400 transition">Katalog & Sewa</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Kontak & Lokasi</h4>
            <p className="text-xs leading-relaxed">
              Malang, Jawa Timur<br />
              WhatsApp Admin: Tersedia di sistem pemesanan<br />
              Jam Operasional: Setiap Hari 08.00 - 21.00 WIB
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-900/80 pt-6 text-center text-xs text-slate-500">
          <p>&copy; 2026 Mountcares Outdoor Store & Sewa Alat Camping. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}