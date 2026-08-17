'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Tent, Utensils, Compass, Menu } from 'lucide-react'
import TrustindexReviews from '@/components/TrustindexReviews';
import ClientLogoMarquee from '@/components/ClientLogoMarquee';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { useKatalogData } from '@/lib/useKatalogData'
import ClientDocumentationMarquee from '@/components/ClientDocumentationMarquee';

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
  // =====================================================
  // DATA KATALOG
  // =====================================================
  const { products, loading } = useKatalogData()

  // =====================================================
  // FILTER KHUSUS LANDING PAGE
  // Tidak mengubah useKatalogData / katalog/page.js
  // =====================================================

  // KATALOG SATUAN
  // Semua produk yang bukan paket
  const satuanProducts = products.filter(
    (prod) => !prod.isPaket
  )

  // KATALOG PAKET
  // Hanya produk yang ditandai sebagai paket
  const paketProducts = products.filter(
    (prod) => prod.isPaket
  )

  // =====================================================
  // DATA BROSUR
  // =====================================================
  const brosurProducts = [
    {
      id: 'brosur-1',
      src: '/Poster/BrosurPricelist1.png',
      alt: 'Brosur Pricelist Mountcares Outdoor 1',
    },
    {
      id: 'brosur-2',
      src: '/Poster/BrosurPricelist2.png',
      alt: 'Brosur Pricelist Mountcares Outdoor 2',
    },
    {
      id: 'brosur-3',
      src: '/Poster/BrosurSyaratKetentuan1.png',
      alt: 'Syarat & Ketentuan Mountcares Outdoor 1',
    },
    {
      id: 'brosur-4',
      src: '/Poster/BrosurSyaratKetentuan2.png',
      alt: 'Syarat & Ketentuan Mountcares Outdoor 2',
    },
    {
      id: 'brosur-5',
      src: '/Poster/BrosurSyaratKetentuanJasaJamOperasional.png',
      alt: 'Pricelist Jasa & Jam Operasional Mountcares Outdoor',
    },
  ]

  // =====================================================
  // HELPER FORMAT HARGA
  // =====================================================
  const formatRupiah = (value) => {
    return Number(value || 0).toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    })
  }

  return (
    <div className="min-h-screen bg-white text-foreground flex flex-col selection:bg-brand-cyan selection:text-white">

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

          {/* =================================================
              HEADER
              ================================================= */}
          <div className="text-center max-w-3xl mx-auto mb-12">

            <span className="text-brand-cyan text-xs font-bold uppercase tracking-widest">
              Katalog Mountcares
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-blue mt-2">
              Pilihan Outdoor untuk Petualangan Anda
            </h2>

            <p className="text-sm text-muted mt-2">
              Lihat brosur, katalog perlengkapan satuan, dan katalog
              paket yang tersedia di Mountcares Outdoor.
            </p>

          </div>


          {/* =================================================
              3 KOLOM:
              1. BROSUR
              2. KATALOG SATUAN
              3. KATALOG PAKET
              ================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


            {/* =================================================
                1. BROSUR
                ================================================= */}
            <div
              className="
                bg-white
                border
                border-border
                rounded-2xl
                overflow-hidden
                shadow-sm
              "
            >

              <div className="p-5 pb-3">

                <span className="text-brand-cyan text-[10px] font-bold uppercase tracking-widest">
                  Pricelist
                </span>

                <h3 className="text-lg font-bold text-brand-blue mt-1">
                  Brosur Mountcares
                </h3>

                <p className="text-xs text-muted mt-1">
                  Geser untuk melihat brosur berikutnya.
                </p>

              </div>


              {/* HORIZONTAL MANUAL CAROUSEL */}
              <div
                className="
                  flex
                  overflow-x-auto
                  snap-x
                  snap-mandatory
                  scroll-smooth
                  scrollbar-hide
                "
              >

                {brosurProducts.map((brosur) => (

                  <div
                    key={brosur.id}
                    className="
                      min-w-full
                      w-full
                      snap-center
                      shrink-0
                      px-4
                      pb-5
                    "
                  >

                    <div
                      className="
                        relative
                        w-full
                        overflow-hidden
                        rounded-xl
                        bg-slate-100
                        border
                        border-border
                      "
                    >

                      <img
                        src={brosur.src}
                        alt={brosur.alt}
                        className="
                          block
                          w-full
                          h-auto
                          object-contain
                        "
                        loading="lazy"
                      />

                    </div>

                  </div>

                ))}

              </div>


              {/* ITEM COUNT */}
              {brosurProducts.length > 1 && (
                <div className="text-center pb-4">

                  <span
                    className="
                      text-[10px]
                      text-muted
                      font-medium
                    "
                  >
                    ← Geser untuk melihat {brosurProducts.length} brosur →
                  </span>

                </div>
              )}

            </div>


            {/* =================================================
    2. KATALOG SATUAN
    ================================================= */}
            <div
              className="
                bg-white
                border
                border-border
                rounded-2xl
                overflow-hidden
                shadow-sm
              "
            >
              <div className="p-5 pb-3">
                <span className="text-brand-cyan text-[10px] font-bold uppercase tracking-widest">
                  Katalog Satuan
                </span>
                <h3 className="text-lg font-bold text-brand-blue mt-1">
                  Perlengkapan Outdoor
                </h3>
                <p className="text-xs text-muted mt-1">
                  Geser untuk melihat perlengkapan berikutnya.
                </p>
              </div>

              {loading ? (
                <div className="px-5 pb-5">
                  <div
                    className="
                      h-[280px]
                      rounded-xl
                      bg-slate-100
                      animate-pulse
                    "
                  />
                </div>
              ) : satuanProducts.length === 0 ? (
                <div className="px-5 pb-8">
                  <div
                    className="
                      h-[280px]
                      rounded-xl
                      bg-slate-100
                      flex
                      items-center
                      justify-center
                      text-sm
                      text-muted
                    "
                  >
                    Belum ada katalog satuan.
                  </div>
                </div>
              ) : (
                <>
                  {/* HORIZONTAL MANUAL CAROUSEL */}
                  <div
                    className="
                      flex
                      overflow-x-auto
                      snap-x
                      snap-mandatory
                      scroll-smooth
                      scrollbar-hide
                    "
                  >
                    {satuanProducts.map((prod) => {
                      const gambarUrl = prod?.['LINK FOTO'] || prod?.GAMBAR || '';
                      const directUrl = gambarUrl ? getDirectDriveUrl(gambarUrl) : '';
                      const namaProduk = prod['NAMA PRICELIST'] || 'Produk Mountcares Outdoor';
                      const harga = prod['HARGA SEWA'] || 0;

                      return (
                        <div
                          key={prod.id}
                          className="
                            min-w-full
                            w-full
                            snap-center
                            shrink-0
                            px-4
                            pb-5
                          "
                        >
                          {/* IMAGE */}
                          <div
                            className="
                              relative
                              h-[280px]
                              overflow-hidden
                              rounded-xl
                              bg-slate-100
                              group
                              flex
                              items-center
                              justify-center
                            "
                          >
                            {directUrl ? (
                              <img
                                src={directUrl}
                                alt={namaProduk}
                                className="
                                  w-full
                                  h-full
                                  object-cover
                                  group-hover:scale-105
                                  transition
                                  duration-500
                                "
                                onError={(e) => {
                                  const fallback = getDriveThumbnailUrl(gambarUrl);
                                  if (fallback && e.currentTarget.src !== fallback) {
                                    e.currentTarget.src = fallback;
                                  } else {
                                    e.currentTarget.src = '/favicon.ico';
                                  }
                                }}
                                loading="lazy"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center gap-1 text-muted">
                                <span className="text-[10px]">No Image</span>
                              </div>
                            )}

                            {/* JENIS */}
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
                              {prod.JENIS || 'OUTDOOR'}
                            </span>
                          </div>

                          {/* PRODUCT INFO */}
                          <div className="pt-4">
                            <h4
                              className="
                                font-bold
                                text-brand-blue
                                text-sm
                                leading-snug
                                line-clamp-2
                              "
                            >
                              {namaProduk}
                            </h4>

                            <div className="flex items-center justify-between gap-3 pt-3">
                              <div>
                                <span className="text-brand-cyan font-bold text-sm">
                                  {formatRupiah(harga)}
                                </span>
                                <span className="text-xs text-muted font-normal">
                                  {' '}
                                  / hari
                                </span>
                              </div>

                              <Link
                                href="/katalog"
                                className="
                                  shrink-0
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
                    })}
                  </div>

                  {/* ITEM COUNT */}
                  {satuanProducts.length > 1 && (
                    <div className="text-center pb-4">
                      <span
                        className="
                          text-[10px]
                          text-muted
                          font-medium
                        "
                      >
                        ← Geser untuk melihat {satuanProducts.length} perlengkapan →
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>


            {/* =================================================
    3. KATALOG PAKET
    ================================================= */}
            <div
              className="
                bg-white
                border
                border-border
                rounded-2xl
                overflow-hidden
                shadow-sm
              "
            >
              <div className="p-5 pb-3">
                <span className="text-brand-cyan text-[10px] font-bold uppercase tracking-widest">
                  Paket Camping
                </span>
                <h3 className="text-lg font-bold text-brand-blue mt-1">
                  Katalog Paket
                </h3>
                <p className="text-xs text-muted mt-1">
                  Geser untuk melihat paket berikutnya.
                </p>
              </div>

              {loading ? (
                <div className="px-5 pb-5">
                  <div
                    className="
                      h-[280px]
                      rounded-xl
                      bg-slate-100
                      animate-pulse
                    "
                  />
                </div>
              ) : paketProducts.length === 0 ? (
                <div className="px-5 pb-8">
                  <div
                    className="
                      h-[280px]
                      rounded-xl
                      bg-slate-100
                      flex
                      items-center
                      justify-center
                      text-sm
                      text-muted
                    "
                  >
                    Belum ada katalog paket.
                  </div>
                </div>
              ) : (
                <>
                  {/* HORIZONTAL MANUAL CAROUSEL */}
                  <div
                    className="
                      flex
                      overflow-x-auto
                      snap-x
                      snap-mandatory
                      scroll-smooth
                      scrollbar-hide
                    "
                  >
                    {paketProducts.map((prod) => {
                      const gambarUrl = prod?.['LINK FOTO'] || prod?.GAMBAR || '';
                      const rawImgSrc = gambarUrl && String(gambarUrl).trim() !== '' 
                        ? getDirectDriveUrl(gambarUrl) 
                        : '';

                      return (
                        <div
                          key={prod.id || prod.kode_pricelist || prod['NAMA PRICELIST']}
                          className="
                            min-w-full
                            w-full
                            snap-center
                            shrink-0
                            px-4
                            pb-5
                          "
                        >
                          {/* IMAGE */}
                          <div
                            className="
                              relative
                              h-[280px]
                              overflow-hidden
                              rounded-xl
                              bg-slate-100
                              group
                              flex
                              items-center
                              justify-center
                            "
                          >
                            {rawImgSrc ? (
                              <img
                                src={rawImgSrc}
                                alt={
                                  prod['NAMA PRICELIST'] ||
                                  'Katalog Paket Mountcares Outdoor'
                                }
                                onError={(e) => {
                                  const fallback = getDriveThumbnailUrl(gambarUrl);
                                  if (fallback && e.currentTarget.src !== fallback) {
                                    e.currentTarget.src = fallback;
                                    return;
                                  }
                                  e.currentTarget.src = '/favicon.ico';
                                }}
                                className="
                                  w-full
                                  h-full
                                  object-cover
                                  group-hover:scale-105
                                  transition
                                  duration-500
                                "
                                loading="lazy"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center gap-1 text-muted">
                                <span className="text-[10px]">No Image</span>
                              </div>
                            )}

                            {/* PAKET BADGE */}
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
                              PAKET
                            </span>
                          </div>

                          {/* PACKAGE INFO */}
                          <div className="pt-4">
                            <h4
                              className="
                                font-bold
                                text-brand-blue
                                text-sm
                                leading-snug
                                line-clamp-2
                              "
                            >
                              {prod['NAMA PRICELIST']}
                            </h4>

                            <div className="flex items-center justify-between gap-3 pt-3">
                              <div>
                                <span className="text-brand-cyan font-bold text-sm">
                                  {formatRupiah(prod['HARGA SEWA'])}
                                </span>
                                <span className="text-xs text-muted font-normal">
                                  {' '}
                                  / hari
                                </span>
                              </div>

                              <Link
                                href="/katalog"
                                className="
                                  shrink-0
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
                                Lihat Paket
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* ITEM COUNT */}
                  {paketProducts.length > 1 && (
                    <div className="text-center pb-4">
                      <span
                        className="
                          text-[10px]
                          text-muted
                          font-medium
                        "
                      >
                        ← Geser untuk melihat {paketProducts.length} paket →
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>

          </div>


          {/* =================================================
              FULL CATALOG CTA
              ================================================= */}
          <div className="text-center mt-10">

            <Link
              href="/katalog"
              className="
                inline-flex
                items-center
                gap-2
                text-brand-blue
                hover:text-brand-dark-blue
                text-sm
                font-semibold
                transition
              "
            >
              Lihat Seluruh Katalog
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          TESTIMONIAL & DOKUMENTASI DINAMIS
          ===================================================== */}
      <ClientDocumentationMarquee />


      {/* =====================================================
          GOOGLE REVIEWS (TRUSTINDEX WIDGET)
          ===================================================== */}
      <TrustindexReviews />


      {/* =====================================================
          FLYER / LOGO KLIEN
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

          {/* CTA BUTTONS */}
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
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>

              <span>WhatsApp</span>

            </a>

          </div>

        </div>

      </section>

    </div>
  )
}

