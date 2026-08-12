'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import toast, { Toaster } from 'react-hot-toast'

export default function KatalogPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  
  // State untuk filter jenis & kategori navbar
  const [jenisList, setJenisList] = useState([])
  const [selectedJenis, setSelectedJenis] = useState('SEMUA')

  const [cart, setCart] = useState([])
  const [rentalSchedule, setRentalSchedule] = useState({
    tanggal_mulai: '',
    tanggal_selesai: '',
    tanggal_pengecekan: ''
  })
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  // Filter produk setiap kali selectedJenis atau products berubah
  useEffect(() => {
    if (selectedJenis === 'SEMUA') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(item => item.JENIS === selectedJenis))
    }
  }, [selectedJenis, products])

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('PRICELIST SATUAN AKTIF')
        .select('*')
      
      if (error) throw error
      
      const listData = data || []
      setProducts(listData)
      setFilteredProducts(listData)

      // Ekstraksi daftar jenis unik untuk navbar
      const uniqueJenis = [...new Set(listData.map(item => item.JENIS).filter(Boolean))]
      setJenisList(uniqueJenis)

    } catch (error) {
      console.error('Error mengambil data pricelist:', error.message)
      toast.error('Gagal memuat data dari tabel Pricelist Aktif')
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id)
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prevCart, { ...product, qty: 1 }]
    })
    toast.success(`${product["NAMA PRICELIST"] || product["NAMA PRICELIS~"]} ditambahkan ke keranjang!`)
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-800 relative">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Katalog Mountcares Outdoor</h1>
            <p className="text-gray-600">Pilih perlengkapan camping dan aksesoris penunjang petualangan Anda.</p>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-orange-700 transition flex items-center gap-2"
          >
            🛒 Keranjang ({cart.reduce((acc, item) => acc + item.qty, 0)})
          </button>
        </div>

        {/* Navbar Filter Jenis */}
        {!loading && jenisList.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
            <button
              onClick={() => setSelectedJenis('SEMUA')}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedJenis === 'SEMUA' 
                  ? 'bg-black text-white shadow' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              Semua Jenis
            </button>
            {jenisList.map((jenis) => (
              <button
                key={jenis}
                onClick={() => setSelectedJenis(jenis)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedJenis === jenis 
                    ? 'bg-black text-white shadow' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {jenis}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <p>Memuat data pricelist aktif...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-gray-500 py-10 text-center">Belum ada produk/pricelist untuk kategori ini.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const namaProduk = product["NAMA PRICELIST"] || product["NAMA PRICELIS~"] || "Tanpa Nama"
              return (
                <div key={product.id} className="bg-white p-5 rounded-lg shadow border border-gray-200 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {product.JENIS && (
                        <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          {product.JENIS}
                        </span>
                      )}
                      {product.KATEGORI && (
                        <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          {product.KATEGORI}
                        </span>
                      )}
                      {product["HOT ITEM"] === 'YA' && (
                        <span className="text-xs font-semibold px-2 py-1 bg-orange-100 text-orange-800 rounded-full">
                          🔥 Hot Item
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold mt-3">{namaProduk}</h2>
                    {product.VARIASI && <p className="text-xs text-gray-500 mt-0.5">Variasi: {product.VARIASI}</p>}
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-orange-600">
                        Rp {Number(product["HARGA SEWA"] || 0).toLocaleString('id-ID')} <span className="text-xs font-normal text-gray-500">/ {product.SATUAN || 'unit'}</span>
                      </span>
                      <span className="text-sm text-gray-500">Stok: {product.STOK}</span>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-black text-white py-2 rounded font-medium hover:bg-gray-800 transition"
                    >
                      + Tambah ke Keranjang
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {isCartOpen && (
        <CartModal 
          cart={cart} 
          setCart={setCart}
          rentalSchedule={rentalSchedule}
          setRentalSchedule={setRentalSchedule}
          onClose={() => setIsCartOpen(false)} 
        />
      )}
    </main>
  )
}

function CartModal({ cart, setCart, rentalSchedule, setRentalSchedule, onClose }) {
  const [step, setStep] = useState('cart') 
  
  const [formData, setFormData] = useState({
    nama: '',
    wa: '',
    jenis_customer: 'UMUM',
    jasa_antar_jemput: 'TIDAK',
    alamat_tujuan: '',
    jenis_kendaraan: 'Sepeda Motor',
    jarak_km: '',
    jasa_pasang_bongkar: 'TIDAK'
  })

  const [pasangBongkarItems, setPasangBongkarItems] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const totalHarga = cart.reduce((acc, item) => acc + (Number(item["HARGA SEWA"] || 0) * item.qty), 0)

  const getMinMaxPengecekan = () => {
    if (!rentalSchedule.tanggal_mulai) return { min: '', max: '' }
    
    const startDate = new Date(rentalSchedule.tanggal_mulai)
    const minDate = new Date(startDate.getTime() - (3 * 24 * 60 * 60 * 1000))
    
    const formatDateTimeLocal = (date) => {
      const pad = (n) => String(n).padStart(2, '0')
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
    }

    return {
      min: formatDateTimeLocal(minDate),
      max: rentalSchedule.tanggal_mulai
    }
  }

  const { min: minPengecekan, max: maxPengecekan } = getMinMaxPengecekan()

  const updateQty = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = item.qty + delta
          return newQty > 0 ? { ...item, qty: newQty } : null
        }
        return item
      }).filter(Boolean)
    )
  }

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
    toast.success('Item dihapus dari keranjang')
  }

  const handleProceedToForm = () => {
    if (cart.length === 0) {
      toast.error('Keranjang masih kosong!')
      return
    }
    if (!rentalSchedule.tanggal_mulai || !rentalSchedule.tanggal_selesai || !rentalSchedule.tanggal_pengecekan) {
      toast.error('Mohon lengkapi jadwal sewa dan tanggal pengecekan alat terlebih dahulu!')
      return
    }

    const tglPengecekan = new Date(rentalSchedule.tanggal_pengecekan).getTime()
    const minTime = new Date(minPengecekan).getTime()
    const maxTime = new Date(maxPengecekan).getTime()

    if (tglPengecekan < minTime || tglPengecekan > maxTime) {
      toast.error('Tanggal pengecekan harus berada di antara H-3 hingga jam sewa mulai!')
      return
    }

    if (Object.keys(pasangBongkarItems).length === 0) {
      const initialPB = {}
      cart.forEach(item => {
        initialPB[item.id] = { selected: false, qty: item.qty }
      })
      setPasangBongkarItems(initialPB)
    }

    setStep('form')
  }

  const openGoogleMapsStore = () => {
    window.open("https://maps.app.goo.gl/67tDHZ23n7cuBRE16", '_blank')
    toast('Cek titik toko di Google Maps untuk memperkirakan jarak.', { icon: '🗺️', duration: 4000 })
  }

  const handleToggleItemPB = (id) => {
    setPasangBongkarItems(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        selected: !prev[id]?.selected
      }
    }))
  }

  const handleQtyItemPB = (id, delta, maxQty) => {
    setPasangBongkarItems(prev => {
      const currentQty = prev[id]?.qty || 1
      const newQty = Math.max(1, Math.min(maxQty, currentQty + delta))
      return {
        ...prev,
        [id]: {
          ...prev[id],
          qty: newQty
        }
      }
    })
  }

  const handleCheckout = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const rincianPasangBongkar = formData.jasa_pasang_bongkar === 'PASANG & BONGKAR'
        ? cart
            .filter(item => pasangBongkarItems[item.id]?.selected)
            .map(item => ({
              item_id: item.id.toString(),
              nama: item["NAMA PRICELIST"] || item["NAMA PRICELIS~"],
              qty_pasang: pasangBongkarItems[item.id]?.qty || 1
            }))
        : []

      const bookingPayloads = cart.map((item) => ({
        customer_nama: formData.nama,
        customer_wa: formData.wa,
        jenis_customer: formData.jenis_customer,
        jasa_antar_jemput: formData.jasa_antar_jemput,
        lokasi_maps: formData.jasa_antar_jemput !== 'TIDAK' ? formData.alamat_tujuan : null,
        jenis_kendaraan: formData.jasa_antar_jemput !== 'TIDAK' ? formData.jenis_kendaraan : null,
        jarak_km: formData.jasa_antar_jemput !== 'TIDAK' ? parseFloat(formData.jarak_km) || 0 : 0,
        jasa_pasang_bongkar: formData.jasa_pasang_bongkar,
        rincian_pasang_bongkar: rincianPasangBongkar.length > 0 ? rincianPasangBongkar : null,
        item_id: item.id.toString(),
        tanggal_mulai: rentalSchedule.tanggal_mulai,
        tanggal_selesai: rentalSchedule.tanggal_selesai,
        tanggal_pengecekan: rentalSchedule.tanggal_pengecekan,
        total_biaya: Number(item["HARGA SEWA"] || 0) * item.qty,
        status: 'pending'
      }))

      const { error } = await supabase
        .from('bookings')
        .insert(bookingPayloads)

      if (error) throw error

      toast.success('Konfirmasi booking berhasil! Pesanan tercatat.')
      setCart([])
      setRentalSchedule({ tanggal_mulai: '', tanggal_selesai: '', tanggal_pengecekan: '' })
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (error) {
      toast.error('Gagal booking: ' + error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto">
        
        {step === 'cart' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Daftar Isi Keranjang & Jadwal</h2>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 py-6 text-center">Keranjang Anda masih kosong.</p>
            ) : (
              <div className="space-y-4">
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200 space-y-3">
                  <p className="text-xs font-semibold text-orange-800">Atur Jadwal Waktu Sewa & Pengecekan:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-gray-700 mb-1">Mulai Sewa (Tgl & Jam)</label>
                      <input 
                        type="datetime-local" 
                        className="w-full border p-2 rounded text-xs bg-white" 
                        required 
                        value={rentalSchedule.tanggal_mulai}
                        onChange={(e) => {
                          setRentalSchedule({
                            ...rentalSchedule, 
                            tanggal_mulai: e.target.value,
                            tanggal_pengecekan: '' 
                          })
                        }} 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-gray-700 mb-1">Selesai Sewa (Tgl & Jam)</label>
                      <input 
                        type="datetime-local" 
                        className="w-full border p-2 rounded text-xs bg-white" 
                        required 
                        value={rentalSchedule.tanggal_selesai}
                        onChange={(e) => setRentalSchedule({...rentalSchedule, tanggal_selesai: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-gray-700 mb-1">
                      Tanggal & Jam Pengecekan Alat 
                      <span className="text-[10px] text-gray-500 block font-normal">(Berlaku maks. H-3 s.d. jam sewa mulai)</span>
                    </label>
                    <input 
                      type="datetime-local" 
                      className="w-full border p-2 rounded text-xs bg-white disabled:bg-gray-100" 
                      required 
                      disabled={!rentalSchedule.tanggal_mulai}
                      min={minPengecekan}
                      max={maxPengecekan}
                      value={rentalSchedule.tanggal_pengecekan}
                      onChange={(e) => setRentalSchedule({...rentalSchedule, tanggal_pengecekan: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="divide-y max-h-40 overflow-y-auto border-b border-t py-2">
                  {cart.map((item) => (
                    <div key={item.id} className="py-3 flex justify-between items-center text-sm">
                      <div className="pr-2">
                        <p className="font-semibold">{item["NAMA PRICELIST"] || item["NAMA PRICELIS~"]}</p>
                        <p className="text-orange-600 font-medium">Rp {Number(item["HARGA SEWA"] || 0).toLocaleString('id-ID')}</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border rounded overflow-hidden">
                          <button onClick={() => updateQty(item.id, -1)} className="px-2 py-1 bg-gray-100 hover:bg-gray-200">-</button>
                          <span className="px-3 text-sm font-semibold">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="px-2 py-1 bg-gray-100 hover:bg-gray-200">+</button>
                        </div>

                        <button 
                          onClick={() => removeItem(item.id)} 
                          className="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between font-bold text-base pt-1">
                  <span>Total Estimasi Biaya:</span>
                  <span className="text-orange-600">Rp {totalHarga.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex gap-2 pt-3 border-t">
                  <button 
                    onClick={handleProceedToForm} 
                    className="flex-1 bg-black text-white py-2 rounded text-sm font-medium hover:bg-gray-800 transition"
                  >
                    Lanjut Isi Data Pemesanan &rarr;
                  </button>
                  <button onClick={onClose} className="px-4 bg-gray-200 py-2 rounded text-sm font-medium hover:bg-gray-300 transition">
                    Tutup
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'form' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Data Customer & Konfirmasi</h2>
              <button 
                onClick={() => setStep('cart')} 
                className="text-sm text-blue-600 hover:underline"
              >
                &larr; Kembali ke Keranjang
              </button>
            </div>

            <div className="bg-gray-50 p-3 rounded mb-4 text-xs text-gray-600 space-y-1">
              <p className="font-semibold text-gray-800 mb-1">Ringkasan Jadwal & Pesanan:</p>
              <p><span className="font-medium">Pengecekan Alat:</span> {rentalSchedule.tanggal_pengecekan.replace('T', ' ')}</p>
              <p><span className="font-medium">Mulai Sewa:</span> {rentalSchedule.tanggal_mulai.replace('T', ' ')}</p>
              <p><span className="font-medium">Selesai Sewa:</span> {rentalSchedule.tanggal_selesai.replace('T', ' ')}</p>
              <div className="border-t my-2 pt-1">
                {cart.map(i => (
                  <div key={i.id} className="flex justify-between py-0.5">
                    <span>{i.qty}x {i["NAMA PRICELIST"] || i["NAMA PRICELIS~"]}</span>
                    <span>Rp {(Number(i["HARGA SEWA"] || 0) * i.qty).toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-2 pt-1 font-bold text-gray-800 flex justify-between text-sm">
                <span>Total:</span>
                <span className="text-orange-600">Rp {totalHarga.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <form onSubmit={handleCheckout} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Jenis Customer</label>
                <select 
                  className="w-full border p-2 rounded text-sm bg-white"
                  value={formData.jenis_customer}
                  onChange={(e) => setFormData({...formData, jenis_customer: e.target.value})}
                >
                  <option value="UMUM">UMUM</option>
                  <option value="MEMBER">MEMBER</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  placeholder="Masukkan nama Anda" 
                  className="w-full border p-2 rounded text-sm" 
                  required 
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})} 
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                <input 
                  type="text" 
                  placeholder="Contoh: 08123456789" 
                  className="w-full border p-2 rounded text-sm" 
                  required 
                  value={formData.wa}
                  onChange={(e) => setFormData({...formData, wa: e.target.value})} 
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Jasa Antar Jemput</label>
                <select 
                  className="w-full border p-2 rounded text-sm bg-white"
                  value={formData.jasa_antar_jemput}
                  onChange={(e) => setFormData({...formData, jasa_antar_jemput: e.target.value})}
                >
                  <option value="TIDAK">TIDAK (Ambil Sendiri ke Toko)</option>
                  <option value="ANTAR">ANTAR SAJA</option>
                  <option value="JEMPUT">JEMPUT SAJA</option>
                  <option value="ANTAR JEMPUT">ANTAR JEMPUT</option>
                </select>
              </div>

              {formData.jasa_antar_jemput !== 'TIDAK' && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-semibold text-blue-900">Pengaturan Rute Antar/Jemput</p>
                    <button 
                      type="button" 
                      onClick={openGoogleMapsStore}
                      className="text-[11px] bg-blue-600 text-white px-2 py-0.5 rounded hover:bg-blue-700 transition"
                    >
                      📍 Cek Titik Toko
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-gray-700 mb-1">Jenis Kendaraan</label>
                      <select 
                        className="w-full border p-2 rounded text-xs bg-white"
                        value={formData.jenis_kendaraan}
                        onChange={(e) => setFormData({...formData, jenis_kendaraan: e.target.value})}
                      >
                        <option value="Sepeda Motor">Sepeda Motor</option>
                        <option value="Mobil">Mobil</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-gray-700 mb-1">Estimasi Jarak (KM)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        placeholder="Contoh: 3.5" 
                        className="w-full border p-2 rounded text-xs bg-white font-bold text-blue-700"
                        required={formData.jasa_antar_jemput !== 'TIDAK'}
                        value={formData.jarak_km}
                        onChange={(e) => setFormData({...formData, jarak_km: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-gray-700 mb-1">Alamat Tujuan Pengantaran/Penjemputan</label>
                    <textarea 
                      rows="2"
                      placeholder="Masukkan nama jalan, nomor rumah, atau patokan lokasi..." 
                      className="w-full border p-2 rounded text-xs bg-white"
                      required={formData.jasa_antar_jemput !== 'TIDAK'}
                      value={formData.alamat_tujuan}
                      onChange={(e) => setFormData({...formData, alamat_tujuan: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Jasa Pasang & Bongkar</label>
                <select 
                  className="w-full border p-2 rounded text-sm bg-white"
                  value={formData.jasa_pasang_bongkar}
                  onChange={(e) => setFormData({...formData, jasa_pasang_bongkar: e.target.value})}
                >
                  <option value="TIDAK">TIDAK</option>
                  <option value="PASANG & BONGKAR">PASANG & BONGKAR</option>
                </select>
              </div>

              {formData.jasa_pasang_bongkar === 'PASANG & BONGKAR' && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg space-y-2">
                  <p className="text-xs font-semibold text-amber-900">Pilih Alat yang Ingin Dipasang & Dibongkar:</p>
                  <p className="text-[10px] text-amber-700">Centang alat dan sesuaikan jumlah (qty) yang ingin dipasang.</p>
                  
                  <div className="space-y-2 max-h-40 overflow-y-auto bg-white p-2 rounded border border-amber-100">
                    {cart.map((item) => {
                      const isSelected = pasangBongkarItems[item.id]?.selected || false
                      const currentQtyPB = pasangBongkarItems[item.id]?.qty || item.qty
                      const namaItem = item["NAMA PRICELIST"] || item["NAMA PRICELIS~"]

                      return (
                        <div key={item.id} className="flex items-center justify-between text-xs py-1.5 border-b last:border-0">
                          <label className="flex items-center gap-2 cursor-pointer flex-1 pr-2">
                            <input 
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleItemPB(item.id)}
                              className="rounded text-amber-600 focus:ring-amber-500"
                            />
                            <span className={isSelected ? "font-semibold text-gray-900" : "text-gray-500"}>
                              {namaItem} <span className="text-[10px] text-gray-400">(Max: {item.qty})</span>
                            </span>
                          </label>

                          {isSelected && (
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-gray-500">Qty:</span>
                              <button 
                                type="button"
                                onClick={() => handleQtyItemPB(item.id, -1, item.qty)}
                                className="w-5 h-5 bg-gray-100 rounded text-xs font-bold hover:bg-gray-200 flex items-center justify-center"
                              >-</button>
                              <span className="w-6 text-center font-semibold">{currentQtyPB}</span>
                              <button 
                                type="button"
                                onClick={() => handleQtyItemPB(item.id, 1, item.qty)}
                                className="w-5 h-5 bg-gray-100 rounded text-xs font-bold hover:bg-gray-200 flex items-center justify-center"
                              >+</button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="flex-1 bg-green-600 text-white py-2 rounded text-sm font-medium hover:bg-green-700 transition"
                >
                  {submitting ? 'Memproses...' : 'Konfirmasi Booking'}
                </button>
                <button type="button" onClick={onClose} className="px-4 bg-gray-200 py-2 rounded text-sm font-medium hover:bg-gray-300 transition">
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