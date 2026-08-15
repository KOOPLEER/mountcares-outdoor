'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronDown,
  Tent,
  Utensils,
  Compass,
  Menu,
} from 'lucide-react'

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-white/95 backdrop-blur-md">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* =====================================================
            BRAND / LOGO HORIZONTAL
            ===================================================== */}
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


        {/* =====================================================
            NAVIGATION
            ===================================================== */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted">

          {/* BERANDA */}
          <Link
            href="/"
            className="text-brand-blue font-semibold"
          >
            Beranda
          </Link>


          {/* KEUNGGULAN */}
          <Link
            href="/#fitur"
            className="hover:text-brand-blue transition"
          >
            Keunggulan
          </Link>


          {/* TENTANG KAMI */}
          <Link
            href="/tentang-kami"
            className="hover:text-brand-blue transition"
          >
            Tentang Kami
          </Link>


          {/* PRODUK */}
          <Link
            href="/#katalog-preview"
            className="hover:text-brand-blue transition"
          >
            Produk
          </Link>

        </nav>


        {/* =====================================================
            MENU BUTTON
            ===================================================== */}
        <div className="relative">

          <button
            type="button"
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
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >

            <Menu className="w-4 h-4" />

            <span>Menu</span>

            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />

          </button>


          {/* =====================================================
              DROPDOWN MENU
              ===================================================== */}
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

              {/* DROPDOWN TITLE */}
              <div className="px-4 py-2 border-b border-border text-[11px] font-bold text-muted uppercase tracking-wider">
                Pilih Menu
              </div>


              {/* SEMUA KATALOG */}
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

                <span>
                  Semua Katalog Alat
                </span>
              </Link>


              {/* KATEGORI TENDA */}
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

                <span>
                  Kategori Tenda
                </span>
              </Link>


              {/* ALAT MASAK */}
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

                <span>
                  Alat Masak & Nesting
                </span>
              </Link>

            </div>
          )}

        </div>

      </div>

    </header>
  )
}