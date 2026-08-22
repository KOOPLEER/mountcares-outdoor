export default function TentangKamiPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">


      {/* =========================================================
          HERO
          ========================================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-brand-light-cyan/30 via-white to-slate-50 border-b border-border">

        <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-cyan/10 rounded-full blur-3xl" />

        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl" />


        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">

          {/* LOGOS */}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-12">

            <img
              src="Logo/mountcares-horizontal.png"
              alt="Mountcares Outdoor"
              className="w-auto h-16 sm:h-20 object-contain"
            />


            <div className="hidden sm:block h-16 w-px bg-slate-200" />


            <img
              src="Logo/urban-wild-journey.png"
              alt="Urban Wild Journey"
              className="w-auto h-20 sm:h-24 object-contain"
            />

          </div>


          <div className="max-w-4xl mx-auto text-center">

            <span className="inline-flex items-center text-brand-cyan text-xs font-bold uppercase tracking-widest bg-brand-light-cyan px-4 py-2 rounded-full">
              Profil Perusahaan
            </span>


            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-brand-blue">
              Mountcares Outdoor
            </h1>


            <p className="mt-4 text-xl sm:text-2xl font-bold text-slate-700">
              One Stop Camping Solution
            </p>


            <p className="mt-3 text-sm sm:text-base text-muted">
              Part of Urban Wild Journey Group
            </p>


            <div className="mt-8 max-w-2xl mx-auto">

              <p className="text-sm sm:text-base text-muted leading-relaxed">
                Penyedia perlengkapan outdoor terintegrasi yang menghubungkan
                kebutuhan retail, rental, logistik, dan vendor supply untuk
                mendukung ekosistem petualangan di Malang Utara hingga skala nasional.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          RINGKASAN EKSEKUTIF
          ========================================================= */}

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">

        <div className="max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-start">

            <div>

              <span className="text-brand-cyan text-xs font-bold uppercase tracking-widest">
                01 — Ringkasan Eksekutif
              </span>


              <h2 className="mt-3 text-3xl sm:text-4xl font-black text-brand-blue leading-tight">
                Backbone Infrastruktur Outdoor

                <span className="block text-slate-700">
                  di Malang Utara
                </span>
              </h2>


              <div className="mt-6 space-y-5 text-sm text-muted leading-relaxed">

                <p>
                  <strong className="text-brand-blue">
                    Mountcares Outdoor
                  </strong>{" "}
                  adalah perusahaan penyedia perlengkapan aktivitas luar ruangan
                  (outdoor) terintegrasi yang berbasis di{" "}
                  <strong className="text-brand-blue">
                    Singosari, Kabupaten Malang
                  </strong>.
                </p>


                <p>
                  Sebagai bagian strategis dari ekosistem{" "}
                  <strong className="text-brand-blue">
                    Urban Wild Journey Group
                  </strong>,
                  Mountcares Outdoor berperan sebagai pilar penyedia infrastruktur
                  logistik, retail, dan suplai inventaris petualangan untuk koridor
                  Malang Utara.
                </p>


                <p>
                  Dengan slogan{" "}
                  <strong className="text-brand-blue">
                    "One Stop Camping Solution"
                  </strong>,
                  perusahaan mengoperasikan dua pilar bisnis utama:
                  E-Commerce & Retail skala nasional serta Rental & Vendor Supply
                  Perlengkapan Camping.
                </p>


                <p>
                  Kapasitas tersebut memungkinkan Mountcares Outdoor melayani
                  kebutuhan petualang retail, korporasi, operator trip, hingga
                  manajemen destinasi wisata secara holistik.
                </p>

              </div>

            </div>


            {/* INFO CARD */}

            <div className="bg-slate-50 border border-border rounded-3xl p-7 sm:p-8 shadow-sm">

              <h3 className="font-bold text-brand-blue uppercase tracking-wider text-xs border-b border-border pb-4">
                Profil Operasional
              </h3>


              <div className="mt-5 space-y-5">

                <div>
                  <p className="text-xs text-muted">
                    Lokasi
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    Singosari, Kabupaten Malang
                  </p>
                </div>


                <div>
                  <p className="text-xs text-muted">
                    Wilayah Strategis
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    Koridor Singosari — Lawang
                  </p>
                </div>


                <div>
                  <p className="text-xs text-muted">
                    Induk Usaha
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    Urban Wild Journey Group
                  </p>
                </div>


                <div>
                  <p className="text-xs text-muted">
                    Fokus Bisnis
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    Retail • Rental • Logistics • Vendor Supply
                  </p>
                </div>


                <div>
                  <p className="text-xs text-muted">
                    Positioning
                  </p>

                  <p className="mt-1 text-sm font-bold text-brand-blue">
                    One Stop Camping Solution
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          HUBUNGAN STRATEGIS
          ========================================================= */}

      <section className="bg-slate-50 border-y border-border py-16 sm:py-20 px-4 sm:px-6 lg:px-8">

        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto">

            <span className="text-brand-cyan text-xs font-bold uppercase tracking-widest">
              02 — Hubungan Strategis
            </span>


            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-brand-blue">
              Ekosistem Hulu ke Hilir
            </h2>


            <p className="mt-4 text-sm text-muted leading-relaxed">
              Integrasi Urban Wild Journey dan Mountcares Outdoor membentuk
              rantai bisnis petualangan yang saling terhubung dari pengalaman
              wisata hingga penyediaan inventaris dan logistik.
            </p>

          </div>


          <div className="mt-12 grid md:grid-cols-2 gap-6 items-stretch">

            {/* URBAN WILD */}

            <div className="relative bg-white border border-border rounded-3xl p-7 sm:p-8 shadow-sm">

              <div className="absolute top-5 right-5">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">
                  HULU
                </span>
              </div>


              <img
                src="/logo-urban-wild-journey.png"
                alt="Urban Wild Journey"
                className="h-20 w-auto object-contain object-left"
              />


              <h3 className="mt-6 text-xl font-black text-brand-blue">
                Experiential Tourism
              </h3>


              <p className="mt-3 text-sm text-muted leading-relaxed">
                Fokus pada penyelenggaraan pengalaman petualangan dan wisata,
                termasuk Open Trip, Private Trip, Custom Trip, City Tour,
                Eco Camp, Family Gathering, serta program pengembangan kapasitas
                korporasi.
              </p>


              <div className="mt-6 flex flex-wrap gap-2">

                {[
                  "Open Trip",
                  "Private Trip",
                  "Custom Trip",
                  "City Tour",
                  "Eco Camp",
                  "Family Gathering",
                  "Corporate Program",
                ].map((item) => (

                  <span
                    key={item}
                    className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full"
                  >
                    {item}
                  </span>

                ))}

              </div>

            </div>


            {/* MOUNTCARES */}

            <div className="relative bg-white border-2 border-brand-cyan/30 rounded-3xl p-7 sm:p-8 shadow-sm">

              <div className="absolute top-5 right-5">

                <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-light-cyan text-brand-blue">
                  HILIR
                </span>

              </div>


              <img
                src="/logo-mountcares.png"
                alt="Mountcares Outdoor"
                className="h-16 w-auto object-contain object-left"
              />


              <h3 className="mt-6 text-xl font-black text-brand-blue">
                Inventory & Logistics Supply
              </h3>


              <p className="mt-3 text-sm text-muted leading-relaxed">
                Bertindak sebagai penyedia sarana fisik, pengelola stok alat
                camping skala besar, rental equipment, fulfillment vendor,
                serta manajemen perawatan alat melalui laundry dan repair.
              </p>


              <div className="mt-6 flex flex-wrap gap-2">

                {[
                  "Inventory",
                  "Rental",
                  "Vendor Supply",
                  "Logistics",
                  "Laundry",
                  "Repair",
                ].map((item) => (

                  <span
                    key={item}
                    className="text-xs bg-brand-light-cyan text-brand-blue px-3 py-1.5 rounded-full"
                  >
                    {item}
                  </span>

                ))}

              </div>

            </div>

          </div>


          {/* INTEGRATION */}

          <div className="mt-8 bg-brand-blue text-white rounded-3xl p-7 sm:p-8 text-center">

            <p className="text-sm sm:text-base font-semibold leading-relaxed">
              Urban Wild Journey menciptakan pengalaman petualangan,
              sementara Mountcares Outdoor memastikan seluruh kebutuhan
              inventaris dan logistik tersedia dengan kapasitas yang terjamin.
            </p>


            <p className="mt-3 text-xs sm:text-sm text-white/70">
              Rental Alat Camping pada lini Urban Wild Journey dipasok oleh
              kapasitas inventaris Mountcares Outdoor.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================================
          VISI MISI
          ========================================================= */}

      <section
        id="visi-misi"
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
      >

        <div className="max-w-6xl mx-auto">

          <div className="text-center">

            <span className="text-brand-cyan text-xs font-bold uppercase tracking-widest">
              03 — Visi & Misi
            </span>


            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-brand-blue">
              Arah Pertumbuhan Perusahaan
            </h2>

          </div>


          <div className="mt-12 grid md:grid-cols-2 gap-6">

            {/* VISI */}

            <div className="bg-brand-blue text-white rounded-3xl p-8 sm:p-10 shadow-lg">

              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
                🎯
              </div>


              <p className="mt-7 text-xs uppercase tracking-widest text-brand-light-cyan font-bold">
                Visi
              </p>


              <h3 className="mt-2 text-2xl font-black">
                Pusat Logistik & Rental Outdoor Utama
              </h3>


              <p className="mt-5 text-sm text-white/80 leading-relaxed">
                Menjadi pusat logistik dan rental alat camping utama di area
                Malang Utara serta memperkuat ekosistem Urban Wild Journey Group
                dalam perluasan jaringan layanan petualangan regional maupun
                nasional.
              </p>

            </div>


            {/* MISI */}

            <div className="bg-slate-50 border border-border rounded-3xl p-8 sm:p-10">

              <div className="w-12 h-12 rounded-2xl bg-brand-light-cyan flex items-center justify-center text-2xl">
                ⚡
              </div>


              <p className="mt-7 text-xs uppercase tracking-widest text-brand-cyan font-bold">
                Misi
              </p>


              <ul className="mt-5 space-y-5 text-sm text-muted leading-relaxed">

                <li className="flex gap-3">
                  <span className="text-brand-cyan font-black">
                    01
                  </span>

                  <span>
                    Mengamankan dan memperkuat kerja sama strategis sebagai
                    vendor suplai untuk lini bisnis trip, akomodasi, dan event
                    di bawah jaringan Urban Wild Journey.
                  </span>
                </li>


                <li className="flex gap-3">
                  <span className="text-brand-cyan font-black">
                    02
                  </span>

                  <span>
                    Menjaga konsistensi kualitas, higienitas, dan kelayakan stok
                    alat sebagai standar pendukung keselamatan dan kenyamanan
                    perjalanan.
                  </span>
                </li>

              </ul>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          SEJARAH
          ========================================================= */}

      <section className="bg-slate-50 border-y border-border py-16 sm:py-20 px-4 sm:px-6 lg:px-8">

        <div className="max-w-5xl mx-auto">

          <div className="text-center">

            <span className="text-brand-cyan text-xs font-bold uppercase tracking-widest">
              04 — Sejarah & Perjalanan
            </span>


            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-brand-blue">
              Dari Usaha Digital Menjadi Infrastruktur Outdoor
            </h2>

          </div>


          <div className="mt-12 relative">

            <div className="absolute left-[19px] sm:left-[31px] top-4 bottom-4 w-px bg-brand-cyan/30" />


            <div className="space-y-10">

              {/* 2017 */}

              <div className="relative flex gap-5 sm:gap-8">

                <div className="relative z-10 w-10 h-10 sm:w-16 sm:h-16 shrink-0 rounded-full bg-brand-blue text-white flex items-center justify-center font-black text-xs sm:text-sm">
                  2017
                </div>


                <div className="pt-1">

                  <h3 className="text-lg font-black text-brand-blue">
                    Awal Berdiri
                  </h3>


                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    Resmi didirikan pada 1 Januari 2017. Mengawali perjalanan
                    dari usaha jual beli perlengkapan outdoor skala kecil secara
                    digital melalui Facebook dan Instagram.
                  </p>

                </div>

              </div>


              {/* 2018 */}

              <div className="relative flex gap-5 sm:gap-8">

                <div className="relative z-10 w-10 h-10 sm:w-16 sm:h-16 shrink-0 rounded-full bg-brand-cyan text-white flex items-center justify-center font-black text-xs sm:text-sm">
                  2018
                </div>


                <div className="pt-1">

                  <h3 className="text-lg font-black text-brand-blue">
                    Toko Fisik & Unit Rental
                  </h3>


                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    Pada 30 September 2018 membuka toko fisik pertama dengan
                    memanfaatkan ruang tamu rumah. Langkah ini sekaligus
                    menandai diversifikasi ke layanan rental alat camping.
                  </p>

                </div>

              </div>


              {/* 2020 */}

              <div className="relative flex gap-5 sm:gap-8">

                <div className="relative z-10 w-10 h-10 sm:w-16 sm:h-16 shrink-0 rounded-full bg-sky-600 text-white flex items-center justify-center font-black text-xs sm:text-sm">
                  2020
                </div>


                <div className="pt-1">

                  <h3 className="text-lg font-black text-brand-blue">
                    Pivot E-Commerce & Skalabilitas
                  </h3>


                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    Di tengah pandemi COVID-19, perusahaan membangun infrastruktur
                    E-Commerce dan sistem reseller. Strategi ini menghasilkan
                    pertumbuhan omzet yang jauh melampaui unit rental.
                  </p>

                </div>

              </div>


              {/* 2026 */}

              <div className="relative flex gap-5 sm:gap-8">

                <div className="relative z-10 w-10 h-10 sm:w-16 sm:h-16 shrink-0 rounded-full bg-brand-blue text-white flex items-center justify-center font-black text-xs sm:text-sm">
                  2026
                </div>


                <div className="pt-1">

                  <h3 className="text-lg font-black text-brand-blue">
                    Integrasi Urban Wild Journey
                  </h3>


                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    Setelah berkembang melalui unit rental dan e-commerce,
                    Mountcares Outdoor merestrukturisasi posisinya menjadi bagian
                    dari Urban Wild Journey Group untuk mengonsolidasikan pasar
                    wisata pengalaman dan penyediaan logistik outdoor.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          PILAR BISNIS
          ========================================================= */}

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">

        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto">

            <span className="text-brand-cyan text-xs font-bold uppercase tracking-widest">
              05 — Pilar Bisnis
            </span>


            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-brand-blue">
              Dua Mesin Utama Mountcares Outdoor
            </h2>


            <p className="mt-4 text-sm text-muted leading-relaxed">
              Menggabungkan kekuatan perdagangan outdoor nasional dengan
              kapasitas rental dan vendor supply regional.
            </p>

          </div>


          <div className="mt-12 grid lg:grid-cols-2 gap-8">

            {/* ECOMMERCE */}

            <div className="rounded-3xl border border-border bg-white p-8 shadow-sm hover:shadow-md transition">

              <div className="w-14 h-14 rounded-2xl bg-brand-light-cyan flex items-center justify-center text-2xl">
                🛒
              </div>


              <p className="mt-6 text-xs font-bold uppercase tracking-widest text-brand-cyan">
                Pilar A
              </p>


              <h3 className="mt-2 text-2xl font-black text-brand-blue">
                E-Commerce & Retail
              </h3>


              <span className="inline-block mt-2 text-xs font-bold bg-slate-100 px-3 py-1 rounded-full">
                Skala Nasional
              </span>


              <p className="mt-5 text-sm text-muted leading-relaxed">
                Menjadi generator pendapatan utama yang melayani segmen retail
                dan pasar reseller di seluruh Indonesia dengan dukungan gudang
                fulfillment terdedikasi untuk menjaga efisiensi rantai pasok
                perlengkapan outdoor.
              </p>

            </div>


            {/* RENTAL */}

            <div className="rounded-3xl border-2 border-brand-cyan/30 bg-gradient-to-br from-white to-brand-light-cyan/20 p-8 shadow-sm">

              <div className="w-14 h-14 rounded-2xl bg-brand-blue text-white flex items-center justify-center text-2xl">
                ⛺
              </div>


              <p className="mt-6 text-xs font-bold uppercase tracking-widest text-brand-cyan">
                Pilar B
              </p>


              <h3 className="mt-2 text-2xl font-black text-brand-blue">
                Rental & Vendor Supply
              </h3>


              <span className="inline-block mt-2 text-xs font-bold bg-brand-blue text-white px-3 py-1 rounded-full">
                One Stop Camping Solution
              </span>


              <p className="mt-5 text-sm text-muted leading-relaxed">
                Pusat penyewaan dan penyediaan logistik dengan kapasitas besar
                di koridor Singosari-Lawang untuk kebutuhan personal, wisata,
                corporate event, trip organizer, destinasi eco-camp, hingga
                mitra rental.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          DETAIL LAYANAN
          ========================================================= */}

      <section className="bg-slate-50 border-y border-border py-16 sm:py-20 px-4 sm:px-6 lg:px-8">

        <div className="max-w-6xl mx-auto">

          <div className="text-center">

            <span className="text-brand-cyan text-xs font-bold uppercase tracking-widest">
              Layanan
            </span>


            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-brand-blue">
              Solusi Outdoor dari Satu Pintu
            </h2>

          </div>


          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              {
                icon: "⛺",
                title: "Rental Satuan & Paket",
                text: "Penyediaan alat mulai dari unit satuan hingga pemenuhan paket camping berskala besar.",
              },
              {
                icon: "🚚",
                title: "Fulfillment Vendor B2B",
                text: "Suplai logistik untuk trip organizer, agensi tour, eco-camp, event dan mitra rental.",
              },
              {
                icon: "🛠️",
                title: "On-Site Premium",
                text: "Pengantaran, penjemputan serta jasa profesional pemasangan dan pembongkaran tenda.",
              },
              {
                icon: "🧼",
                title: "Laundry & Repair",
                text: "Perawatan, pencucian higienis dan perbaikan perlengkapan outdoor milik publik.",
              },
            ].map((service) => (

              <div
                key={service.title}
                className="bg-white border border-border rounded-2xl p-6 shadow-sm"
              >

                <div className="w-11 h-11 rounded-xl bg-brand-light-cyan flex items-center justify-center text-xl">
                  {service.icon}
                </div>


                <h3 className="mt-5 font-bold text-brand-blue text-sm">
                  {service.title}
                </h3>


                <p className="mt-3 text-xs text-muted leading-relaxed">
                  {service.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          KEUNGGULAN & TEKNOLOGI
          ========================================================= */}

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">

        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto">

            <span className="text-brand-cyan text-xs font-bold uppercase tracking-widest">
              06 — Competitive Advantage
            </span>


            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-brand-blue">
              Kapasitas, Kualitas & Teknologi
            </h2>

          </div>


          <div className="mt-12 grid md:grid-cols-2 gap-5">

            {[
              {
                icon: "📦",
                title: "Dominasi Kapasitas Stok",
                text: "Volume inventaris besar untuk mendukung kebutuhan event dan pemenuhan pesanan tanpa risiko kekurangan suplai.",
              },
              {
                icon: "🧼",
                title: "Sistem Higienitas Terpadu",
                text: "Divisi laundry internal untuk pembersihan dan pemeliharaan alat pasca-sewa sebelum kembali ke penyimpanan.",
              },
              {
                icon: "🔧",
                title: "Prepare & Repair Mandiri",
                text: "Pengawasan kelayakan teknis serta proses perbaikan internal untuk memastikan alat siap digunakan di lapangan.",
              },
              {
                icon: "💻",
                title: "Digital B2B Order Tracking",
                text: "Web App berbasis Google Apps Script yang memungkinkan mitra memantau ketersediaan, pemesanan, pengiriman dan laporan logistik secara real-time.",
              },
            ].map((item) => (

              <div
                key={item.title}
                className="flex gap-5 bg-white border border-border rounded-2xl p-6 shadow-sm"
              >

                <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-light-cyan flex items-center justify-center text-xl">
                  {item.icon}
                </div>


                <div>

                  <h3 className="font-bold text-brand-blue">
                    {item.title}
                  </h3>


                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {item.text}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          KONTAK
          ========================================================= */}

      <section
        id="kontak"
        className="bg-brand-blue text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
      >

        <div className="max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div>

              <span className="text-brand-light-cyan text-xs font-bold uppercase tracking-widest">
                07 — Informasi Kontak
              </span>


              <h2 className="mt-3 text-3xl sm:text-4xl font-black">

                Terhubung dengan

                <span className="block text-brand-light-cyan">
                  Mountcares Outdoor
                </span>

              </h2>


              <p className="mt-5 text-sm text-white/75 leading-relaxed max-w-xl">
                Untuk kebutuhan rental, retail, vendor supply, kerja sama
                korporasi, maupun kebutuhan logistik event dan perjalanan,
                tim Mountcares Outdoor siap membantu.
              </p>

            </div>


            <div className="grid sm:grid-cols-2 gap-4">

              <a
                href="https://wa.me/6285536349616"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl p-5 transition"
              >
                <span className="text-2xl">
                  📱
                </span>

                <p className="mt-3 text-xs text-white/60">
                  WhatsApp Resmi
                </p>

                <p className="mt-1 font-bold">
                  0855-3634-9616
                </p>
              </a>


              <a
                href="https://wa.me/6281233182376"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl p-5 transition"
              >
                <span className="text-2xl">
                  🤝
                </span>

                <p className="mt-3 text-xs text-white/60">
                  Kerjasama, Kritik & Saran
                </p>

                <p className="mt-1 font-bold">
                  0812-3318-2376
                </p>
              </a>


              <a
                href="https://www.instagram.com/mountcares_outdoor/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl p-5 transition"
              >
                <span className="text-2xl">
                  📸
                </span>

                <p className="mt-3 text-xs text-white/60">
                  Instagram Utama
                </p>

                <p className="mt-1 font-bold">
                  @mountcares_outdoor
                </p>
              </a>


              <a
                href="https://www.instagram.com/mountcares_rental/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl p-5 transition"
              >
                <span className="text-2xl">
                  ⛺
                </span>

                <p className="mt-3 text-xs text-white/60">
                  Instagram Rental
                </p>

                <p className="mt-1 font-bold">
                  @mountcares_rental
                </p>
              </a>

            </div>

          </div>


          {/* ADDRESS */}

          <div className="mt-10 pt-8 border-t border-white/10">

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <p className="text-xs text-white/50 uppercase tracking-wider">
                  Alamat Operasional
                </p>


                <p className="mt-2 text-sm font-medium">
                  Jln Kebonagung Gg V RT/RW 03/02,
                  Tamanharjo, Singosari, Kab. Malang
                </p>

              </div>


              <div>

                <p className="text-xs text-white/50 uppercase tracking-wider">
                  Situs Resmi
                </p>


                <a
                  href="https://mountcares.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-brand-light-cyan hover:underline"
                >
                  sites.google.com/view/mountcaresoutdoor/home
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
          ========================================================= */}

      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-slate-50">

        <div className="max-w-4xl mx-auto text-center">

          <img
            src="/logo-mountcares.png"
            alt="Mountcares Outdoor"
            className="mx-auto h-16 w-auto object-contain"
          />


          <h2 className="mt-6 text-2xl sm:text-3xl font-black text-brand-blue">
            One Stop Camping Solution
          </h2>


          <p className="mt-3 text-sm text-muted">
            Retail • Rental • Vendor Supply • Logistics • Outdoor Equipment
          </p>


          <div className="mt-7 flex flex-wrap justify-center gap-3">

            <a
              href="https://wa.me/6285536349616"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-md"
            >
              Hubungi Mountcares
            </a>


            <a
              href="https://wa.me/6281233182376"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-md"
            >
              Kerjasama & Vendor Supply
            </a>

          </div>

        </div>

      </section>


    </main>
  )
}