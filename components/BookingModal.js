'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { hitungTotalBiaya } from '@/lib/KalkulatorSewa'

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

  const { 
    durasiHari, 
    totalHargaAlat, 
    diskonMember, 
    biayaAntarJemput, 
    biayaPasangBongkar, 
    totalItemPBCount, 
    grandTotal 
  } = hitungTotalBiaya(
    cart,
    rentalSchedule,
    formData,
    pasangBongkarItems
  )

  const openGoogleMapsStore = () => {
    window.open(
      "https://maps.app.goo.gl/67tDHZ23n7cuBRE16",
      '_blank'
    )

    toast(
      'Cek titik toko di Google Maps untuk memperkirakan jarak.',
      {
        icon: '🗺️',
        duration: 4000
      }
    )
  }

  const handleCheckout = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const rincianPasangBongkar =
        formData.jasa_pasang_bongkar === 'PASANG & BONGKAR'
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
        lokasi_maps:
          formData.jasa_antar_jemput !== 'TIDAK'
            ? formData.alamat_tujuan
            : null,
        jenis_kendaraan:
          formData.jasa_antar_jemput !== 'TIDAK'
            ? formData.jenis_kendaraan
            : null,
        jarak_km:
          formData.jasa_antar_jemput !== 'TIDAK'
            ? parseFloat(formData.jarak_km) || 0
            : 0,
        jasa_pasang_bongkar: formData.jasa_pasang_bongkar,
        rincian_pasang_bongkar:
          rincianPasangBongkar.length > 0
            ? rincianPasangBongkar
            : null,
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

      toast.success(
        'Konfirmasi booking berhasil! Pesanan tercatat.'
      )

      onSuccess()

    } catch (error) {
      toast.error('Gagal booking: ' + error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">

      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-brand-light-blue shadow-2xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="sticky top-0 z-10 bg-white border-b border-border px-6 py-4">

          <div className="flex justify-between items-center gap-4">

            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-brand-cyan">
                MOUNTCARES OUTDOOR
              </p>

              <h2 className="text-xl font-bold text-brand-blue">
                Data Customer & Kalkulator
              </h2>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="
                text-xs font-semibold
                text-brand-blue
                hover:text-brand-dark-blue
                transition
                whitespace-nowrap
              "
            >
              &larr; Kembali
            </button>

          </div>

        </div>


        <div className="p-6">

          {/* =====================================================
              KALKULATOR BIAYA
          ====================================================== */}

          <div className="
            relative overflow-hidden
            bg-linear-to-br
            from-brand-light-blue
            to-brand-light-cyan
            border border-brand-cyan/20
            p-4 rounded-xl mb-5
          ">

            {/* Decorative accent */}

            <div className="
              absolute
              -right-8
              -top-8
              w-24
              h-24
              rounded-full
              bg-brand-cyan/10
            " />

            <div className="relative">

              <div className="flex items-center justify-between mb-3">

                <p className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-brand-blue
                ">
                  Rincian Biaya Sewa
                </p>

                <span className="
                  text-[10px]
                  font-bold
                  px-2
                  py-1
                  rounded-full
                  bg-white/70
                  text-brand-dark-blue
                  border border-brand-blue/10
                ">
                  Estimasi
                </span>

              </div>


              <div className="space-y-2 text-xs text-foreground">

                <div className="flex justify-between gap-4">
                  <span className="text-muted">
                    Durasi Sewa
                  </span>

                  <span className="font-medium text-right">
                    {durasiHari} Hari
                  </span>
                </div>


                <div className="flex justify-between gap-4">
                  <span className="text-muted">
                    Periode
                  </span>

                  <span className="font-medium text-right text-[11px]">
                    {rentalSchedule.tanggal_mulai.replace('T', ' ')}
                    {' s.d '}
                    {rentalSchedule.tanggal_selesai.replace('T', ' ')}
                  </span>
                </div>


                <div className="flex justify-between">
                  <span className="text-muted">
                    Subtotal Alat ({durasiHari}x)
                  </span>

                  <span>
                    Rp {totalHargaAlat.toLocaleString('id-ID')}
                  </span>
                </div>


                {formData.jenis_customer === 'MEMBER' && (
                  <div className="
                    flex justify-between
                    text-brand-dark-cyan
                    font-semibold
                  ">
                    <span>
                      Diskon Member (10%)
                    </span>

                    <span>
                      - Rp {diskonMember.toLocaleString('id-ID')}
                    </span>
                  </div>
                )}


                {biayaAntarJemput > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted">
                      Biaya Antar-Jemput ({formData.jarak_km || 0} KM)
                    </span>

                    <span>
                      Rp {biayaAntarJemput.toLocaleString('id-ID')}
                    </span>
                  </div>
                )}


                {biayaPasangBongkar > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted">
                      Pasang & Bongkar ({totalItemPBCount} item)
                    </span>

                    <span>
                      Rp {biayaPasangBongkar.toLocaleString('id-ID')}
                    </span>
                  </div>
                )}

              </div>


              {/* GRAND TOTAL */}

              <div className="
                border-t
                border-brand-blue/15
                mt-3
                pt-3
                flex
                justify-between
                items-center
              ">

                <span className="
                  text-sm
                  font-bold
                  text-brand-blue
                ">
                  Grand Total
                </span>

                <span className="
                  text-lg
                  font-extrabold
                  text-brand-blue
                ">
                  Rp {grandTotal.toLocaleString('id-ID')}
                </span>

              </div>

            </div>
          </div>


          {/* =====================================================
              FORM
          ====================================================== */}

          <form
            onSubmit={handleCheckout}
            className="space-y-4"
          >

            {/* CUSTOMER TYPE */}

            <div>

              <label className="
                block
                text-xs
                font-semibold
                text-foreground
                mb-1.5
              ">
                Jenis Customer
              </label>

              <select
                className="
                  w-full
                  border border-border
                  p-2.5
                  rounded-lg
                  text-sm
                  bg-white
                  text-foreground
                  outline-none
                  focus:border-brand-cyan
                  focus:ring-2
                  focus:ring-brand-cyan/20
                  transition
                "
                value={formData.jenis_customer}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    jenis_customer: e.target.value
                  })
                }
              >
                <option value="UMUM">UMUM</option>
                <option value="MEMBER">MEMBER</option>
              </select>

            </div>


            {/* NAME */}

            <div>

              <label className="
                block
                text-xs
                font-semibold
                text-foreground
                mb-1.5
              ">
                Nama Lengkap
              </label>

              <input
                type="text"
                placeholder="Masukkan nama Anda"
                className="
                  w-full
                  border border-border
                  p-2.5
                  rounded-lg
                  text-sm
                  text-foreground
                  placeholder:text-muted
                  outline-none
                  focus:border-brand-cyan
                  focus:ring-2
                  focus:ring-brand-cyan/20
                  transition
                "
                required
                value={formData.nama}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nama: e.target.value
                  })
                }
              />

            </div>


            {/* WHATSAPP */}

            <div>

              <label className="
                block
                text-xs
                font-semibold
                text-foreground
                mb-1.5
              ">
                Nomor WhatsApp
              </label>

              <input
                type="text"
                placeholder="Contoh: 08123456789"
                className="
                  w-full
                  border border-border
                  p-2.5
                  rounded-lg
                  text-sm
                  text-foreground
                  placeholder:text-muted
                  outline-none
                  focus:border-brand-cyan
                  focus:ring-2
                  focus:ring-brand-cyan/20
                  transition
                "
                required
                value={formData.wa}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    wa: e.target.value
                  })
                }
              />

            </div>


            {/* DELIVERY */}

            <div>

              <label className="
                block
                text-xs
                font-semibold
                text-foreground
                mb-1.5
              ">
                Jasa Antar Jemput
              </label>

              <select
                className="
                  w-full
                  border border-border
                  p-2.5
                  rounded-lg
                  text-sm
                  bg-white
                  text-foreground
                  outline-none
                  focus:border-brand-cyan
                  focus:ring-2
                  focus:ring-brand-cyan/20
                  transition
                "
                value={formData.jasa_antar_jemput}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    jasa_antar_jemput: e.target.value
                  })
                }
              >
                <option value="TIDAK">
                  TIDAK (Ambil Sendiri ke Toko)
                </option>

                <option value="ANTAR">
                  ANTAR SAJA
                </option>

                <option value="JEMPUT">
                  JEMPUT SAJA
                </option>

                <option value="ANTAR JEMPUT">
                  ANTAR JEMPUT
                </option>

              </select>

            </div>


            {/* DELIVERY DETAIL */}

            {formData.jasa_antar_jemput !== 'TIDAK' && (

              <div className="
                p-4
                bg-brand-light-cyan
                border border-brand-cyan/20
                rounded-xl
                space-y-3
              ">

                <div className="flex justify-between items-center">

                  <p className="
                    text-xs
                    font-bold
                    text-brand-blue
                  ">
                    Pengaturan Rute Antar/Jemput
                  </p>

                  <button
                    type="button"
                    onClick={openGoogleMapsStore}
                    className="
                      text-[11px]
                      font-semibold
                      bg-brand-blue
                      text-white
                      px-2.5
                      py-1
                      rounded-lg
                      hover:bg-brand-dark-blue
                      transition
                    "
                  >
                    📍 Cek Titik Toko
                  </button>

                </div>


                <div className="grid grid-cols-2 gap-2">

                  <div>

                    <label className="
                      block
                      text-[11px]
                      font-semibold
                      text-foreground
                      mb-1
                    ">
                      Jenis Kendaraan
                    </label>

                    <select
                      className="
                        w-full
                        border border-brand-cyan/20
                        p-2
                        rounded-lg
                        text-xs
                        bg-white
                        outline-none
                        focus:border-brand-cyan
                        focus:ring-2
                        focus:ring-brand-cyan/20
                      "
                      value={formData.jenis_kendaraan}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          jenis_kendaraan: e.target.value
                        })
                      }
                    >
                      <option value="Sepeda Motor">
                        Sepeda Motor
                      </option>

                      <option value="Mobil">
                        Mobil
                      </option>
                    </select>

                  </div>


                  <div>

                    <label className="
                      block
                      text-[11px]
                      font-semibold
                      text-foreground
                      mb-1
                    ">
                      Estimasi Jarak (KM)
                    </label>

                    <input
                      type="number"
                      step="0.1"
                      placeholder="Contoh: 3.5"
                      className="
                        w-full
                        border border-brand-cyan/20
                        p-2
                        rounded-lg
                        text-xs
                        bg-white
                        font-bold
                        text-brand-blue
                        outline-none
                        focus:border-brand-cyan
                        focus:ring-2
                        focus:ring-brand-cyan/20
                      "
                      required={
                        formData.jasa_antar_jemput !== 'TIDAK'
                      }
                      value={formData.jarak_km}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          jarak_km: e.target.value
                        })
                      }
                    />

                  </div>

                </div>


                <div>

                  <label className="
                    block
                    text-[11px]
                    font-semibold
                    text-foreground
                    mb-1
                  ">
                    Alamat Tujuan Pengantaran/Penjemputan
                  </label>

                  <textarea
                    rows="2"
                    placeholder="Masukkan nama jalan, nomor rumah, atau patokan lokasi..."
                    className="
                      w-full
                      border border-brand-cyan/20
                      p-2.5
                      rounded-lg
                      text-xs
                      bg-white
                      outline-none
                      focus:border-brand-cyan
                      focus:ring-2
                      focus:ring-brand-cyan/20
                      transition
                    "
                    required={
                      formData.jasa_antar_jemput !== 'TIDAK'
                    }
                    value={formData.alamat_tujuan}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        alamat_tujuan: e.target.value
                      })
                    }
                  />

                </div>

              </div>
            )}


            {/* PASANG BONGKAR */}

            <div>

              <label className="
                block
                text-xs
                font-semibold
                text-foreground
                mb-1.5
              ">
                Jasa Pasang & Bongkar
              </label>

              <select
                className="
                  w-full
                  border border-border
                  p-2.5
                  rounded-lg
                  text-sm
                  bg-white
                  text-foreground
                  outline-none
                  focus:border-brand-cyan
                  focus:ring-2
                  focus:ring-brand-cyan/20
                  transition
                "
                value={formData.jasa_pasang_bongkar}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    jasa_pasang_bongkar: e.target.value
                  })
                }
              >
                <option value="TIDAK">
                  TIDAK
                </option>

                <option value="PASANG & BONGKAR">
                  PASANG & BONGKAR
                </option>

              </select>

            </div>


            {/* PASANG BONGKAR DETAIL */}

            {formData.jasa_pasang_bongkar === 'PASANG & BONGKAR' && (

              <div className="
                p-4
                bg-brand-light-blue
                border border-brand-blue/15
                rounded-xl
                space-y-2
              ">

                <p className="
                  text-xs
                  font-bold
                  text-brand-blue
                ">
                  Pilih Alat yang Ingin Dipasang & Dibongkar
                </p>


                <p className="
                  text-[10px]
                  text-muted
                  mb-2
                ">
                  Centang alat dan sesuaikan jumlah (qty)
                  yang ingin dipasang.
                </p>


                <div className="
                  space-y-2
                  max-h-40
                  overflow-y-auto
                  bg-white
                  p-2
                  rounded-lg
                  border border-brand-blue/10
                ">

                  {cart.map((item) => {

                    const isSelected =
                      pasangBongkarItems[item.id]?.selected || false

                    const currentQtyPB =
                      pasangBongkarItems[item.id]?.qty || item.qty

                    return (

                      <div
                        key={item.id}
                        className="
                          flex
                          items-center
                          justify-between
                          text-xs
                          py-2
                          border-b
                          border-border
                          last:border-0
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
                            checked={isSelected}
                            onChange={() =>
                              handleToggleItemPB(item.id)
                            }
                            className="
                              rounded
                              text-brand-blue
                              focus:ring-brand-cyan
                              border-border
                            "
                          />

                          <span
                            className={
                              isSelected
                                ? "font-semibold text-foreground"
                                : "text-muted"
                            }
                          >
                            {item.nama}

                            <span className="
                              text-[10px]
                              text-muted
                            ">
                              {' '}
                              (Max: {item.qty})
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
                                text-xs
                                font-bold
                                hover:bg-brand-blue
                                hover:text-white
                                transition
                                flex
                                items-center
                                justify-center
                              "
                            >
                              -
                            </button>

                            <span className="
                              w-6
                              text-center
                              font-semibold
                              text-brand-blue
                            ">
                              {currentQtyPB}
                            </span>

                            <button
                              type="button"
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
                                text-xs
                                font-bold
                                hover:bg-brand-blue
                                hover:text-white
                                transition
                                flex
                                items-center
                                justify-center
                              "
                            >
                              +
                            </button>

                          </div>

                        )}

                      </div>

                    )
                  })}

                </div>

              </div>

            )}


            {/* =====================================================
                CTA
            ====================================================== */}

            <div className="
              flex
              gap-2
              pt-4
              border-t
              border-border
            ">

              <button
                type="submit"
                disabled={submitting}
                className="
                  flex-1
                  bg-brand-blue
                  text-white
                  py-2.5
                  rounded-lg
                  text-sm
                  font-bold
                  hover:bg-brand-dark-blue
                  transition
                  shadow-md
                  shadow-brand-blue/20
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {submitting
                  ? 'Memproses...'
                  : 'Konfirmasi Booking'}
              </button>


              <button
                type="button"
                onClick={onClose}
                className="
                  px-5
                  bg-brand-light-blue
                  text-brand-blue
                  border
                  border-brand-blue/10
                  py-2.5
                  rounded-lg
                  text-sm
                  font-semibold
                  hover:bg-brand-blue
                  hover:text-white
                  transition
                "
              >
                Batal
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  )
}