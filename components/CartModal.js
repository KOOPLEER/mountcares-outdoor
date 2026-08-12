'use client'

export default function CartModal({ 
  cart, 
  setCart, 
  rentalSchedule, 
  setRentalSchedule, 
  minPengecekan, 
  maxPengecekan, 
  onClose, 
  onProceed 
}) {
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
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto relative text-gray-900">
        
        {/* Tombol Close (X) di Pojok Kanan Atas agar selalu ada */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 pr-8">Daftar Isi Keranjang & Jadwal</h2>
        
        {cart.length === 0 ? (
          <div className="py-8 text-center space-y-4">
            <p className="text-gray-500">Keranjang Anda masih kosong.</p>
            <button 
              onClick={onClose} 
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium transition"
            >
              Tutup
            </button>
          </div>
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
                    <p className="font-semibold">{item.nama}</p>
                    <p className="text-orange-600 font-medium">Rp {item.harga?.toLocaleString('id-ID')}</p>
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

            <div className="flex gap-2 pt-3 border-t">
              <button 
                onClick={onProceed} 
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
    </div>
  )
}