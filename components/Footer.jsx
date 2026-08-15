import Link from 'next/link'

export default function Footer() {
  return (
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
                href="/tentang-kami"
                className="hover:text-brand-cyan transition"
              >
                Tentang Kami
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
              <Link
                href="/#fitur"
                className="hover:text-brand-cyan transition"
              >
                Keunggulan
              </Link>
            </li>

          </ul>

        </div>

        {/* CONTACT */}
        <div className="space-y-3">

          <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
            Kontak & Lokasi
          </h4>

          <div className="text-xs leading-relaxed text-white/60">

            {/* ALAMAT */}
            <a
              href="https://maps.app.goo.gl/qycvhYnobY2BZ3Z39"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-2 hover:text-white transition-colors mb-1"
            >
              <i className="fa-solid fa-location-dot mt-0.5 text-white shrink-0"></i>

              <span>
                Jl. Kebonagung Gg V RT 03 RW 02 Tamanharjo Singosari,
                Kabupaten Malang
                <br />
                Jawa Timur, Indonesia
              </span>
            </a>

            <br />

            {/* WHATSAPP */}
            <a
              href="https://wa.me/6285536349616?text=Saya%20ingin%20konsultasi%20layanan%20mountcares%20outdoor%20dari%20informasi%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors mb-1"
            >
              <i className="fa-brands fa-whatsapp text-white shrink-0"></i>

              <span>
                WhatsApp Admin: 0855-3634-9616
              </span>
            </a>

            <br />

            {/* JAM OPERASIONAL */}
            <span className="inline-flex items-center gap-2">
              <i className="fa-regular fa-clock text-white shrink-0"></i>

              <span>
                Jam Operasional: Setiap Hari 07.30 - 21.00 WIB
              </span>
            </span>

          </div>

        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-6 text-center text-xs text-white/40">

        <p>
          &copy; 2026 Mountcares Outdoor.
          All rights reserved.
        </p>

      </div>

    </footer>
  )
}