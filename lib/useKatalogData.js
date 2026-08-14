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
      const { data, error } = await supabase
        .from('PRICELIST SATUAN AKTIF')
        .select('*')
        .order('id', { ascending: true })
      
      if (error) throw error
      
      const listData = data || []
      setProducts(listData)

      // 1. Ekstraksi daftar JENIS unik untuk navigasi/filter kategori
      const uniqueJenis = [...new Set(listData.map(item => item.JENIS).filter(Boolean))]
      setJenisList(uniqueJenis)

      // 2. Filter otomatis produk unggulan berdasarkan kolom HOT ITEM (misal bernilai 'Y' / 'Ya' / true)
      const featured = listData.filter(item => {
        const hot = String(item['HOT ITEM'] || '').trim().toUpperCase()
        return hot === 'Y' || hot === 'YA' || hot === 'TRUE'
      })
      setFeaturedProducts(featured.length > 0 ? featured : listData.slice(0, 3)) // Fallback ke 3 produk pertama jika tidak ada yang ditandai hot item

    } catch (error) {
      console.error('Error mengambil data pricelist:', error.message)
      toast.error('Gagal memuat data dari tabel Pricelist Aktif')
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