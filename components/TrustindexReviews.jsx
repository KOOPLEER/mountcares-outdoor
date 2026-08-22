'use client';

// Masukkan data ulasan asli dari Google Maps Mountcares Outdoor di sini
const reviewsData = [
  {
    id: 1,
    name: "Rizal Firmansyah",
    rating: 5,
    text: "Peralatan campingnya sangat terawat dan bersih. Sewa alat di sini untuk event sekolah sangat terbantu, pelayanan fast respon dan ramah!",
    date: "Ulasan Google Maps"
  },
  {
    id: 2,
    name: "Siti Rahma",
    rating: 5,
    text: "Rekomendasi banget buat yang mau camping di area Malang/Singosari. Tenda dan alat masak lengkap, harganya terjangkau untuk pelajar.",
    date: "Ulasan Google Maps"
  },
  {
    id: 3,
    name: "Ahmad Bagus",
    rating: 5,
    text: "Sangat profesional melayani kebutuhan event skala besar. Tenda dalam kondisi prima dan proses bongkar pasangnya cepat.",
    date: "Ulasan Google Maps"
  }
];

export default function TrustindexReviews() {
  return (
    <section className="py-12 px-4 bg-gray-50/50 w-full">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        
        {/* Header Section */}
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-brand-blue">
            Ulasan Terbaru dari Google Maps
          </h3>
          <p className="text-xs text-muted max-w-lg mx-auto">
            Pengalaman jujur dari pelanggan dan mitra event Mountcares Outdoor.
          </p>
        </div>

        {/* Grid Kartu Ulasan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-2">
          {reviewsData.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-3">
                {/* Bintang Rating */}
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star text-xs"></i>
                  ))}
                </div>
                {/* Teks Ulasan */}
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              {/* Info Pengulas */}
              <div className="border-t border-gray-100 pt-3 mt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800 text-xs sm:text-sm">{item.name}</h4>
                  <span className="text-[10px] text-muted">{item.date}</span>
                </div>
                <i className="fa-brands fa-google text-red-500 text-base opacity-80"></i>
              </div>
            </div>
          ))}
        </div>

        {/* Link Ke Google Maps Asli */}
        <div className="pt-2">
          <a
            href="https://maps.google.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs font-medium text-brand-blue hover:underline"
          >
            <span>Lihat semua ulasan di Google Maps</span>
            <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>

      </div>
    </section>
  );
}