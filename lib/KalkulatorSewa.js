export const hitungTotalBiaya = (cart, rentalSchedule, formData, pasangBongkarItems) => {
  const mulai = new Date(rentalSchedule.tanggal_mulai);
  const selesai = new Date(rentalSchedule.tanggal_selesai);
  const durasiHari = Math.ceil((selesai - mulai) / (1000 * 60 * 60 * 24)) || 1;

  const totalHargaAlat = cart.reduce((acc, item) => acc + (item.harga * item.qty * durasiHari), 0);
  const diskonMember = formData.jenis_customer === 'MEMBER' ? totalHargaAlat * 0.10 : 0;
  const subtotalAlat = totalHargaAlat - diskonMember;

  const biayaAntarJemput = formData.jasa_antar_jemput !== 'TIDAK' ? (parseFloat(formData.jarak_km) || 0) * 5000 : 0;

  const totalItemPBCount = Object.values(pasangBongkarItems)
    .filter(i => i.selected)
    .reduce((acc, i) => acc + i.qty, 0);
  const biayaPasangBongkar = formData.jasa_pasang_bongkar === 'PASANG & BONGKAR' ? totalItemPBCount * 25000 : 0;

  const grandTotal = subtotalAlat + biayaAntarJemput + biayaPasangBongkar;

  return {
    durasiHari,
    totalHargaAlat,
    diskonMember,
    biayaAntarJemput,
    biayaPasangBongkar,
    totalItemPBCount,
    grandTotal
  };
};