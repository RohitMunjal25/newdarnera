import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function OrdersPage() {
  const orders = [
    {
      id: "DRN-98421",
      date: "August 2, 2026",
      status: "Delivered",
      total: "₹ 2,999",
      item: "EIDOLON",
      subtitle: "WHITE OUD",
      image: "/perfume/eidolon.png"
    },
    {
      id: "DRN-95112",
      date: "July 14, 2026",
      status: "Processing",
      total: "₹ 1,799",
      item: "NYRA",
      subtitle: "FLORAL ELEGANCE",
      image: "/perfume/nyra.png"
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-16">
        
        {/* Header */}
        <div className="mb-12 border-b border-gray-900 pb-6 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 text-[#d4af37] text-xs tracking-widest uppercase mb-2">
              <span>✦</span>
              <span>PURCHASE HISTORY</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif tracking-[0.15em] uppercase">MY ORDERS</h1>
          </div>
          <Link href="/account" className="text-xs text-gray-400 hover:text-[#d4af37] tracking-widest uppercase">
            ← Back to Account
          </Link>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((ord) => (
            <div key={ord.id} className="bg-[#060606] border border-gray-900 p-6 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="flex items-center gap-5 w-full md:w-auto">
                <div className="relative w-16 h-20 bg-black border border-gray-800 rounded-sm overflow-hidden flex-shrink-0">
                  <Image src={ord.image} alt={ord.item} fill className="object-cover p-2" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[#d4af37] tracking-widest">{ord.id}</p>
                  <h3 className="font-serif text-lg tracking-wider uppercase mt-1">{ord.item}</h3>
                  <p className="text-[9px] text-gray-400 tracking-widest uppercase">{ord.subtitle}</p>
                  <p className="text-xs text-gray-500 mt-1">Ordered on {ord.date}</p>
                </div>
              </div>

              <div className="flex flex-row md:flex-col justify-between items-end w-full md:w-auto border-t md:border-t-0 border-gray-900 pt-4 md:pt-0">
                <span className={`text-[10px] tracking-widest px-3 py-1 rounded-sm uppercase mb-2 ${
                  ord.status === 'Delivered' 
                    ? 'bg-emerald-950/60 border border-emerald-900 text-emerald-400' 
                    : 'bg-amber-950/60 border border-amber-900 text-amber-400'
                }`}>
                  {ord.status}
                </span>
                <span className="font-serif text-lg text-[#d4af37]">{ord.total}</span>
              </div>

            </div>
          ))}
        </div>

      </div>

      <Footer />
    </main>
  );
}