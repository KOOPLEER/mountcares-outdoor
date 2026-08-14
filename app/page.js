'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Tent, Utensils, Compass, Menu } from 'lucide-react'
import TrustindexReviews from '@/components/TrustindexReviews';
import ClientLogoMarquee from '@/components/ClientLogoMarquee';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { useKatalogData } from '@/lib/useKatalogData'

const LOGO_URL =
  'https://drive.google.com/file/d/1D65EKXzH05dy2h1tN5nLckfhaqF2KOvz/view?usp=drive_link'

const DEFAULT_IMAGE = '/favicon.ico';

function getDirectDriveUrl(url) {
  if (!url) return ''
  const value = String(url).trim()
  const match =
    value.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
    value.match(/[?&]id=([a-zA-Z0-9_-]+)/)

  if (match?.[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`
  }
  return value
}

export default function LandingPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // 1. Panggil featuredProducts dari custom hook yang sudah diperkaya
const { featuredProducts, loading } = useKatalogData();

// ... di dalam bagian return JSX (Product Preview Section):
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {loading ? (
    // Skeleton / Loading state sederhana
    <div className="col-span-3 text-center py-10 text-muted">Memuat produk unggulan...</div>
  ) : (
    featuredProducts.map((prod) => (
      <div
        key={prod.id}
        className="
          bg-white
          border
          border-border
          rounded-2xl
          overflow-hidden
          shadow-sm
          group
          hover:shadow-xl
          transition
        "
      >
        <div className="h-48 overflow-hidden relative bg-slate-100">
          <img
  src={
    prod['LINK FOTO'] && prod['LINK FOTO'].trim() !== '' 
      ? prod['LINK FOTO'] 
      : '/favicon.ico'
  }
  alt={prod['NAMA PRICELIST']}
  onError={(e) => {
    e.target.src = '/favicon.ico';
  }}
  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
/>

          <span
            className="
              absolute
              top-3
              left-3
              bg-white/95
              backdrop-blur
              border
              border-white
              text-brand-blue
              text-[10px]
              font-bold
              uppercase
              tracking-wider
              px-2.5
              py-1
              rounded-full
              shadow-sm
            "
          >
            {prod.JENIS}
          </span>
        </div>

        <div className="p-5 space-y-3">
          <h3 className="font-bold text-brand-blue text-base">
            {prod['NAMA PRICELIST']}
          </h3>

          <div className="flex items-center justify-between pt-2">
            <span className="text-brand-cyan font-bold text-sm">
              {/* Format angka harga sewa */}
              {Number(prod['HARGA SEWA']).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}
              <span className="text-xs text-muted font-normal">
                {' '}
                / hari
              </span>
            </span>

            <Link
              href="/katalog"
              className="
                bg-brand-blue
                hover:bg-brand-dark-blue
                text-white
                text-xs
                font-semibold
                px-3.5
                py-2
                rounded-xl
                transition
              "
            >
              Sewa
            </Link>
          </div>
        </div>
      </div>
    ))
  )}
</div>

  return (
    <div className="min-h-screen bg-white text-foreground flex flex-col selection:bg-brand-cyan selection:text-white">

      {/* =====================================================
          NAVBAR
          ===================================================== */}
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-white/95 backdrop-blur-md">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* BRAND / LOGO HORIZONTAL */}
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="Mountcares Outdoor"
          >
            <img
              src="/Logo/mountcares-horizontal.png"
              alt="Mountcares Outdoor"
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </Link>


          {/* NAVIGATION */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted">

            <Link
              href="/"
              className="text-brand-blue font-semibold"
            >
              Beranda
            </Link>

            <a
              href="#fitur"
              className="hover:text-brand-blue transition"
            >
              Keunggulan
            </a>

            <a
              href="#katalog-preview"
              className="hover:text-brand-blue transition"
            >
              Produk
            </a>

          </nav>


          {/* MENU */}
          <div className="relative">

            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onBlur={() =>
                setTimeout(() => setIsDropdownOpen(false), 200)
              }
              className="
                bg-brand-blue
                hover:bg-brand-dark-blue
                text-white
                px-4 py-2
                rounded-xl
                text-sm
                font-semibold
                transition
                shadow-md
                shadow-brand-blue/20
                flex
                items-center
                gap-2.5
              "
            >
              <Menu className="w-4 h-4" />

              <span>Menu</span>

              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>


            {/* DROPDOWN */}
            {isDropdownOpen && (
              <div
                className="
                  absolute
                  right-0
                  mt-2
                  w-56
                  rounded-2xl
                  bg-white
                  border
                  border-border
                  shadow-xl
                  py-2
                  z-50
                "
              >

                <div className="px-4 py-2 border-b border-border text-[11px] font-bold text-muted uppercase tracking-wider">
                  Pilih Menu
                </div>


                <Link
                  href="/katalog"
                  className="
                    flex items-center gap-3
                    px-4 py-2.5
                    text-sm text-foreground
                    hover:bg-brand-light-cyan
                    hover:text-brand-blue
                    transition
                  "
                >
                  <Compass className="w-4 h-4 text-brand-cyan" />
                  <span>Semua Katalog Alat</span>
                </Link>


                <Link
                  href="/katalog?kategori=tenda"
                  className="
                    flex items-center gap-3
                    px-4 py-2.5
                    text-sm text-foreground
                    hover:bg-brand-light-cyan
                    hover:text-brand-blue
                    transition
                  "
                >
                  <Tent className="w-4 h-4 text-brand-cyan" />
                  <span>Kategori Tenda</span>
                </Link>


                <Link
                  href="/katalog?kategori=masak"
                  className="
                    flex items-center gap-3
                    px-4 py-2.5
                    text-sm text-foreground
                    hover:bg-brand-light-cyan
                    hover:text-brand-blue
                    transition
                  "
                >
                  <Utensils className="w-4 h-4 text-brand-cyan" />
                  <span>Alat Masak & Nesting</span>
                </Link>

              </div>
            )}

          </div>

        </div>
      </header>


      {/* =====================================================
          HERO
          ===================================================== */}
      <section
        className="
          relative
          py-24 sm:py-32
          px-4 sm:px-6 lg:px-8
          overflow-hidden
          bg-[linear-gradient(135deg,#3E4095_0%,#00AFEF_100%)]
        "
      >

        {/* Decorative glow */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_60%)]
            pointer-events-none
          "
        />


        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">

          {/* BRAND POSITIONING */}
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4 py-2
              rounded-full
              bg-white/10
              border
              border-white/25
              text-white
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              backdrop-blur-sm
            "
          >
            ONE STOP CAMPING SOLUTION
          </div>


          {/* MAIN HEADING */}
          <h1
            className="
              text-4xl
              sm:text-5xl
              lg:text-6xl
              font-extrabold
              tracking-tight
              text-white
              leading-[1.08]
            "
          >
            Kebutuhan Outdoor Anda,
            <br />

            <span className="text-brand-cyan">
              Lengkap dalam Satu Solusi.
            </span>
          </h1>


          {/* DESCRIPTION */}
          <p
            className="
              text-base
              sm:text-lg
              text-white/85
              max-w-3xl
              mx-auto
              leading-relaxed
            "
          >
            Mountcares Outdoor adalah penyedia perlengkapan aktivitas luar
            ruangan terintegrasi yang berbasis di{' '}
            <span className="font-semibold text-white">
              Singosari, Kabupaten Malang
            </span>
            .
            Kami melayani kebutuhan{' '}
            <span className="font-semibold text-white">
              retail, rental, hingga vendor supply
            </span>{' '}
            perlengkapan camping untuk berbagai kebutuhan petualangan dan
            aktivitas luar ruang.
          </p>


          {/* BUSINESS PILLARS */}
          <div className="flex flex-wrap justify-center gap-2.5 pt-2">

            <span
              className="
                px-3.5 py-1.5
                rounded-full
                bg-white/10
                border border-white/20
                text-white
                text-xs
                font-semibold
              "
            >
              Retail Outdoor
            </span>

            <span
              className="
                px-3.5 py-1.5
                rounded-full
                bg-white/10
                border border-white/20
                text-white
                text-xs
                font-semibold
              "
            >
              Rental Camping
            </span>

            <span
              className="
                px-3.5 py-1.5
                rounded-full
                bg-white/10
                border border-white/20
                text-white
                text-xs
                font-semibold
              "
            >
              Vendor Supply
            </span>

          </div>


          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-5">

            <Link
              href="/katalog"
              className="
                w-full sm:w-auto
                bg-white
                hover:bg-brand-light-cyan
                text-brand-blue
                font-bold
                px-8 py-3.5
                rounded-xl
                transition
                shadow-xl
                text-base
              "
            >
              Lihat Katalog & Sewa
            </Link>


            <a
              href="#fitur"
              className="
                w-full sm:w-auto
                bg-white/10
                hover:bg-white/20
                border border-white/30
                text-white
                font-semibold
                px-8 py-3.5
                rounded-xl
                transition
                text-base
              "
            >
              Kenapa Mountcares?
            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURES
          ===================================================== */}
      <section
        id="fitur"
        className="
          py-20
          px-4 sm:px-6 lg:px-8
          bg-white
        "
      >

        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">

            <span className="text-brand-cyan text-xs font-bold uppercase tracking-widest">
              Mengapa MOUNTCARES?
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-blue">
              Lebih dari Sekadar Sewa Alat Camping
            </h2>

            <p className="text-sm text-muted leading-relaxed">
              Kami menghadirkan ekosistem perlengkapan outdoor yang
              dirancang untuk membuat persiapan aktivitas luar ruang
              menjadi lebih praktis, aman, dan terintegrasi.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* CARD 1 */}
            <div
              className="
                bg-white
                border
                border-border
                p-8
                rounded-2xl
                space-y-4
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition
              "
            >

              <div
                className="
                  w-12 h-12
                  rounded-xl
                  bg-brand-light-cyan
                  border
                  border-brand-cyan/20
                  flex
                  items-center
                  justify-center
                  text-brand-cyan
                  text-xl
                "
              >
                🛡️
              </div>

              <h3 className="text-lg font-bold text-brand-blue">
                Perlengkapan Terawat
              </h3>

              <p className="text-sm text-muted leading-relaxed">
                Perlengkapan rental dirawat, dibersihkan, dan dicek
                kelayakannya sebelum digunakan sehingga lebih siap
                mendukung perjalanan Anda.
              </p>

            </div>


            {/* CARD 2 */}
            <div
              className="
                bg-white
                border
                border-border
                p-8
                rounded-2xl
                space-y-4
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition
              "
            >

              <div
                className="
                  w-12 h-12
                  rounded-xl
                  bg-brand-light-cyan
                  border
                  border-brand-cyan/20
                  flex
                  items-center
                  justify-center
                  text-brand-cyan
                  text-xl
                "
              >
                📅
              </div>

              <h3 className="text-lg font-bold text-brand-blue">
                Sistem Rental Terjadwal
              </h3>

              <p className="text-sm text-muted leading-relaxed">
                Atur jadwal mulai dan selesai sewa dengan lebih mudah,
                termasuk opsi pengecekan perlengkapan sebelum waktu
                keberangkatan.
              </p>

            </div>


            {/* CARD 3 */}
            <div
              className="
                bg-white
                border
                border-border
                p-8
                rounded-2xl
                space-y-4
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition
              "
            >

              <div
                className="
                  w-12 h-12
                  rounded-xl
                  bg-brand-light-cyan
                  border
                  border-brand-cyan/20
                  flex
                  items-center
                  justify-center
                  text-brand-cyan
                  text-xl
                "
              >
                ⛺
              </div>

              <h3 className="text-lg font-bold text-brand-blue">
                Layanan Outdoor Terintegrasi
              </h3>

              <p className="text-sm text-muted leading-relaxed">
                Mulai dari kebutuhan retail dan rental hingga dukungan
                vendor supply untuk komunitas, korporasi, operator trip,
                dan kebutuhan destinasi wisata.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PRODUCT PREVIEW
          ===================================================== */}
      <section
        id="katalog-preview"
        className="
          py-20
          px-4 sm:px-6 lg:px-8
          bg-brand-light-cyan
        "
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-brand-cyan text-xs font-bold uppercase tracking-widest">
                Featured Gear
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-blue mt-2">
                Perlengkapan Outdoor Pilihan
              </h2>
              <p className="text-sm text-muted mt-1">
                Pilihan perlengkapan yang dapat Anda gunakan untuk
                berbagai kebutuhan aktivitas luar ruang.
              </p>
            </div>

            <Link
              href="/katalog"
              className="
                text-brand-blue
                hover:text-brand-dark-blue
                text-sm
                font-semibold
                flex
                items-center
                gap-1
                transition
              "
            >
              Lihat Seluruh Katalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-3 text-center py-10 text-muted">Memuat produk pilihan...</div>
            ) : (
              featuredProducts.map((prod) => {
                // Debugging 1: Cek isi data per produk yang dirender

                return (
                  <div
                    key={prod.id}
                    className="
                      bg-white
                      border
                      border-border
                      rounded-2xl
                      overflow-hidden
                      shadow-sm
                      group
                      hover:shadow-xl
                      transition
                    "
                  >
                    <div className="h-48 overflow-hidden relative bg-slate-100">
                      <img
                        src={(() => {
                          const rawLink = prod['LINK FOTO'];
                          const isValid = rawLink && String(rawLink).trim() !== '';
                          const resolvedSrc = isValid ? rawLink : '/favicon.ico';
                                                  
                          return resolvedSrc;
                        })()}
                        alt={prod['NAMA PRICELIST']}
                        onError={(e) => {
                          // Debugging 3: Merekam jika browser gagal memuat link asli dan memicu error handler
                          e.target.src = '/favicon.ico';
                        }}
                        className="
                          w-full
                          h-full
                          object-cover
                          group-hover:scale-105
                          transition
                          duration-500
                        "
                      />

                      <span
                        className="
                          absolute
                          top-3
                          left-3
                          bg-white/95
                          backdrop-blur
                          border
                          border-white
                          text-brand-blue
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wider
                          px-2.5
                          py-1
                          rounded-full
                          shadow-sm
                        "
                      >
                        {prod.JENIS}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="font-bold text-brand-blue text-base">
                        {prod['NAMA PRICELIST']}
                      </h3>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-brand-cyan font-bold text-sm">
                          {Number(prod['HARGA SEWA'] || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}
                          <span className="text-xs text-muted font-normal">
                            {' '}
                            / hari
                          </span>
                        </span>

                        <Link
                          href="/katalog"
                          className="
                            bg-brand-blue
                            hover:bg-brand-dark-blue
                            text-white
                            text-xs
                            font-semibold
                            px-3.5
                            py-2
                            rounded-xl
                            transition
                          "
                        >
                          Sewa
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>


      {/* =====================================================
          TESTIMONIAL
          ===================================================== */}
      <section
        className="
          py-20
          px-4 sm:px-6 lg:px-8
          bg-white
        "
      >

        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">

            <span className="text-brand-cyan text-xs font-bold uppercase tracking-widest">
              Customer Experience
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-blue">
              Apa Kata Petualang?
            </h2>

            <p className="text-sm text-muted">
              Pengalaman mereka yang telah mempercayakan kebutuhan
              perlengkapan outdoor kepada Mountcares.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

            <div
              className="
                bg-brand-light-cyan
                border
                border-brand-cyan/20
                p-6
                rounded-2xl
                space-y-4
              "
            >

              <div className="flex items-center gap-1 text-brand-cyan text-sm">
                ★★★★★
              </div>

              <p className="text-sm text-foreground italic leading-relaxed">
                &ldquo;Pelayanan ramah, kondisi tenda bersih dan tidak ada
                yang bocor pas badai di puncak. Sangat direkomendasikan
                untuk pendaki sekitar Malang!&rdquo;
              </p>

              <div className="text-xs font-semibold text-brand-blue">
                - Rifki A., Pendaki Komunitas
              </div>

            </div>


            <div
              className="
                bg-brand-light-blue
                border
                border-brand-blue/10
                p-6
                rounded-2xl
                space-y-4
              "
            >

              <div className="flex items-center gap-1 text-brand-cyan text-sm">
                ★★★★★
              </div>

              <p className="text-sm text-foreground italic leading-relaxed">
                &ldquo;Sistem sewanya sangat rapi dan transparan.
                Bisa atur jadwal pengecekan alat H-3 jadi tenang
                sebelum berangkat naik gunung.&rdquo;
              </p>

              <div className="text-xs font-semibold text-brand-blue">
                - Dinda P.
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
      GOOGLE REVIEWS (TRUSTINDEX WIDGET)
      ===================================================== */}
      <TrustindexReviews />
      
      {/* =====================================================
      Flyer /Logo Klien (SUPABASE DATA FETCH)
      ===================================================== */}
      <ClientLogoMarquee />


      {/* =====================================================
          FINAL CTA
          ===================================================== */}
      <section
        className="
          relative
          overflow-hidden
          bg-[linear-gradient(135deg,#3E4095_0%,#00AFEF_100%)]
          py-20
          px-4
          sm:px-6
          lg:px-8
        "
      >

        <div className="max-w-4xl mx-auto text-center relative z-10">

          <span className="text-white/70 text-xs font-bold uppercase tracking-widest">
            Mountcares Outdoor
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Siap Menyiapkan Petualangan Anda?
          </h2>

          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            Temukan perlengkapan yang sesuai kebutuhan Anda melalui
            layanan retail dan rental Mountcares Outdoor.
            Praktis, lengkap, dan siap mendukung perjalanan Anda.
          </p>

          {/* Container untuk tombol agar sejajar ke samping */}
          <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
            <Link
              href="/katalog"
              className="
                inline-flex
                bg-white
                hover:bg-brand-light-cyan
                text-brand-blue
                font-bold
                px-8
                py-3.5
                rounded-xl
                shadow-xl
                transition
              "
            >
              Jelajahi Katalog
            </Link>

            <a 
              href="https://wa.me/6285536349616?text=Saya%20ingin%20konsultasi%20layanan%20mountcares%20outdoor%20dari%20informasi%20website"
              target="_blank" 
              rel="noopener noreferrer"
              className="
                inline-flex 
                items-center 
                gap-2 
                bg-green-600
                hover:bg-green-700
                text-white
                font-bold
                px-8
                py-3.5
                rounded-xl
                shadow-xl
                transition
              "
            >
              <svg 
                className="w-5 h-5 fill-current" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>

        </div>

      </section>

      


      {/* =====================================================
          FOOTER
          ===================================================== */}
      <footer
        className="
          bg-brand-dark-blue
          py-12
          px-4 sm:px-6 lg:px-8
          text-white/70
          text-sm
        "
      >

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* BRAND */}
          <div className="space-y-4">

            <Link
              href="/"
              className="inline-block"
              aria-label="Mountcares Outdoor"
            >
              <img
                src="/Logo/mountcares-horizontal.png"
                alt="Mountcares Outdoor"
                className="h-auto w-80 object-contain bg-white px-2 py-1 rounded-md"
              />
            </Link>


            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              Penyedia perlengkapan aktivitas luar ruangan terintegrasi
              yang berbasis di Singosari, Kabupaten Malang.
              Melayani kebutuhan retail, rental, dan vendor supply
              perlengkapan camping.
            </p>

          </div>


          {/* NAVIGATION */}
          <div className="space-y-3">

            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
              Navigasi Cepat
            </h4>

            <ul className="space-y-2 text-xs">

              <li>
                <Link
                  href="/"
                  className="hover:text-brand-cyan transition"
                >
                  Beranda
                </Link>
              </li>

              <li>
                <Link
                  href="/katalog"
                  className="hover:text-brand-cyan transition"
                >
                  Katalog & Sewa
                </Link>
              </li>

              <li>
                <a
                  href="#fitur"
                  className="hover:text-brand-cyan transition"
                >
                  Keunggulan
                </a>
              </li>

            </ul>

          </div>


          {/* CONTACT */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
              Kontak & Lokasi
            </h4>

            <p className="text-xs leading-relaxed text-white/60 space-y-2">
              {/* Alamat (Link Google Maps Dummy) */}
              <a 
                href="https://maps.app.goo.gl/qycvhYnobY2BZ3Z39" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 hover:text-white transition-colors mb-1"
              >
                <i className="fa-solid fa-location-dot mt-0.5 text-white shrink-0"></i>
                <span>
                  Jl. Kebonagung Gg V RT 03 RW 02 Tamanharjo Singosari, Kabupaten Malang
                  <br />
                  Jawa Timur, Indonesia
                </span>
              </a>

              <br />

              {/* WhatsApp Admin (Link WhatsApp) */}
              <a 
                href="https://wa.me/6285536349616?text=Saya%20ingin%20konsultasi%20layanan%20mountcares%20outdoor%20dari%20informasi%20website"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-white transition-colors mb-1"
              >
                <i className="fa-brands fa-whatsapp text-white shrink-0"></i>
                <span>WhatsApp Admin: 0855-3634-9616</span>
              </a>

              <br />

              {/* Jam Operasional */}
              <span className="inline-flex items-center gap-2">
                <i className="fa-regular fa-clock text-white shrink-0"></i>
                <span>Jam Operasional: Setiap Hari 07.30 - 21.00 WIB</span>
              </span>
            </p>
          </div>

        </div>


        <div className="max-w-7xl mx-auto border-t border-white/10 pt-6 text-center text-xs text-white/40">

          <p>
            &copy; 2026 Mountcares Outdoor.
            All rights reserved.
          </p>

        </div>

      </footer>
        
        {/* --- TOMBOL WHATSAPP MELAYANG --- */}
        <a
          href="https://wa.me/6285536349616?text=Saya%20ingin%20konsultasi%20layanan%20mountcares%20outdoor%20dari%20informasi%20website"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Chat WhatsApp"
        >
          <svg 
            className="w-7 h-7 fill-current" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </a>

    </div>
  )
}

