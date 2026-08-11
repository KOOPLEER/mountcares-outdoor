import { supabase } from '@/lib/supabase';

export default async function Home() {
  // 1. Cek variabel environment
  console.log('--- DEBUG SUPABASE CONNECTOR ---');
  console.log('URL Exist:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('KEY Exist:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  // 2. Query ke Supabase
  const { data: products, error } = await supabase.from('products').select('*');

  // 3. Log hasil dan error
  console.log('DATA PRODUCTS:', products);
  console.log('ERROR STATUS:', error);
  console.log('--------------------------------');

  if (error) {
    console.error('Detail Error:', JSON.stringify(error, null, 2));
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-500 mb-2 text-center">
          MOUNTCARES OUTDOOR
        </h1>
        <p className="text-slate-400 text-center mb-8">
          Katalog Persewaan Alat Camping & Outdoor
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-700 bg-slate-900">
            <thead>
              <tr className="bg-slate-800 border-b border-slate-700">
                <th className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold text-orange-400">
                  Gambar
                </th>
                <th className="border border-slate-700 px-6 py-3 text-left text-sm font-semibold text-orange-400">
                  Nama Produk
                </th>
                <th className="border border-slate-700 px-6 py-3 text-left text-sm font-semibold text-orange-400">
                  Kategori
                </th>
                <th className="border border-slate-700 px-6 py-3 text-left text-sm font-semibold text-orange-400">
                  Stok
                </th>
                <th className="border border-slate-700 px-6 py-3 text-left text-sm font-semibold text-orange-400">
                  Harga / Hari
                </th>
                <th className="border border-slate-700 px-6 py-3 text-center text-sm font-semibold text-orange-400">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {products && products.length > 0 ? (
                products.map((item) => (
                  <tr key={item.id} className="border-b border-slate-700 hover:bg-slate-800 transition">
                    <td className="border border-slate-700 px-4 py-3 text-center">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg mx-auto border border-slate-700"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center text-xs text-slate-500 mx-auto border border-slate-700">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="border border-slate-700 px-6 py-4 text-slate-100 font-medium">
                      {item.name}
                    </td>
                    <td className="border border-slate-700 px-6 py-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-orange-400 bg-orange-950 px-2.5 py-1 rounded-full">
                        {item.category}
                      </span>
                    </td>
                    <td className="border border-slate-700 px-6 py-4 text-slate-300">
                      {item.stock} unit
                    </td>
                    <td className="border border-slate-700 px-6 py-4 text-lg font-bold text-orange-500">
                      Rp {item.price?.toLocaleString('id-ID')}
                    </td>
                    <td className="border border-slate-700 px-6 py-4 text-center">
                      <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
                        Sewa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border border-slate-700 px-6 py-8 text-center text-slate-500">
                    Belum ada data barang di database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}