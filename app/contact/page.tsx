"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", issue: "General Inquiry", description: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api("/api/contact", {
        method: "POST",
        body: JSON.stringify(form)
      });
      setSuccess("Your message has been sent successfully. We will get back to you soon.");
      setForm({ name: "", email: "", phone: "", issue: "General Inquiry", description: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fffdfa] text-[#342b24]">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[10px] font-bold tracking-[.3em] text-[#a47b60] uppercase">GET IN TOUCH</p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl text-[#342b24]">Contact Darnera</h1>
          <p className="mt-4 text-sm text-[#736254]">
            Have questions about our luxury fragrances or need assistance with your order? Reach out to our team or visit our studio.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 items-start">
          
          {/* Contact Details & Map */}
          <div className="space-y-8">
            <div className="rounded-3xl border border-[#eadfd4] bg-white p-8 shadow-sm space-y-6">
              <h2 className="font-serif text-2xl text-[#342b24]">Darneraluxuryperfume Studio</h2>
              
              <div className="space-y-4 text-sm text-[#736254]">
                <div className="flex items-start gap-3">
                  <span className="text-lg">📍</span>
                  <div>
                    <p className="font-semibold text-[#342b24]">Address:</p>
                    <p>120, scheme 3, Basant Vihar, Alwar, Rajasthan 301001</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-lg">📧</span>
                  <div>
                    <p className="font-semibold text-[#342b24]">Email:</p>
                    <a href="mailto:darneragragnance@gmail.com" className="text-[#a47b60] underline">darneragragnance@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-lg">📞</span>
                  <div>
                    <p className="font-semibold text-[#342b24]">Phone:</p>
                    <a href="tel:08209189741" className="text-[#a47b60] underline">082091 89741</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Box */}
            <div className="rounded-3xl border border-[#eadfd4] overflow-hidden shadow-sm bg-white p-2">
              <div className="relative w-full h-[320px] rounded-2xl overflow-hidden group">
                <iframe
                  title="Darnera Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4567!2d76.60!3d27.56!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397299!2sBasant%20Vihar%2C%20Alwar%2C%20Rajasthan%20301001!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  className="w-full h-full"
                />
                <a 
                  href="https://maps.app.goo.gl/ZecAvnbSP8r3xNFP7?g_st=ic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4"
                >
                  <span className="bg-[#342b24] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg">
                    Open in Google Maps →
                  </span>
                </a>
              </div>
              <p className="text-center text-xs text-[#8c7b6d] py-3">
                Click map to open exact location in Google Maps.
              </p>
            </div>
          </div>

          {/* Contact Form with Phone Number Field */}
          <div className="rounded-3xl border border-[#eadfd4] bg-white p-8 md:p-10 shadow-sm">
            <h2 className="font-serif text-2xl text-[#342b24] mb-6">Send us a message</h2>
            
            {success && <p className="mb-6 rounded-2xl bg-emerald-50 p-4 text-xs font-medium text-emerald-800">{success}</p>}
            {error && <p className="mb-6 rounded-2xl bg-red-50 p-4 text-xs font-medium text-red-700">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block text-xs font-medium text-[#796b60]">
                Your Name
                <input 
                  required 
                  value={form.name} 
                  onChange={e => setForm({...form, name: e.target.value})} 
                  className="mt-2 w-full rounded-xl border border-[#dfd4c9] bg-[#fffdfa] p-3.5 text-sm text-[#342b24] outline-none focus:border-[#a47b60]" 
                  placeholder="Enter your name"
                />
              </label>

              <label className="block text-xs font-medium text-[#796b60]">
                Email Address
                <input 
                  required 
                  type="email" 
                  value={form.email} 
                  onChange={e => setForm({...form, email: e.target.value})} 
                  className="mt-2 w-full rounded-xl border border-[#dfd4c9] bg-[#fffdfa] p-3.5 text-sm text-[#342b24] outline-none focus:border-[#a47b60]" 
                  placeholder="Enter your email"
                />
              </label>

              <label className="block text-xs font-medium text-[#796b60]">
                Phone Number
                <input 
                  required 
                  type="tel"
                  value={form.phone} 
                  onChange={e => setForm({...form, phone: e.target.value})} 
                  className="mt-2 w-full rounded-xl border border-[#dfd4c9] bg-[#fffdfa] p-3.5 text-sm text-[#342b24] outline-none focus:border-[#a47b60]" 
                  placeholder="Enter your mobile number"
                />
              </label>

              <label className="block text-xs font-medium text-[#796b60]">
                Subject / Issue
                <select 
                  value={form.issue} 
                  onChange={e => setForm({...form, issue: e.target.value})} 
                  className="mt-2 w-full rounded-xl border border-[#dfd4c9] bg-[#fffdfa] p-3.5 text-sm text-[#342b24] outline-none focus:border-[#a47b60]"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Status">Order Status & Tracking</option>
                  <option value="Custom / Bulk Order">Custom & Discovery Packs</option>
                </select>
              </label>

              <label className="block text-xs font-medium text-[#796b60]">
                Message
                <textarea 
                  required 
                  rows={5}
                  value={form.description} 
                  onChange={e => setForm({...form, description: e.target.value})} 
                  className="mt-2 w-full rounded-xl border border-[#dfd4c9] bg-[#fffdfa] p-3.5 text-sm text-[#342b24] outline-none focus:border-[#a47b60]" 
                  placeholder="How can we help you?"
                />
              </label>

              <button 
                disabled={loading} 
                className="w-full rounded-xl bg-[#342a22] py-4 text-xs font-semibold tracking-[.18em] text-white transition hover:bg-[#1a1511] disabled:opacity-50"
              >
                {loading ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </form>
          </div>

        </div>

      </div>

      <Footer />
    </main>
  );
}