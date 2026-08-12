'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { hitungTotalBiaya } from '@/lib/KalkulatorSewa' // Import library kalkulator

export default function BookingModal({ 
  cart, 
  rentalSchedule, 
  pasangBongkarItems, 
  setPasangBongkarItems, 
  handleToggleItemPB, 
  handleQtyItemPB, 
  onBack, 
  onClose, 
  onSuccess 
}) {
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

  const [submitting, setSubmitting] = useState(false)

  // Memanggil fungsi dari library KalkulatorSewa.js secara bersih
  const { 
    durasiHari, 
    totalHargaAlat, 
    diskonMember, 
    biayaAntarJemput, 
    biayaPasangBongkar, 
    totalItemPBCount, 
    grandTotal 
  } = hitungTotalBiaya(cart, rentalSchedule, formData, pasangBongkarItems)

  const openGoogleMapsStore = () => {
    window.open("https://maps.app.goo.gl/67tDHZ23n7cuBRE16", '_blank')
    toast('Cek titik toko di Google Maps untuk memperkirakan jarak.', { icon: '🗺️', duration: 4000 })
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
              nama: item.nama,
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
        total_biaya: grandTotal, 
        status: 'pending'
      }))

      const { error } = await supabase
        .from('bookings')
        .insert(bookingPayloads)

      if (error) throw error

      toast.success('Konfirmasi booking berhasil! Pesanan tercatat.')
      onSuccess()
    } catch (error) {
      toast.error('Gagal booking: ' + error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Data Customer & Kalkulator</h2>
          <button onClick={onBack} className="text-sm text-blue-600 hover:underline">
            &larr; Kembali ke Keranjang
          </button>
        </div>

        {/* Kotak Kalkulator Rincian Biaya Real-Time */}
        <div className="bg-orange-50 border border-orange-200 p-3 rounded mb-4 text-xs text-gray-700 space-y-1.5">
          <p className="font-semibold text-orange-900 mb-1">Rincian Kalkulator Biaya Sewa:</p>
          <div className="flex justify-between">
            <span>Durasi Sewa:</span>
            <span className="font-medium">{durasiHari} Hari ({rentalSchedule.tanggal_mulai.replace('T', ' ')} s.d {rentalSchedule.tanggal_selesai.replace('T', ' ')})</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal Alat ({durasiHari}x):</span>
            <span>Rp {totalHargaAlat.toLocaleString('id-ID')}</span>
          </div>
          {formData.jenis_customer === 'MEMBER' && (
            <div className="flex justify-between text-green-700 font-medium">
              <span>Diskon Member (10%):</span>
              <span>- Rp {diskonMember.toLocaleString('id-ID')}</span>
            </div>
          )}
          {biayaAntarJemput > 0 && (
            <div className="flex justify-between">
              <span>Biaya Antar-Jemput ({formData.jarak_km || 0} KM):</span>
              <span>Rp {biayaAntarJemput.toLocaleString('id-ID')}</span>
            </div>
          )}
          {biayaPasangBongkar > 0 && (
            <div className="flex justify-between">
              <span>Biaya Pasang & Bongkar ({totalItemPBCount} item):</span>
              <span>Rp {biayaPasangBongkar.toLocaleString('id-ID')}</span>
            </div>
          )}
          <div className="border-t border-orange-200 mt-2 pt-1.5 font-bold text-gray-900 flex justify-between text-sm">
            <span>Grand Total:</span>
            <span className="text-orange-600">Rp {grandTotal.toLocaleString('id-ID')}</span>
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
              
              <div className="space-y-2 max-h-40 overflow-y-auto bg-white p-2 rounded border border-amber-100">
                {cart.map((item) => {
                  const isSelected = pasangBongkarItems[item.id]?.selected || false
                  const currentQtyPB = pasangBongkarItems[item.id]?.qty || item.qty

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
                          {item.nama} <span className="text-[10px] text-gray-400">(Max: {item.qty})</span>
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
    </div>
  )
}