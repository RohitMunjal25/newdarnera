import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-16">
        
        {/* Header */}
        <div className="mb-12 border-b border-gray-900 pb-6">
          <div className="flex items-center gap-2 text-[#d4af37] text-xs tracking-widest uppercase mb-2">
            <span>✦</span>
            <span>MEMBER DASHBOARD</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif tracking-[0.15em] uppercase">MY ACCOUNT</h1>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Profile Card */}
          <div className="bg-[#060606] border border-gray-900 p-6 rounded-sm">
            <h3 className="font-serif text-sm tracking-widest text-[#d4af37] uppercase mb-4">Profile Info</h3>
            <p className="text-xs text-gray-300 mb-1">Rohit Munjal</p>
            <p className="text-xs text-gray-500 mb-6">sample@gmail.com</p>
            <button className="border border-gray-800 text-xs tracking-[0.2em] px-4 py-2 hover:border-[#d4af37] hover:text-[#d4af37] transition-colors uppercase">
              Edit Details
            </button>
          </div>

          {/* Quick Links Card */}
          <div className="bg-[#060606] border border-gray-900 p-6 rounded-sm flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-sm tracking-widest text-[#d4af37] uppercase mb-4">Quick Navigation</h3>
              <ul className="space-y-3 text-xs tracking-wider">
                <li>
                  <Link href="/account/orders" className="text-gray-300 hover:text-[#d4af37] transition-colors flex items-center justify-between">
                    <span>View My Orders</span>
                    <span>→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/collection" className="text-gray-300 hover:text-[#d4af37] transition-colors flex items-center justify-between">
                    <span>Explore Collection</span>
                    <span>→</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Saved Address Card */}
          <div className="bg-[#060606] border border-gray-900 p-6 rounded-sm">
            <h3 className="font-serif text-sm tracking-widest text-[#d4af37] uppercase mb-4">Saved Address</h3>
            <p className="text-xs text-gray-300 leading-relaxed mb-6">
              Flat No. 402, Royal Palms Luxury Towers,<br />
              Main Avenue, Jaipur, Rajasthan - 302001
            </p>
            <button className="border border-gray-800 text-xs tracking-[0.2em] px-4 py-2 hover:border-[#d4af37] hover:text-[#d4af37] transition-colors uppercase">
              Manage Address
            </button>
          </div>

        </div>

        {/* Recent Orders Section Preview */}
        <div className="bg-[#060606] border border-gray-900 p-8 rounded-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif tracking-widest text-lg uppercase">Recent Orders</h2>
            <Link href="/account/orders" className="text-xs tracking-widest text-[#d4af37] hover:underline uppercase">
              View All Orders →
            </Link>
          </div>

          <div className="border-t border-gray-900 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-xs font-mono text-[#d4af37]">ORDER #DRN-98421</p>
              <p className="text-sm font-serif mt-1">EIDOLON (White Oud - 100ml)</p>
              <p className="text-[10px] text-gray-500 mt-1">Placed on: August 2, 2026</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="bg-emerald-950/60 border border-emerald-900 text-emerald-400 text-[10px] tracking-widest px-3 py-1 rounded-sm uppercase">
                Delivered
              </span>
              <span className="font-serif text-sm">₹ 2,999</span>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}