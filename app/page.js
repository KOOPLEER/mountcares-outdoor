'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Tent, Utensils, Compass, Menu } from 'lucide-react'

export default function LandingPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const featuredProducts = [
    {
      id: 1,
      name: 'Tenda Camping Dome 4-5 Orang',
      category: 'Tenda',
      price: 'Rp 45.000',
      image:
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      name: 'Sleeping Bag Bulu Angsa / Polar',
      category: 'Kenyamanan',
      price: 'Rp 15.000',
      image:
        'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      name: 'Kompor Portable & Nesting Set',
      category: 'Masak',
      price: 'Rp 20.000',
      image:
        'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80',
    },
  ]

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
              src="/logo/mountcares-horizontal.png"
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

            {featuredProducts.map((prod) => (

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

                <div className="h-48 overflow-hidden relative">

                  <img
                    src={prod.image}
                    alt={prod.name}
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
                    "
                  >
                    {prod.category}
                  </span>

                </div>


                <div className="p-5 space-y-3">

                  <h3 className="font-bold text-brand-blue text-base">
                    {prod.name}
                  </h3>

                  <div className="flex items-center justify-between pt-2">

                    <span className="text-brand-cyan font-bold text-sm">

                      {prod.price}

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

            ))}

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


          <Link
            href="/katalog"
            className="
              inline-flex
              mt-8
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
                src="/logo/mountcares-horizontal.png"
                alt="Mountcares Outdoor"
                className="h-10 w-auto object-contain"
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

            <p className="text-xs leading-relaxed text-white/60">

              Singosari, Kabupaten Malang
              <br />

              Jawa Timur, Indonesia
              <br />

              WhatsApp Admin: Tersedia di pemesanan
              <br />

              Jam Operasional: Setiap Hari 08.00 - 21.00 WIB

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

    </div>
  )
}