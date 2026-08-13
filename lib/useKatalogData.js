import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export function useKatalogData() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [jenisList, setJenisList] = useState([])
  const [selectedJenis, setSelectedJenis] = useState('SEMUA')
  const [loading, setLoading] = useState(true)

  async function fetchProducts() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('PRICELIST SATUAN AKTIF')
        .select('*')
      
      if (error) throw error
      
      const listData = data || []
      setProducts(listData)

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

  return {
    products,
    filteredProducts,
    jenisList,
    selectedJenis,
    setSelectedJenis,
    loading,
    refreshData: fetchProducts
  }
}