import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export function useKatalogData() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [jenisList, setJenisList] = useState([])
  const [selectedJenis, setSelectedJenis] = useState('SEMUA')
  const [loading, setLoading] = useState(true)

  async function fetchProducts() {
    try {
      setLoading(true)

      // 1. Ambil data dari tabel Pricelist Satuan & Katalog Paket secara paralel
      const [satuanRes, paketRes] = await Promise.all([
        supabase.from('PRICELIST SATUAN AKTIF').select('*').order('id', { ascending: true }),
        supabase.from('katalog_paket').select('*').order('id', { ascending: true })
      ])

      if (satuanRes.error) throw satuanRes.error
      if (paketRes.error) throw paketRes.error

      const satuanData = satuanRes.data || []
      const paketData = paketRes.data || []

      // 2. Normalisasi data paket agar propertinya selaras dengan produk satuan (huruf kapital)
      const normalizedPaketData = paketData.map(item => ({
        ...item,
        // Pastikan key standar terbaca seragam oleh komponen lain
        'KODE PRICELIST': item.kode_pricelist,
        'JENIS': item.jenis,
        'KATEGORI': item.kategori,
        'NAMA PRICELIST': item.nama_pricelist,
        'ISI PAKET': item.isi_paket,
        'LINK FOTO': item.link_foto,
        'HARGA SEWA': item.harga_sewa,
        'JASA BONGKAR PASANG': item.jasa_bongkar_pasang,
        isPaket: true // Penanda khusus item paket
      }))

      // Gabungkan kedua sumber data
      const combinedData = [...satuanData, ...normalizedPaketData]
      setProducts(combinedData)

      // 3. Ekstraksi daftar JENIS unik untuk navigasi/filter kategori
      const uniqueJenis = [...new Set(combinedData.map(item => item.JENIS).filter(Boolean))]
      setJenisList(uniqueJenis)

      // 4. Filter produk unggulan berdasarkan kolom HOT ITEM (hanya berlaku di satuan, paket diabaikan)
      const featured = combinedData.filter(item => {
        const hot = String(item['HOT ITEM'] || '').trim().toUpperCase()
        return hot === 'Y' || hot === 'YA' || hot === 'TRUE'
      })
      setFeaturedProducts(featured.length > 0 ? featured : combinedData.slice(0, 3))

    } catch (error) {
      console.error('Error mengambil data katalog:', error.message)
      toast.error('Gagal memuat data dari database')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Filter produk utama setiap kali selectedJenis atau products berubah
  useEffect(() => {
    if (selectedJenis === 'SEMUA') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(item => item.JENIS === selectedJenis))
    }
  }, [selectedJenis, products])

  return {
    products,
    filteredProducts,
    featuredProducts,
    jenisList,
    selectedJenis,
    setSelectedJenis,
    loading,
    refreshData: fetchProducts
  }
}