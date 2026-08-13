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
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta
            return newQty > 0 ? { ...item, qty: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4 z-50">
      
      <div className="bg-surface text-foreground p-6 rounded-xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto relative border border-border">
        
        {/* ========================================
            CLOSE BUTTON
            ======================================== */}
        <button 
          onClick={onClose} 
          aria-label="Tutup keranjang"
          className="
            absolute top-4 right-4
            text-muted
            hover:text-brand-blue
            text-lg font-bold
            w-8 h-8
            flex items-center justify-center
            rounded-full
            hover:bg-brand-light-blue
            transition
          "
        >
          &times;
        </button>

        {/* ========================================
            HEADER
            ======================================== */}
        <div className="pr-8 mb-5">
          <h2 className="text-xl font-bold text-brand-blue">
            Keranjang & Jadwal Sewa
          </h2>

          <p className="text-xs text-muted mt-1">
            Periksa perlengkapan dan tentukan jadwal sewa Anda.
          </p>
        </div>

        {cart.length === 0 ? (
          
          /* ========================================
             EMPTY CART
             ======================================== */
          <div className="py-10 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-brand-light-cyan flex items-center justify-center">
              <span className="text-2xl">🛒</span>
            </div>

            <div>
              <p className="font-semibold text-foreground">
                Keranjang Anda masih kosong
              </p>

              <p className="text-xs text-muted mt-1">
                Silakan pilih perlengkapan camping terlebih dahulu.
              </p>
            </div>

            <button 
              onClick={onClose} 
              className="
                px-5 py-2
                bg-brand-blue
                text-white
                rounded-lg
                text-sm font-medium
                hover:bg-brand-dark-blue
                transition
              "
            >
              Tutup
            </button>
          </div>

        ) : (

          /* ========================================
             CART CONTENT
             ======================================== */
          <div className="space-y-5">

            {/* ========================================
                RENTAL SCHEDULE
                ======================================== */}
            <div className="
              bg-brand-light-cyan
              p-4
              rounded-xl
              border border-brand-cyan/30
              space-y-3
            ">
              
              <div className="flex items-center gap-2">
                <div className="
                  w-7 h-7
                  rounded-lg
                  bg-brand-cyan
                  text-white
                  flex items-center justify-center
                  text-sm
                ">
                  📅
                </div>

                <div>
                  <p className="text-xs font-bold text-brand-dark-blue">
                    Jadwal Waktu Sewa
                  </p>

                  <p className="text-[10px] text-muted">
                    Tentukan waktu pengambilan dan pengembalian alat.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                
                {/* MULAI SEWA */}
                <div>
                  <label className="block text-[11px] font-semibold text-foreground mb-1">
                    Mulai Sewa
                  </label>

                  <input 
                    type="datetime-local" 
                    className="
                      w-full
                      border border-border
                      p-2.5
                      rounded-lg
                      text-xs
                      bg-surface
                      text-foreground
                      focus:outline-none
                      focus:ring-2
                      focus:ring-brand-cyan/30
                      focus:border-brand-cyan
                      transition
                    "
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

                {/* SELESAI SEWA */}
                <div>
                  <label className="block text-[11px] font-semibold text-foreground mb-1">
                    Selesai Sewa
                  </label>

                  <input 
                    type="datetime-local" 
                    className="
                      w-full
                      border border-border
                      p-2.5
                      rounded-lg
                      text-xs
                      bg-surface
                      text-foreground
                      focus:outline-none
                      focus:ring-2
                      focus:ring-brand-cyan/30
                      focus:border-brand-cyan
                      transition
                    "
                    required 
                    value={rentalSchedule.tanggal_selesai}
                    onChange={(e) => 
                      setRentalSchedule({
                        ...rentalSchedule, 
                        tanggal_selesai: e.target.value
                      })
                    } 
                  />
                </div>

              </div>

              {/* PENGECEKAN ALAT */}
              <div>
                <label className="block text-[11px] font-semibold text-foreground mb-1">
                  Tanggal & Jam Pengecekan Alat
                </label>

                <p className="text-[10px] text-muted mb-1.5">
                  Berlaku maksimal H-3 sampai jam mulai sewa.
                </p>

                <input 
                  type="datetime-local" 
                  className="
                    w-full
                    border border-border
                    p-2.5
                    rounded-lg
                    text-xs
                    bg-surface
                    text-foreground
                    disabled:bg-brand-light-blue
                    disabled:text-muted
                    focus:outline-none
                    focus:ring-2
                    focus:ring-brand-cyan/30
                    focus:border-brand-cyan
                    transition
                  "
                  required 
                  disabled={!rentalSchedule.tanggal_mulai}
                  min={minPengecekan}
                  max={maxPengecekan}
                  value={rentalSchedule.tanggal_pengecekan}
                  onChange={(e) => 
                    setRentalSchedule({
                      ...rentalSchedule, 
                      tanggal_pengecekan: e.target.value
                    })
                  } 
                />
              </div>

            </div>

            {/* ========================================
                CART ITEMS
                ======================================== */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-bold text-brand-blue">
                  Perlengkapan Dipilih
                </p>

                <span className="
                  text-[10px]
                  font-semibold
                  px-2 py-1
                  rounded-full
                  bg-brand-light-blue
                  text-brand-blue
                ">
                  {cart.length} Item
                </span>
              </div>

              <div className="
                divide-y
                max-h-48
                overflow-y-auto
                border border-border
                rounded-xl
                bg-surface
              ">
                
                {cart.map((item) => (
                  <div 
                    key={item.id} 
                    className="
                      p-3
                      flex
                      justify-between
                      items-center
                      gap-3
                      text-sm
                      hover:bg-brand-light-blue/40
                      transition
                    "
                  >
                    
                    {/* PRODUCT INFO */}
                    <div className="pr-2 min-w-0">
                      <p className="
                        font-semibold
                        text-foreground
                        text-xs
                        leading-tight
                        line-clamp-2
                      ">
                        {item.nama}
                      </p>

                      <p className="
                        text-brand-blue
                        font-bold
                        text-xs
                        mt-1
                      ">
                        Rp {Number(item.harga || 0).toLocaleString('id-ID')}
                      </p>
                    </div>

                    {/* QUANTITY & DELETE */}
                    <div className="flex items-center gap-2 shrink-0">
                      
                      <div className="
                        flex items-center
                        border border-border
                        rounded-lg
                        overflow-hidden
                        bg-surface
                      ">
                        
                        <button 
                          onClick={() => updateQty(item.id, -1)}
                          aria-label="Kurangi jumlah"
                          className="
                            w-8 h-8
                            bg-brand-light-blue
                            text-brand-blue
                            hover:bg-brand-blue
                            hover:text-white
                            font-bold
                            transition
                          "
                        >
                          −
                        </button>

                        <span className="
                          w-8
                          text-center
                          text-xs
                          font-bold
                          text-foreground
                        ">
                          {item.qty}
                        </span>

                        <button 
                          onClick={() => updateQty(item.id, 1)}
                          aria-label="Tambah jumlah"
                          className="
                            w-8 h-8
                            bg-brand-light-blue
                            text-brand-blue
                            hover:bg-brand-blue
                            hover:text-white
                            font-bold
                            transition
                          "
                        >
                          +
                        </button>

                      </div>

                      <button 
                        onClick={() => removeItem(item.id)}
                        className="
                          text-[10px]
                          font-semibold
                          px-2
                          py-1.5
                          rounded-lg
                          text-red-600
                          hover:bg-red-50
                          transition
                        "
                      >
                        Hapus
                      </button>

                    </div>

                  </div>
                ))}

              </div>
            </div>

            {/* ========================================
                ACTION BUTTONS
                ======================================== */}
            <div className="
              flex
              gap-2
              pt-4
              border-t border-border
            ">
              
              <button 
                onClick={onProceed}
                className="
                  flex-1
                  bg-brand-blue
                  text-white
                  py-2.5
                  rounded-lg
                  text-sm
                  font-semibold
                  hover:bg-brand-dark-blue
                  shadow-sm
                  transition
                "
              >
                Lanjut Isi Data Pemesanan →
              </button>

              <button 
                onClick={onClose}
                className="
                  px-4
                  bg-brand-light-blue
                  text-brand-blue
                  py-2.5
                  rounded-lg
                  text-sm
                  font-semibold
                  hover:bg-brand-blue
                  hover:text-white
                  transition
                "
              >
                Tutup
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  )
}