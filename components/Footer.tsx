import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const sections = [
    { title: 'QUICK LINKS', links: ['Home', 'Collection', 'About Us', 'Shop', 'Journal', 'Contact'] },
    { title: 'CUSTOMER CARE', links: ['FAQs', 'Shipping & Delivery', 'Returns & Refunds', 'Terms & Conditions', 'Privacy Policy'] }
  ];

  return (
    <footer className="bg-[#030303] text-gray-400 py-20 px-6 md:px-16 border-t border-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16">
        
        {/* Brand Column - Logo only, no duplicate text */}
        <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
          <Link href="/" className="flex items-center group">
            <Image 
              src="/logo.png?v=4" 
              alt="Darnera Logo" 
              width={220} 
              height={55} 
              unoptimized={true} 
              className="w-[180px] h-auto object-contain" 
            />
          </Link>
          <p className="text-xs text-gray-400 font-light leading-relaxed mt-2">
            Crafted for those who lead. Timeless fragrances that speak confidence, power and presence.
          </p>
        </div>
        
        {/* Link Sections */}
        {sections.map(section => (
          <div key={section.title} className="col-span-1">
            <h4 className="text-[#d4af37] text-xs font-semibold mb-6 tracking-[0.25em] uppercase">{section.title}</h4>
            <ul className="space-y-3 text-xs">
              {section.links.map(link => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors tracking-wider font-light">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        
        {/* Newsletter Column */}
        <div className="col-span-1 md:col-span-2">
          <h4 className="text-[#d4af37] text-xs font-semibold mb-3 tracking-[0.25em] uppercase">EXCLUSIVE NEWSLETTER</h4>
          <p className="text-xs text-gray-400 font-light mb-6 leading-relaxed">
            Stay updated with our latest private releases, olfactory notes and exclusive offers.
          </p>
          <div className="relative max-w-md">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full bg-[#080808] border border-gray-800 focus:border-[#d4af37] rounded-sm px-5 py-3 text-xs text-white placeholder-gray-600 outline-none transition-colors" 
            />
            <button className="absolute right-1.5 top-1.5 bg-[#d4af37] text-black w-9 h-9 rounded-sm flex items-center justify-center font-bold hover:bg-white transition-colors cursor-pointer shadow-md">
              →
            </button>
          </div>
        </div>

      </div>
      
      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-900/80 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 tracking-[0.15em] gap-6 uppercase">
        <p>© 2026 DARNERA. All Rights Reserved.</p>
        <div className="flex items-center gap-3">
          <span className="border border-gray-800 bg-[#080808] px-3 py-1.5 rounded-sm text-gray-400 font-mono">VISA</span>
          <span className="border border-gray-800 bg-[#080808] px-3 py-1.5 rounded-sm text-gray-400 font-mono">MASTERCARD</span>
        </div>
      </div>
    </footer>
  );
}