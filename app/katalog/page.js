'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  Clock3,
  ImageOff,
  MapPin,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  TentTree,
  Trash2,
  Truck,
  UserRound,
  X,
} from 'lucide-react'

import { supabase } from '@/lib/supabase'
import toast, { Toaster } from 'react-hot-toast'
import { useKatalogData } from '@/lib/useKatalogData'
import FloatingWhatsApp from '@/components/FloatingWhatsApp';


// ======================================================
// CONSTANTS
// ======================================================
const DEFAULT_IMAGE = '/logo/favicon.ico';

const LOGO_URL =
  'https://drive.google.com/file/d/1D65EKXzH05dy2h1tN5nLckfhaqF2KOvz/view?usp=drive_link'

const STORE_MAPS_URL =
  'https://maps.app.goo.gl/qycvhYnobY2BZ3Z39'


// ======================================================
// HELPERS
// ======================================================

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


function getDriveThumbnailUrl(url) {
  if (!url) return ''

  const value = String(url).trim()

  const match =
    value.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
    value.match(/[?&]id=([a-zA-Z0-9_-]+)/)

  if (match?.[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`
  }

  return ''
}


function getProductName(product) {
  return (
    product?.['NAMA PRICELIST'] ||
    product?.['NAMA PRICELIS~'] ||
    'Tanpa Nama'
  )
}


function getProductPrice(product) {
  const raw =
    product?.['HARGA SEWA'] ??
    product?.HARGA ??
    0

  if (typeof raw === 'number') {
    return Number.isFinite(raw) && raw >= 0 ? raw : 0
  }

  const cleaned = String(raw)
    .replace(/[^\d,-]/g, '')
    .replace(/\./g, '')
    .replace(',', '.')

  const parsed = Number(cleaned)

  return Number.isFinite(parsed) && parsed >= 0
    ? parsed
    : 0
}


function getProductStock(product) {
  const raw = product?.STOK

  if (raw === null || raw === undefined || raw === '') {
    return 0
  }

  const parsed = Number(
    String(raw).replace(/[^\d.-]/g, '')
  )

  return Number.isFinite(parsed) && parsed >= 0
    ? Math.floor(parsed)
    : 0
}


function sanitizeText(value, maxLength = 255) {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)
}


function sanitizeAddress(value) {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 500)
}


function normalizeWhatsApp(value) {
  return String(value ?? '')
    .replace(/[\s\-().]/g, '')
    .trim()
}


function isValidWhatsApp(value) {
  const normalized = normalizeWhatsApp(value)

  return /^(?:\+62|62|0)8[1-9][0-9]{7,11}$/.test(
    normalized
  )
}


function normalizeDistance(value) {
  if (value === '' || value === null || value === undefined) {
    return null
  }

  const parsed = Number(
    String(value).replace(',', '.')
  )

  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : null
}


function formatDateTimeLocal(date) {
  const pad = (n) =>
    String(n).padStart(2, '0')

  return `${date.getFullYear()}-${pad(
    date.getMonth() + 1
  )}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`
}


function formatRupiah(value) {
  return Number(value || 0).toLocaleString(
    'id-ID'
  )
}


// ======================================================
// PAGE
// ======================================================

export default function KatalogPage() {
  const {
    filteredProducts,
    jenisList,
    selectedJenis,
    setSelectedJenis,
    loading,
  } = useKatalogData()

  const [cart, setCart] = useState([])

  const [rentalSchedule, setRentalSchedule] =
    useState({
      tanggal_mulai: '',
      tanggal_selesai: '',
      tanggal_pengecekan: '',
    })

  const [isCartOpen, setIsCartOpen] =
    useState(false)

  const [isPaketOpen, setIsPaketOpen] =
    useState(false)

  const [isSatuanOpen, setIsSatuanOpen] =
    useState(false)


  // ====================================================
  // SYNC CART WITH LATEST PRODUCT STOCK
  // ====================================================

  useEffect(() => {
    if (!filteredProducts?.length) return

    setCart((prevCart) => {
      let changed = false

      const nextCart = prevCart
        .map((cartItem) => {
          const latestProduct =
            filteredProducts.find(
              (product) =>
                product.id === cartItem.id
            )

          if (!latestProduct) {
            return cartItem
          }

          const latestStock =
            getProductStock(latestProduct)

          if (latestStock <= 0) {
            changed = true
            return null
          }

          const correctedQty = Math.min(
            cartItem.qty,
            latestStock
          )

          if (
            correctedQty !== cartItem.qty ||
            latestStock !==
              getProductStock(cartItem)
          ) {
            changed = true

            return {
              ...cartItem,
              ...latestProduct,
              qty: correctedQty,
            }
          }

          return cartItem
        })
        .filter(Boolean)

      return changed ? nextCart : prevCart
    })
  }, [filteredProducts])


  // ====================================================
  // ADD TO CART
  // ====================================================

  const addToCart = (product) => {
    const stock = getProductStock(product)
    const namaProduk = getProductName(product)

    if (stock <= 0) {
      toast.error(
        `${namaProduk} sedang tidak tersedia.`
      )
      return
    }

    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.id === product.id
      )

      if (existing) {
        if (existing.qty >= stock) {
          toast.error(
            `Stok ${namaProduk} hanya ${stock} item.`
          )

          return prevCart
        }

        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                ...product,
                qty: item.qty + 1,
              }
            : item
        )
      }

      return [
        ...prevCart,
        {
          ...product,
          qty: 1,
        },
      ]
    })

    toast.success(
      `${namaProduk} ditambahkan ke keranjang!`
    )
  }


  // ====================================================
  // PRODUCT GROUPING
  // ====================================================

  const paketProducts = useMemo(
    () =>
      filteredProducts.filter(
        (item) =>
          item.JENIS
            ?.toLowerCase()
            .includes('paket') ||
          item.KATEGORI
            ?.toLowerCase()
            .includes('paket')
      ),
    [filteredProducts]
  )

  const satuanProducts = useMemo(
    () =>
      filteredProducts.filter(
        (item) =>
          !(
            item.JENIS
              ?.toLowerCase()
              .includes('paket') ||
            item.KATEGORI
              ?.toLowerCase()
              .includes('paket')
          )
      ),
    [filteredProducts]
  )


  const cartCount = cart.reduce(
    (acc, item) => acc + item.qty,
    0
  )


  return (
    <main className="min-h-screen bg-background text-foreground relative">

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#25263A',
            color: '#FFFFFF',
          },
          success: {
            iconTheme: {
              primary: '#00AFEF',
              secondary: '#FFFFFF',
            },
          },
        }}
      />

      <div className="
        max-w-6xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
      ">


        {/* ==================================================
            HERO / HEADER
        ================================================== */}

        <section className="
          pt-8
          sm:pt-12
          pb-5
        ">

          <div className="
            inline-flex
            items-center
            gap-1.5
            px-3
            py-1
            rounded-full
            bg-brand-light-cyan
            text-brand-dark-cyan
            text-[10px]
            sm:text-xs
            font-bold
            tracking-wide
            mb-3
          ">
            <TentTree size={14} />

            ONE STOP CAMPING SOLUTION
          </div>


          <h1 className="
            text-2xl
            sm:text-4xl
            lg:text-5xl
            font-bold
            leading-tight
            text-foreground
          ">
            Katalog Perlengkapan
            <br className="sm:hidden" />
            {' '}Camping & Outdoor
          </h1>


          <p className="
            text-xs
            sm:text-base
            text-muted
            mt-2
            max-w-2xl
          ">
            Temukan perlengkapan camping,
            hiking, dan outdoor sesuai kebutuhan
            petualangan Anda.
          </p>

        </section>


        {/* ==================================================
            FILTER
        ================================================== */}

        {!loading &&
          jenisList.length > 0 && (

            <div className="
              flex
              items-center
              gap-2
              overflow-x-auto
              py-4
              scrollbar-thin
            ">

              <button
                onClick={() =>
                  setSelectedJenis('SEMUA')
                }
                className={`
                  px-4
                  py-2
                  rounded-full
                  text-xs
                  font-semibold
                  whitespace-nowrap
                  transition
                  ${
                    selectedJenis === 'SEMUA'
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'bg-white text-muted border border-border hover:bg-brand-light-blue hover:text-brand-blue'
                  }
                `}
              >
                Semua Jenis
              </button>


              {jenisList.map((jenis) => (

                <button
                  key={jenis}
                  onClick={() =>
                    setSelectedJenis(jenis)
                  }
                  className={`
                    px-4
                    py-2
                    rounded-full
                    text-xs
                    font-semibold
                    whitespace-nowrap
                    transition
                    ${
                      selectedJenis === jenis
                        ? 'bg-brand-blue text-white shadow-sm'
                        : 'bg-white text-muted border border-border hover:bg-brand-light-blue hover:text-brand-blue'
                    }
                  `}
                >
                  {jenis}
                </button>

              ))}

            </div>

          )}


        {/* ==================================================
            LOADING
        ================================================== */}

        {loading ? (

          <div className="py-20 text-center">

            <div className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-brand-light-cyan
              text-brand-blue
              text-sm
              font-medium
            ">
              <Clock3
                size={16}
                className="animate-pulse"
              />

              Memuat data pricelist aktif...
            </div>

          </div>

        ) : (

          <div className="space-y-8 pb-12">


            {/* ==================================================
                SATUAN
            ================================================== */}

            <CatalogSection
              title="KATALOG SATUAN"
              icon={
                <TentTree size={18} />
              }
              count={satuanProducts.length}
              open={isSatuanOpen}
              onToggle={() =>
                setIsSatuanOpen(
                  !isSatuanOpen
                )
              }
              variant="blue"
            >

              {satuanProducts.length === 0 ? (

                <EmptyState text="
                  Belum ada produk satuan untuk
                  kategori ini.
                " />

              ) : (

                <ProductGrid>
                  {satuanProducts.map(
                    (product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                      />
                    )
                  )}
                </ProductGrid>

              )}

            </CatalogSection>


            {/* ==================================================
                PAKET
            ================================================== */}

            <CatalogSection
              title="KATALOG PAKET"
              icon={
                <Package size={18} />
              }
              count={paketProducts.length}
              open={isPaketOpen}
              onToggle={() =>
                setIsPaketOpen(
                  !isPaketOpen
                )
              }
              variant="cyan"
            >

              {paketProducts.length === 0 ? (

                <EmptyState text="
                  Tidak ada paket tersedia
                  untuk kategori ini.
                " />

              ) : (

                <ProductGrid>
                  {paketProducts.map(
                    (product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                      />
                    )
                  )}
                </ProductGrid>

              )}

            </CatalogSection>

          </div>

        )}

      </div>


      {/* ==================================================
          FLOATING CART BUTTON (DI SISI KIRI BAWAH)
          Aman dari tombol WhatsApp layout di kanan bawah
      ================================================== */}

      {/* ==================================================
          FLOATING CART BUTTON (DISERAGAMKAN TINGGINYA)
      ================================================== */}

      <button
        onClick={() => setIsCartOpen(true)}
        className="
          fixed
          bottom-6
          right-22
          z-40
          h-14
          bg-brand-cyan
          text-white
          px-5
          rounded-full
          text-sm
          sm:text-base
          font-bold
          shadow-xl
          hover:bg-brand-dark-cyan
          transition-all
          duration-300
          flex
          items-center
          gap-2.5
          scale-100
          hover:scale-105
        "
        aria-label="Keranjang Belanja"
      >
        <ShoppingCart size={20} />
        <span className="hidden sm:inline">
          Keranjang
        </span>
        <span className="bg-white text-brand-cyan px-2 py-0.5 rounded-full text-xs font-extrabold">
          {cartCount}
        </span>
      </button>


      {/* ==================================================
          CART MODAL
      ================================================== */}

      {isCartOpen && (

        <CartModal
          cart={cart}
          setCart={setCart}
          rentalSchedule={rentalSchedule}
          setRentalSchedule={
            setRentalSchedule
          }
          onClose={() =>
            setIsCartOpen(false)
          }
          filteredProducts={
            filteredProducts
          }
        />

      )}

    </main>
  )
}


// ======================================================
// CATALOG SECTION
// ======================================================

function CatalogSection({
  title,
  icon,
  count,
  open,
  onToggle,
  variant,
  children,
}) {
  const isBlue = variant === 'blue'

  return (
    <section className="
      bg-surface
      rounded-xl
      border
      border-border
      shadow-sm
      overflow-hidden
    ">

      <button
        type="button"
        onClick={onToggle}
        className={`
          w-full
          px-5
          sm:px-6
          py-4
          flex
          justify-between
          items-center
          text-left
          transition
          ${
            isBlue
              ? 'bg-brand-light-blue hover:bg-brand-light-blue/70'
              : 'bg-brand-light-cyan hover:bg-brand-light-cyan/70'
          }
        `}
      >

        <div className="
          flex
          items-center
          gap-2
        ">

          <span className={
            isBlue
              ? 'text-brand-dark-blue'
              : 'text-brand-dark-cyan'
          }>
            {icon}
          </span>

          <h2 className={`
            text-sm
            sm:text-base
            font-bold
            ${
              isBlue
                ? 'text-brand-dark-blue'
                : 'text-brand-dark-cyan'
            }
          `}>
            {title}
          </h2>

          <span className="
            text-[10px]
            bg-white
            px-2
            py-0.5
            rounded-full
            font-semibold
            text-brand-blue
          ">
            {count} Item
          </span>

        </div>


        <span className="
          text-brand-blue
        ">
          {open ? (
            <ChevronUp size={17} />
          ) : (
            <ChevronDown size={17} />
          )}
        </span>

      </button>


      {open && (
        <div className="p-4">
          {children}
        </div>
      )}

    </section>
  )
}


// ======================================================
// PRODUCT GRID
// ======================================================

function ProductGrid({ children }) {
  return (
    <div className="
      grid
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-4
      lg:grid-cols-5
      gap-2
    ">
      {children}
    </div>
  )
}


// ======================================================
// PRODUCT CARD
// ======================================================

function ProductCard({
  product,
  addToCart,
}) {
  const namaProduk =
    getProductName(product)

  const harga =
    getProductPrice(product)

  const stok =
    getProductStock(product)

  const gambarUrl =
    product?.['LINK FOTO'] ||
    product?.GAMBAR ||
    ''

  const [imageSrc, setImageSrc] = useState(() => {
    if (!gambarUrl) return '/favicon.ico'
    return getDirectDriveUrl(gambarUrl)
  })

  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    if (!gambarUrl) {
      setImageSrc('/favicon.ico')
    } else {
      setImageSrc(getDirectDriveUrl(gambarUrl))
    }
    setImageFailed(false)
  }, [gambarUrl])

  const handleImageError = () => {
    const fallback = getDriveThumbnailUrl(gambarUrl)

    if (
      fallback &&
      imageSrc !== fallback
    ) {
      setImageSrc(fallback)
      return
    }

    // Jika gagal semua, gunakan favicon lokal
    if (imageSrc !== '/favicon.ico') {
      setImageSrc('/favicon.ico')
      return
    }

    setImageFailed(true)
  }


  const isOutOfStock = stok <= 0


  return (
    <div className="
      bg-white
      p-2
      rounded-lg
      shadow-sm
      border
      border-border
      flex
      flex-col
      justify-between
      text-[10px]
      hover:border-brand-cyan/40
      hover:shadow-md
      transition
    ">

      <div>

        <div className="
          w-full
          aspect-square
          bg-brand-light-cyan
          rounded-md
          mb-1
          overflow-hidden
          flex
          items-center
          justify-center
        ">

          {!imageFailed &&
          imageSrc ? (

            <img
              src={imageSrc || '/logo/favicon.ico'}
              alt={namaProduk}
              className="
                w-full
                h-full
                object-cover
              "
              onError={
                handleImageError
              }
            />

          ) : (

            <div className="
              flex
              flex-col
              items-center
              justify-center
              gap-1
              text-muted
            ">
              <ImageOff size={20} />

              <span className="text-[8px]">
                No Image
              </span>
            </div>

          )}

        </div>


        <div className="
          flex
          gap-1
          mb-1
          flex-wrap
        ">

          {product.JENIS && (

            <span className="
              text-[8px]
              font-bold
              px-1
              py-0.5
              bg-brand-light-cyan
              text-brand-dark-cyan
              border
              border-brand-cyan/10
              rounded-sm
            ">
              {product.JENIS}
            </span>

          )}

        </div>


        <h2 className="
          text-[11px]
          font-semibold
          leading-tight
          line-clamp-2
          text-foreground
        ">
          {namaProduk}
        </h2>

      </div>


      <div className="mt-2">

        <div className="mb-1">

          <span className="
            block
            text-[11px]
            font-bold
            text-brand-blue
          ">
            Rp {formatRupiah(harga)}
          </span>


          <span className="
            text-[9px]
            text-muted
          ">
            Stok:{' '}
            {stok}
          </span>

        </div>


        <button
          type="button"
          disabled={isOutOfStock}
          onClick={() =>
            addToCart(product)
          }
          className="
            w-full
            bg-brand-blue
            text-white
            py-1.5
            rounded
            text-[10px]
            font-medium
            hover:bg-brand-dark-blue
            transition
            disabled:bg-gray-300
            disabled:text-gray-500
            disabled:cursor-not-allowed
          "
        >
          {isOutOfStock
            ? 'Stok Habis'
            : '+ Keranjang'}
        </button>

      </div>

    </div>
  )
}


// ======================================================
// EMPTY STATE
// ======================================================

function EmptyState({ text }) {
  return (
    <div className="
      py-10
      text-center
      text-xs
      text-muted
      flex
      flex-col
      items-center
      gap-2
    ">
      <Package size={22} />
      {text}
    </div>
  )
}


// ======================================================
// CART MODAL
// ======================================================

function CartModal({
  cart,
  setCart,
  rentalSchedule,
  setRentalSchedule,
  onClose,
  filteredProducts,
}) {
  const [step, setStep] =
    useState('cart')

  const [formData, setFormData] =
    useState({
      nama: '',
      wa: '',
      jenis_customer: 'UMUM',
      jasa_antar_jemput: 'TIDAK',
      alamat_tujuan: '',
      jenis_kendaraan: 'Sepeda Motor',
      jarak_km: '',
      jasa_pasang_bongkar: 'TIDAK',
    })

  const [
    pasangBongkarItems,
    setPasangBongkarItems,
  ] = useState({})

  const [submitting, setSubmitting] =
    useState(false)


  // ====================================================
  // SYNC PASANG BONGKAR WITH CART
  // ====================================================

  useEffect(() => {
    setPasangBongkarItems(
      (prev) => {
        const next = {}

        cart.forEach((item) => {
          const previous =
            prev[item.id]

          const maxQty =
            Math.max(
              1,
              item.qty
            )

          next[item.id] = {
            selected:
              previous?.selected ||
              false,
            qty: Math.min(
              previous?.qty || item.qty,
              maxQty
            ),
          }
        })

        return next
      }
    )
  }, [cart])


  // ====================================================
  // TOTAL
  // ====================================================

  const totalHarga = cart.reduce(
    (acc, item) =>
      acc +
      getProductPrice(item) *
        item.qty,
    0
  )


  // ====================================================
  // DATE LIMIT
  // ====================================================

  const getMinMaxPengecekan = () => {
    if (
      !rentalSchedule.tanggal_mulai
    ) {
      return {
        min: '',
        max: '',
      }
    }

    const startDate =
      new Date(
        rentalSchedule.tanggal_mulai
      )

    const minDate =
      new Date(
        startDate.getTime() -
          3 *
            24 *
            60 *
            60 *
            1000
      )

    return {
      min:
        formatDateTimeLocal(
          minDate
        ),
      max:
        rentalSchedule.tanggal_mulai,
    }
  }


  const {
    min: minPengecekan,
    max: maxPengecekan,
  } =
    getMinMaxPengecekan()


  // ====================================================
  // DATE HANDLERS
  // ====================================================

  const handleStartDateChange = (
    value
  ) => {
    setRentalSchedule(
      (prev) => {
        let selesai =
          prev.tanggal_selesai

        if (
          selesai &&
          selesai < value
        ) {
          selesai = value
        }

        return {
          ...prev,
          tanggal_mulai:
            value,
          tanggal_selesai:
            selesai,
          tanggal_pengecekan:
            '',
        }
      }
    )
  }


  const handleEndDateChange = (
    value
  ) => {
    if (
      rentalSchedule.tanggal_mulai &&
      value <
        rentalSchedule.tanggal_mulai
    ) {
      toast.error(
        'Tanggal selesai tidak boleh sebelum tanggal mulai.'
      )
      return
    }

    setRentalSchedule(
      (prev) => ({
        ...prev,
        tanggal_selesai:
          value,
      })
    )
  }


  // ====================================================
  // CART ACTIONS
  // ====================================================

  const updateQty = (
    id,
    delta
  ) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) => {
            if (item.id !== id) {
              return item
            }

            const stock =
              getProductStock(item)

            const newQty =
              Math.min(
                stock,
                item.qty + delta
              )

            if (newQty <= 0) {
              return null
            }

            return {
              ...item,
              qty: newQty,
            }
          })
          .filter(Boolean)
    )
  }


  const removeItem = (id) => {
    setCart(
      (prevCart) =>
        prevCart.filter(
          (item) =>
            item.id !== id
        )
    )

    toast.success(
      'Item dihapus dari keranjang'
    )
  }


  // ====================================================
  // GOOGLE MAPS
  // ====================================================

  const openGoogleMapsStore = () => {
    window.open(
      STORE_MAPS_URL,
      '_blank',
      'noopener,noreferrer'
    )

    toast(
      'Cek titik toko di Google Maps untuk memperkirakan jarak.',
      {
        icon: (
          <MapPin size={18} />
        ),
        duration: 4000,
      }
    )
  }


  // ====================================================
  // PASANG BONGKAR
  // ====================================================

  const handleToggleItemPB = (
    id
  ) => {
    setPasangBongkarItems(
      (prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          selected:
            !prev[id]?.selected,
        },
      })
    )
  }


  const handleQtyItemPB = (
    id,
    delta,
    maxQty
  ) => {
    setPasangBongkarItems(
      (prev) => {
        const currentQty =
          prev[id]?.qty || 1

        const newQty =
          Math.max(
            1,
            Math.min(
              maxQty,
              currentQty +
                delta
            )
          )

        return {
          ...prev,
          [id]: {
            ...prev[id],
            qty: newQty,
          },
        }
      }
    )
  }


  // ====================================================
  // VALIDATE CART AGAINST CURRENT PRODUCTS
  // ====================================================

  const validateCartBeforeCheckout = () => {
    if (!cart.length) {
      return {
        valid: false,
        message:
          'Keranjang masih kosong.',
      }
    }

    for (const item of cart) {
      const latest =
        filteredProducts.find(
          (product) =>
            product.id === item.id
        )

      if (!latest) {
        return {
          valid: false,
          message:
            `${getProductName(item)} sudah tidak tersedia.`,
        }
      }

      const latestStock =
        getProductStock(latest)

      if (latestStock <= 0) {
        return {
          valid: false,
          message:
            `Stok ${getProductName(item)} sudah habis.`,
        }
      }

      if (
        item.qty <= 0 ||
        item.qty >
          latestStock
      ) {
        return {
          valid: false,
          message:
            `Qty ${getProductName(item)} melebihi stok terbaru (${latestStock}).`,
        }
      }

      const price =
        getProductPrice(latest)

      if (
        !Number.isFinite(price) ||
        price < 0
      ) {
        return {
          valid: false,
          message:
            `Harga ${getProductName(item)} tidak valid.`,
        }
      }
    }

    return {
      valid: true,
    }
  }


  // ====================================================
  // PROCEED TO FORM
  // ====================================================

  const handleProceedToForm = () => {
    if (!cart.length) {
      toast.error(
        'Keranjang masih kosong!'
      )
      return
    }

    const cartValidation =
      validateCartBeforeCheckout()

    if (!cartValidation.valid) {
      toast.error(
        cartValidation.message
      )
      return
    }


    if (
      !rentalSchedule.tanggal_mulai ||
      !rentalSchedule.tanggal_selesai ||
      !rentalSchedule.tanggal_pengecekan
    ) {
      toast.error(
        'Mohon lengkapi jadwal sewa dan tanggal pengecekan alat terlebih dahulu!'
      )
      return
    }


    if (
      rentalSchedule.tanggal_selesai <
      rentalSchedule.tanggal_mulai
    ) {
      toast.error(
        'Tanggal selesai tidak boleh sebelum tanggal mulai.'
      )
      return
    }


    const tglPengecekan =
      new Date(
        rentalSchedule.tanggal_pengecekan
      ).getTime()

    const minTime =
      new Date(
        minPengecekan
      ).getTime()

    const maxTime =
      new Date(
        maxPengecekan
      ).getTime()


    if (
      !Number.isFinite(
        tglPengecekan
      ) ||
      tglPengecekan <
        minTime ||
      tglPengecekan >
        maxTime
    ) {
      toast.error(
        'Tanggal pengecekan harus berada di antara H-3 hingga jam sewa mulai!'
      )
      return
    }


    setPasangBongkarItems(
      (prev) => {
        const next = {}

        cart.forEach((item) => {
          next[item.id] = {
            selected:
              prev[item.id]
                ?.selected ||
              false,
            qty: Math.min(
              prev[item.id]?.qty ||
                item.qty,
              item.qty
            ),
          }
        })

        return next
      }
    )


    setStep('form')
  }


  // ====================================================
  // CHECKOUT
  // ====================================================

  const handleCheckout = async (
    e
  ) => {
    e.preventDefault()

    if (submitting) {
      return
    }

    setSubmitting(true)

    try {
      // -----------------------------------------------
      // BASIC SANITIZATION
      // -----------------------------------------------

      const nama =
        sanitizeText(
          formData.nama,
          100
        )

      const wa =
        normalizeWhatsApp(
          formData.wa
        )

      const alamat =
        sanitizeAddress(
          formData.alamat_tujuan
        )

      if (nama.length < 2) {
        throw new Error(
          'Nama customer tidak valid.'
        )
      }

      if (
        !isValidWhatsApp(wa)
      ) {
        throw new Error(
          'Nomor WhatsApp Indonesia tidak valid. Contoh: 08123456789 atau +628123456789.'
        )
      }


      // -----------------------------------------------
      // DATE VALIDATION
      // -----------------------------------------------

      if (
        !rentalSchedule.tanggal_mulai ||
        !rentalSchedule.tanggal_selesai ||
        !rentalSchedule.tanggal_pengecekan
      ) {
        throw new Error(
          'Jadwal sewa dan pengecekan wajib lengkap.'
        )
      }


      if (
        rentalSchedule.tanggal_selesai <
        rentalSchedule.tanggal_mulai
      ) {
        throw new Error(
          'Tanggal selesai tidak boleh sebelum tanggal mulai.'
        )
      }


      const startTime =
        new Date(
          rentalSchedule.tanggal_mulai
        ).getTime()

      const checkTime =
        new Date(
          rentalSchedule.tanggal_pengecekan
        ).getTime()

      const minCheckTime =
        startTime -
        3 *
          24 *
          60 *
          60 *
          1000


      if (
        checkTime <
          minCheckTime ||
        checkTime >
          startTime
      ) {
        throw new Error(
          'Tanggal pengecekan harus berada di antara H-3 hingga waktu mulai sewa.'
        )
      }


      // -----------------------------------------------
      // DELIVERY VALIDATION
      // -----------------------------------------------

      let jarakKm = 0

      if (
        formData.jasa_antar_jemput !==
        'TIDAK'
      ) {
        if (!alamat) {
          throw new Error(
            'Alamat antar/jemput wajib diisi.'
          )
        }

        jarakKm =
          normalizeDistance(
            formData.jarak_km
          )

        if (
          jarakKm === null
        ) {
          throw new Error(
            'Jarak KM harus berupa angka lebih dari 0.'
          )
        }
      }


      // -----------------------------------------------
      // PASANG BONGKAR VALIDATION
      // -----------------------------------------------

      const selectedPB =
        Object.entries(
          pasangBongkarItems
        )
          .filter(
            ([, value]) =>
              value?.selected
          )

      if (
        formData.jasa_pasang_bongkar ===
        'PASANG & BONGKAR'
      ) {
        if (
          selectedPB.length === 0
        ) {
          throw new Error(
            'Pilih minimal satu alat untuk jasa pasang & bongkar.'
          )
        }

        for (
          const [
            id,
            value,
          ] of selectedPB
        ) {
          const item =
            cart.find(
              (cartItem) =>
                String(
                  cartItem.id
                ) === String(id)
            )

          if (!item) {
            throw new Error(
              'Data alat pasang & bongkar tidak valid.'
            )
          }

          if (
            value.qty < 1 ||
            value.qty >
              item.qty
          ) {
            throw new Error(
              `Qty pasang & bongkar untuk ${getProductName(item)} tidak boleh melebihi qty rental.`
            )
          }
        }
      }


      // -----------------------------------------------
      // FINAL CART VALIDATION
      // -----------------------------------------------

      const cartValidation =
        validateCartBeforeCheckout()

      if (!cartValidation.valid) {
        throw new Error(
          cartValidation.message
        )
      }


      // -----------------------------------------------
      // BUILD PB DETAIL
      // -----------------------------------------------

      const rincianPasangBongkar =
        formData.jasa_pasang_bongkar ===
        'PASANG & BONGKAR'
          ? cart
              .filter(
                (item) =>
                  pasangBongkarItems[
                    item.id
                  ]?.selected
              )
              .map((item) => ({
                item_id:
                  String(item.id),

                nama:
                  getProductName(
                    item
                  ),

                qty_pasang:
                  Math.min(
                    pasangBongkarItems[
                      item.id
                    ]?.qty || 1,
                    item.qty
                  ),
              }))
          : []


      // -----------------------------------------------
      // ONE ROW PER PRODUCT
      // -----------------------------------------------

      const bookingPayloads =
        cart.map((item) => ({
          customer_nama:
            nama,

          customer_wa:
            wa,

          jenis_customer:
            formData.jenis_customer,

          jasa_antar_jemput:
            formData.jasa_antar_jemput,

          lokasi_maps:
            formData.jasa_antar_jemput !==
            'TIDAK'
              ? alamat
              : null,

          jenis_kendaraan:
            formData.jasa_antar_jemput !==
            'TIDAK'
              ? formData.jenis_kendaraan
              : null,

          jarak_km:
            formData.jasa_antar_jemput !==
            'TIDAK'
              ? jarakKm
              : 0,

          jasa_pasang_bongkar:
            formData.jasa_pasang_bongkar,

          rincian_pasang_bongkar:
            rincianPasangBongkar.length >
            0
              ? rincianPasangBongkar
              : null,

          item_id:
            String(item.id),

          tanggal_mulai:
            rentalSchedule.tanggal_mulai,

          tanggal_selesai:
            rentalSchedule.tanggal_selesai,

          tanggal_pengecekan:
            rentalSchedule.tanggal_pengecekan,

          total_biaya:
            getProductPrice(
              item
            ) * item.qty,

          status: 'pending',
        }))


      // -----------------------------------------------
      // INSERT
      // -----------------------------------------------

      const {
        error,
      } = await supabase
        .from('bookings')
        .insert(
          bookingPayloads
        )

      if (error) {
        throw error
      }


      // -----------------------------------------------
      // SUCCESS
      // -----------------------------------------------

      toast.success(
        'Konfirmasi booking berhasil! Pesanan tercatat.'
      )

      setCart([])

      setRentalSchedule({
        tanggal_mulai: '',
        tanggal_selesai: '',
        tanggal_pengecekan: '',
      })

      setFormData({
        nama: '',
        wa: '',
        jenis_customer: 'UMUM',
        jasa_antar_jemput: 'TIDAK',
        alamat_tujuan: '',
        jenis_kendaraan:
          'Sepeda Motor',
        jarak_km: '',
        jasa_pasang_bongkar:
          'TIDAK',
      })

      setPasangBongkarItems({})

      setTimeout(() => {
        onClose()
      }, 1200)

    } catch (error) {
      toast.error(
        error?.message ||
          'Gagal melakukan booking.'
      )
    } finally {
      setSubmitting(false)
    }
  }


  return (
    <div className="
      fixed
      inset-0
      bg-brand-dark-blue/60
      backdrop-blur-sm
      flex
      items-center
      justify-center
      p-4
      z-50
    ">

      <div className="
        bg-surface
        p-5
        sm:p-6
        rounded-2xl
        max-w-lg
        w-full
        shadow-2xl
        border
        border-border
        max-h-[90vh]
        overflow-y-auto
      ">


        {/* ==================================================
            CART STEP
        ================================================== */}

        {step === 'cart' && (

          <div>

            <div className="
              flex
              items-center
              justify-between
              mb-5
            ">

              <div>

                <h2 className="
                  text-xl
                  font-bold
                ">
                  Keranjang & Jadwal
                </h2>

                <p className="
                  text-xs
                  text-muted
                  mt-1
                ">
                  Atur perlengkapan dan
                  jadwal penyewaan Anda.
                </p>

              </div>


              <button
                type="button"
                onClick={onClose}
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-brand-light-blue
                  text-brand-blue
                  hover:bg-brand-blue
                  hover:text-white
                  transition
                  flex
                  items-center
                  justify-center
                "
              >
                <X size={17} />
              </button>

            </div>


            {cart.length === 0 ? (

              <div className="
                py-8
                text-center
                space-y-4
              ">

                <ShoppingCart
                  className="
                    mx-auto
                    text-muted
                  "
                  size={30}
                />

                <p className="text-muted">
                  Keranjang Anda masih
                  kosong.
                </p>

                <button
                  type="button"
                  onClick={onClose}
                  className="
                    px-4
                    bg-brand-light-blue
                    text-brand-blue
                    py-2
                    rounded-lg
                    text-sm
                    font-medium
                  "
                >
                  Tutup
                </button>

              </div>

            ) : (

              <div className="space-y-4">


                {/* RENTAL SCHEDULE */}

                <div className="
                  bg-brand-light-cyan
                  p-4
                  rounded-xl
                  border
                  border-brand-cyan/20
                  space-y-3
                ">

                  <div className="
                    flex
                    items-center
                    gap-2
                  ">

                    <CalendarDays
                      size={16}
                      className="
                        text-brand-blue
                      "
                    />

                    <p className="
                      text-xs
                      font-semibold
                      text-brand-dark-blue
                    ">
                      Atur Jadwal Sewa &
                      Pengecekan
                    </p>

                  </div>


                  <div className="
                    grid
                    grid-cols-2
                    gap-2
                  ">

                    <div>

                      <label className="
                        block
                        text-[11px]
                        font-medium
                        mb-1
                      ">
                        Mulai Sewa
                      </label>

                      <input
                        type="datetime-local"
                        className={
                          inputClass
                        }
                        required
                        value={
                          rentalSchedule.tanggal_mulai
                        }
                        onChange={(e) =>
                          handleStartDateChange(
                            e.target.value
                          )
                        }
                      />

                    </div>


                    <div>

                      <label className="
                        block
                        text-[11px]
                        font-medium
                        mb-1
                      ">
                        Selesai Sewa
                      </label>

                      <input
                        type="datetime-local"
                        className={
                          inputClass
                        }
                        required
                        min={
                          rentalSchedule.tanggal_mulai ||
                          undefined
                        }
                        value={
                          rentalSchedule.tanggal_selesai
                        }
                        onChange={(e) =>
                          handleEndDateChange(
                            e.target.value
                          )
                        }
                      />

                    </div>

                  </div>


                  <div>

                    <label className="
                      block
                      text-[11px]
                      font-medium
                      mb-1
                    ">
                      Tanggal & Jam
                      Pengecekan Alat

                      <span className="
                        text-[10px]
                        text-muted
                        block
                        font-normal
                      ">
                        Berlaku maksimal H-3
                        sampai jam sewa mulai
                      </span>

                    </label>


                    <input
                      type="datetime-local"
                      className={
                        inputClass
                      }
                      required
                      disabled={
                        !rentalSchedule.tanggal_mulai
                      }
                      min={
                        minPengecekan
                      }
                      max={
                        maxPengecekan
                      }
                      value={
                        rentalSchedule.tanggal_pengecekan
                      }
                      onChange={(e) =>
                        setRentalSchedule(
                          (prev) => ({
                            ...prev,
                            tanggal_pengecekan:
                              e.target.value,
                          })
                        )
                      }
                    />

                  </div>

                </div>


                {/* CART ITEMS */}

                <div className="
                  divide-y
                  max-h-48
                  overflow-y-auto
                  border-b
                  border-t
                  border-border
                ">

                  {cart.map(
                    (item) => {

                      const stock =
                        getProductStock(
                          item
                        )

                      return (
                        <div
                          key={item.id}
                          className="
                            py-3
                            flex
                            justify-between
                            items-center
                            gap-2
                            text-sm
                          "
                        >

                          <div className="pr-2">

                            <p className="
                              font-semibold
                            ">
                              {getProductName(
                                item
                              )}
                            </p>

                            <p className="
                              text-brand-blue
                              font-medium
                            ">
                              Rp{' '}
                              {formatRupiah(
                                getProductPrice(
                                  item
                                )
                              )}
                            </p>

                            <p className="
                              text-[10px]
                              text-muted
                            ">
                              Stok: {stock}
                            </p>

                          </div>


                          <div className="
                            flex
                            items-center
                            gap-2
                          ">

                            <div className="
                              flex
                              items-center
                              border
                              border-border
                              rounded-lg
                              overflow-hidden
                            ">

                              <button
                                type="button"
                                onClick={() =>
                                  updateQty(
                                    item.id,
                                    -1
                                  )
                                }
                                className="
                                  px-2
                                  py-1
                                  bg-brand-light-blue
                                  text-brand-blue
                                "
                              >
                                <Minus
                                  size={13}
                                />
                              </button>


                              <span className="
                                px-3
                                text-sm
                                font-semibold
                              ">
                                {item.qty}
                              </span>


                              <button
                                type="button"
                                disabled={
                                  item.qty >=
                                  stock
                                }
                                onClick={() =>
                                  updateQty(
                                    item.id,
                                    1
                                  )
                                }
                                className="
                                  px-2
                                  py-1
                                  bg-brand-light-blue
                                  text-brand-blue
                                  disabled:bg-gray-100
                                  disabled:text-gray-300
                                  disabled:cursor-not-allowed
                                "
                              >
                                <Plus
                                  size={13}
                                />
                              </button>

                            </div>


                            <button
                              type="button"
                              onClick={() =>
                                removeItem(
                                  item.id
                                )
                              }
                              className="
                                text-red-500
                                hover:text-red-700
                                p-1
                              "
                              title="Hapus"
                            >
                              <Trash2
                                size={15}
                              />
                            </button>

                          </div>

                        </div>
                      )
                    }
                  )}

                </div>


                {/* TOTAL */}

                <div className="
                  flex
                  justify-between
                  font-bold
                  text-base
                  pt-1
                ">

                  <span>
                    Total Estimasi Biaya:
                  </span>

                  <span className="
                    text-brand-blue
                  ">
                    Rp{' '}
                    {formatRupiah(
                      totalHarga
                    )}
                  </span>

                </div>


                {/* ACTION */}

                <div className="
                  flex
                  gap-2
                  pt-3
                  border-t
                  border-border
                ">

                  <button
                    type="button"
                    onClick={
                      handleProceedToForm
                    }
                    className="
                      flex-1
                      bg-brand-blue
                      text-white
                      py-2.5
                      rounded-lg
                      text-sm
                      font-semibold
                      hover:bg-brand-dark-blue
                      transition
                      flex
                      items-center
                      justify-center
                      gap-1
                    "
                  >
                    Lanjut Isi Data

                    <ArrowRight
                      size={15}
                    />
                  </button>


                  <button
                    type="button"
                    onClick={onClose}
                    className="
                      px-4
                      bg-brand-light-blue
                      text-brand-blue
                      py-2
                      rounded-lg
                      text-sm
                      font-medium
                    "
                  >
                    Tutup
                  </button>

                </div>

              </div>

            )}

          </div>

        )}


        {/* ==================================================
            FORM STEP
        ================================================== */}

        {step === 'form' && (

          <div>

            <div className="
              flex
              justify-between
              items-center
              mb-4
            ">

              <div>

                <h2 className="
                  text-xl
                  font-bold
                ">
                  Data Customer
                </h2>

                <p className="
                  text-xs
                  text-muted
                ">
                  Lengkapi data untuk
                  konfirmasi booking.
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setStep('cart')
                }
                className="
                  text-sm
                  text-brand-blue
                  hover:underline
                  flex
                  items-center
                  gap-1
                "
              >
                <ArrowLeft
                  size={15}
                />

                Kembali
              </button>

            </div>


            {/* SUMMARY */}

            <div className="
              bg-brand-light-blue
              p-4
              rounded-xl
              mb-4
              text-xs
              text-muted
              space-y-1
              border
              border-border
            ">

              <p className="
                font-semibold
                text-brand-dark-blue
                mb-1
              ">
                Ringkasan Jadwal &
                Pesanan
              </p>


              <p>
                <span className="font-medium">
                  Pengecekan:
                </span>{' '}
                {rentalSchedule
                  .tanggal_pengecekan
                  .replace(
                    'T',
                    ' '
                  )}
              </p>


              <p>
                <span className="font-medium">
                  Mulai:
                </span>{' '}
                {rentalSchedule
                  .tanggal_mulai
                  .replace(
                    'T',
                    ' '
                  )}
              </p>


              <p>
                <span className="font-medium">
                  Selesai:
                </span>{' '}
                {rentalSchedule
                  .tanggal_selesai
                  .replace(
                    'T',
                    ' '
                  )}
              </p>


              <div className="
                border-t
                border-border
                my-2
                pt-1
              ">

                {cart.map(
                  (i) => (
                    <div
                      key={i.id}
                      className="
                        flex
                        justify-between
                        py-0.5
                        gap-2
                      "
                    >

                      <span>
                        {i.qty}x{' '}
                        {getProductName(
                          i
                        )}
                      </span>

                      <span className="
                        whitespace-nowrap
                      ">
                        Rp{' '}
                        {formatRupiah(
                          getProductPrice(
                            i
                          ) *
                            i.qty
                        )}
                      </span>

                    </div>
                  )
                )}

              </div>


              <div className="
                border-t
                border-border
                mt-2
                pt-2
                font-bold
                text-foreground
                flex
                justify-between
                text-sm
              ">

                <span>Total:</span>

                <span className="
                  text-brand-blue
                ">
                  Rp{' '}
                  {formatRupiah(
                    totalHarga
                  )}
                </span>

              </div>

            </div>


            {/* FORM */}

            <form
              onSubmit={
                handleCheckout
              }
              className="space-y-3"
            >

              <FormField
                label="Jenis Customer"
                value={
                  formData.jenis_customer
                }
                onChange={(e) =>
                  setFormData(
                    (prev) => ({
                      ...prev,
                      jenis_customer:
                        e.target.value,
                    })
                  )
                }
                options={[
                  [
                    'UMUM',
                    'UMUM',
                  ],
                  [
                    'MEMBER',
                    'MEMBER',
                  ],
                ]}
              />


              <div>

                <label className="
                  block
                  text-xs
                  font-medium
                  mb-1
                ">
                  Nama Lengkap
                </label>

                <div className="
                  relative
                ">

                  <UserRound
                    size={15}
                    className="
                      absolute
                      left-2.5
                      top-1/2
                      -translate-y-1/2
                      text-muted
                    "
                  />

                  <input
                    type="text"
                    placeholder="Masukkan nama Anda"
                    className={`${inputClass} pl-8`}
                    required
                    maxLength={100}
                    value={
                      formData.nama
                    }
                    onChange={(e) =>
                      setFormData(
                        (prev) => ({
                          ...prev,
                          nama: e.target.value,
                        })
                      )
                    }
                  />

                </div>

              </div>


              <div>

                <label className="
                  block
                  text-xs
                  font-medium
                  mb-1
                ">
                  Nomor WhatsApp
                </label>

                <input
                  type="tel"
                  inputMode="tel"
                  placeholder="Contoh: 08123456789"
                  className={
                    inputClass
                  }
                  required
                  value={
                    formData.wa
                  }
                  onChange={(e) =>
                    setFormData(
                      (prev) => ({
                        ...prev,
                        wa: e.target.value,
                      })
                    )
                  }
                />

                <p className="
                  text-[10px]
                  text-muted
                  mt-1
                ">
                  Gunakan nomor WhatsApp
                  Indonesia yang aktif.
                </p>

              </div>


              <FormField
                label="Jasa Antar Jemput"
                value={
                  formData.jasa_antar_jemput
                }
                onChange={(e) =>
                  setFormData(
                    (prev) => ({
                      ...prev,
                      jasa_antar_jemput:
                        e.target.value,
                    })
                  )
                }
                options={[
                  [
                    'TIDAK',
                    'TIDAK (Ambil Sendiri ke Toko)',
                  ],
                  [
                    'ANTAR',
                    'ANTAR SAJA',
                  ],
                  [
                    'JEMPUT',
                    'JEMPUT SAJA',
                  ],
                  [
                    'ANTAR JEMPUT',
                    'ANTAR JEMPUT',
                  ],
                ]}
              />


              {/* DELIVERY */}

              {formData.jasa_antar_jemput !==
                'TIDAK' && (

                <div className="
                  p-4
                  bg-brand-light-cyan
                  border
                  border-brand-cyan/20
                  rounded-xl
                  space-y-3
                ">

                  <div className="
                    flex
                    justify-between
                    items-center
                    gap-2
                  ">

                    <p className="
                      text-xs
                      font-semibold
                      text-brand-dark-blue
                    ">
                      Pengaturan Rute
                      Antar/Jemput
                    </p>


                    <button
                      type="button"
                      onClick={
                        openGoogleMapsStore
                      }
                      className="
                        text-[11px]
                        bg-brand-blue
                        text-white
                        px-2.5
                        py-1
                        rounded-lg
                        flex
                        items-center
                        gap-1
                      "
                    >
                      <MapPin
                        size={12}
                      />

                      Cek Titik Toko
                    </button>

                  </div>


                  <div className="
                    grid
                    grid-cols-2
                    gap-2
                  ">

                    <FormField
                      label="Jenis Kendaraan"
                      value={
                        formData.jenis_kendaraan
                      }
                      onChange={(e) =>
                        setFormData(
                          (prev) => ({
                            ...prev,
                            jenis_kendaraan:
                              e.target.value,
                          })
                        )
                      }
                      options={[
                        [
                          'Sepeda Motor',
                          'Sepeda Motor',
                        ],
                        [
                          'Mobil',
                          'Mobil',
                        ],
                      ]}
                    />


                    <div>

                      <label className="
                        block
                        text-[11px]
                        font-medium
                        mb-1
                      ">
                        Estimasi Jarak
                        (KM)
                      </label>

                      <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        placeholder="Contoh: 3.5"
                        className={
                          inputClass
                        }
                        required
                        value={
                          formData.jarak_km
                        }
                        onChange={(e) =>
                          setFormData(
                            (prev) => ({
                              ...prev,
                              jarak_km:
                                e.target.value,
                            })
                          )
                        }
                      />

                    </div>

                  </div>


                  <div>

                    <label className="
                      block
                      text-[11px]
                      font-medium
                      mb-1
                    ">
                      Alamat Tujuan
                      Pengantaran/
                      Penjemputan
                    </label>

                    <textarea
                      rows="2"
                      placeholder="Masukkan nama jalan, nomor rumah, atau patokan lokasi..."
                      className={
                        inputClass
                      }
                      required
                      maxLength={500}
                      value={
                        formData.alamat_tujuan
                      }
                      onChange={(e) =>
                        setFormData(
                          (prev) => ({
                            ...prev,
                            alamat_tujuan:
                              e.target.value,
                          })
                        )
                      }
                    />

                  </div>

                </div>
              )}


              {/* PASANG BONGKAR */}

              <FormField
                label="Jasa Pasang & Bongkar"
                value={
                  formData.jasa_pasang_bongkar
                }
                onChange={(e) =>
                  setFormData(
                    (prev) => ({
                      ...prev,
                      jasa_pasang_bongkar:
                        e.target.value,
                    })
                  )
                }
                options={[
                  [
                    'TIDAK',
                    'TIDAK',
                  ],
                  [
                    'PASANG & BONGKAR',
                    'PASANG & BONGKAR',
                  ],
                ]}
              />


              {formData.jasa_pasang_bongkar ===
                'PASANG & BONGKAR' && (

                <div className="
                  p-4
                  bg-brand-light-cyan
                  border
                  border-brand-cyan/20
                  rounded-xl
                  space-y-2
                ">

                  <p className="
                    text-xs
                    font-semibold
                    text-brand-dark-blue
                  ">
                    Pilih Alat yang Ingin
                    Dipasang & Dibongkar
                  </p>


                  <p className="
                    text-[10px]
                    text-brand-dark-cyan
                  ">
                    Pilih minimal satu alat.
                    Qty maksimal mengikuti
                    qty rental.
                  </p>


                  <div className="
                    space-y-2
                    max-h-40
                    overflow-y-auto
                    bg-white
                    p-2
                    rounded-lg
                    border
                    border-border
                  ">

                    {cart.map(
                      (item) => {

                        const isSelected =
                          pasangBongkarItems[
                            item.id
                          ]?.selected ||
                          false

                        const currentQtyPB =
                          Math.min(
                            pasangBongkarItems[
                              item.id
                            ]?.qty ||
                              item.qty,
                            item.qty
                          )

                        return (
                          <div
                            key={item.id}
                            className="
                              flex
                              items-center
                              justify-between
                              text-xs
                              py-1.5
                              border-b
                              last:border-0
                              border-border
                              gap-2
                            "
                          >

                            <label className="
                              flex
                              items-center
                              gap-2
                              cursor-pointer
                              flex-1
                              pr-2
                            ">

                              <input
                                type="checkbox"
                                checked={
                                  isSelected
                                }
                                onChange={() =>
                                  handleToggleItemPB(
                                    item.id
                                  )
                                }
                                className="
                                  rounded
                                  border-border
                                  text-brand-blue
                                "
                              />


                              <span className={
                                isSelected
                                  ? 'font-semibold text-foreground'
                                  : 'text-muted'
                              }>
                                {getProductName(
                                  item
                                )}

                                <span className="
                                  text-[10px]
                                  text-muted
                                ">
                                  {' '}
                                  (Max:{' '}
                                  {item.qty})
                                </span>

                              </span>

                            </label>


                            {isSelected && (

                              <div className="
                                flex
                                items-center
                                gap-1
                              ">

                                <span className="
                                  text-[10px]
                                  text-muted
                                ">
                                  Qty:
                                </span>


                                <button
                                  type="button"
                                  disabled={
                                    currentQtyPB <=
                                    1
                                  }
                                  onClick={() =>
                                    handleQtyItemPB(
                                      item.id,
                                      -1,
                                      item.qty
                                    )
                                  }
                                  className="
                                    w-5
                                    h-5
                                    bg-brand-light-blue
                                    text-brand-blue
                                    rounded
                                    flex
                                    items-center
                                    justify-center
                                    disabled:opacity-40
                                  "
                                >
                                  <Minus
                                    size={11}
                                  />
                                </button>


                                <span className="
                                  w-6
                                  text-center
                                  font-semibold
                                ">
                                  {currentQtyPB}
                                </span>


                                <button
                                  type="button"
                                  disabled={
                                    currentQtyPB >=
                                    item.qty
                                  }
                                  onClick={() =>
                                    handleQtyItemPB(
                                      item.id,
                                      1,
                                      item.qty
                                    )
                                  }
                                  className="
                                    w-5
                                    h-5
                                    bg-brand-light-blue
                                    text-brand-blue
                                    rounded
                                    flex
                                    items-center
                                    justify-center
                                    disabled:opacity-40
                                  "
                                >
                                  <Plus
                                    size={11}
                                  />
                                </button>

                              </div>

                            )}

                          </div>
                        )
                      }
                    )}

                  </div>

                </div>
              )}


              {/* SUBMIT */}

              <div className="
                flex
                gap-2
                pt-3
                border-t
                border-border
              ">

                <button
                  type="submit"
                  disabled={
                    submitting
                  }
                  className="
                    flex-1
                    bg-brand-cyan
                    text-white
                    py-2.5
                    rounded-lg
                    text-sm
                    font-semibold
                    hover:bg-brand-dark-cyan
                    transition
                    disabled:bg-gray-400
                    disabled:cursor-not-allowed
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >

                  {submitting ? (
                    <>
                      <Clock3
                        size={15}
                        className="animate-spin"
                      />

                      Memproses...
                    </>
                  ) : (
                    <>
                      <Check
                        size={15}
                      />

                      Konfirmasi Booking
                    </>
                  )}

                </button>


                <button
                  type="button"
                  onClick={onClose}
                  disabled={
                    submitting
                  }
                  className="
                    px-4
                    bg-brand-light-blue
                    text-brand-blue
                    py-2
                    rounded-lg
                    text-sm
                    font-medium
                    disabled:opacity-50
                  "
                >
                  Batal
                </button>

              </div>

            </form>

          </div>

        )}

      </div>

    </div>
  )
}


// ======================================================
// FORM FIELD
// ======================================================

const inputClass = `
  w-full
  border
  border-border
  p-2
  rounded-lg
  text-sm
  bg-white
  text-foreground
  focus:outline-none
  focus:ring-2
  focus:ring-brand-cyan/30
  focus:border-brand-cyan
`

function FormField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label className="
        block
        text-xs
        font-medium
        mb-1
      ">
        {label}
      </label>

      <div className="
        relative
      ">

        <select
          className={`${inputClass} appearance-none pr-8`}
          value={value}
          onChange={onChange}
        >

          {options.map(
            ([
              optionValue,
              optionLabel,
            ]) => (
              <option
                key={optionValue}
                value={optionValue}
              >
                {optionLabel}
              </option>
            )
          )}

        </select>

        <ChevronDown
          size={15}
          className="
            absolute
            right-2.5
            top-1/2
            -translate-y-1/2
            pointer-events-none
            text-muted
          "
        />

      </div>

    </div>
  )
}