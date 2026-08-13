"use client";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/context/AuthContext";
import { api, token } from "@/lib/api";

type Address = { _id?: string; fullName: string; phone: string; address: string; city: string; state: string; pincode: string }; 
type User = { name: string; email: string; addresses: Address[] }; 
type Order = { _id: string; finalAmount?: number; totalAmount: number; orderStatus: string; createdAt: string };

export default function AccountPage() { 
  const router = useRouter(), { isLoggedIn, logout } = useAuth(); 
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  // Address Form State (Add / Edit)
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ fullName: "", phone: "", address: "", city: "", state: "", pincode: "" });
  const [loading, setLoading] = useState(false);
  
  const load = async () => { 
    try { 
      const data = await api<{ user: User; orders: Order[] }>("/api/auth/profile", { token: token() }); 
      setUser(data.user); 
      setOrders(data.orders); 
      setName(data.user.name); 
    } catch (err) { 
      setError(err instanceof Error ? err.message : "Could not load account."); 
    } 
  }; 

  useEffect(() => { 
    if (isLoggedIn) void load(); 
  }, [isLoggedIn]); 

  async function saveName(event: FormEvent) { 
    event.preventDefault(); 
    try { 
      await api("/api/auth/profile/name", { method: "PATCH", token: token(), body: JSON.stringify({ name }) }); 
      setNote("Profile updated successfully."); 
    } catch (err) { 
      setError(err instanceof Error ? err.message : "Could not update profile."); 
    } 
  } 

  // Add or Update Address Handler
  async function handleSaveAddress(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (editingId) {
        // Edit / Update Address API call
        await api(`/api/auth/addresses/${editingId}`, {
          method: "PATCH",
          token: token(),
          body: JSON.stringify(formData)
        });
        setNote("Address updated successfully.");
      } else {
        // Add New Address API call
        await api("/api/auth/addresses", {
          method: "POST",
          token: token(),
          body: JSON.stringify(formData)
        });
        setNote("Address added successfully.");
      }

      setFormData({ fullName: "", phone: "", address: "", city: "", state: "", pincode: "" });
      setShowForm(false);
      setEditingId(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save address.");
    } finally {
      setLoading(false);
    }
  }

  // Delete Address Handler
  async function handleDeleteAddress(addressId?: string) {
    if (!addressId) return;
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    try {
      await api(`/api/auth/addresses/${addressId}`, {
        method: "DELETE",
        token: token()
      });
      setNote("Address deleted successfully.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete address.");
    }
  }

  // Open Edit Form with pre-filled data
  function startEdit(addr: Address) {
    setEditingId(addr._id || null);
    setFormData({
      fullName: addr.fullName,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode
    });
    setShowForm(true);
  }

  async function leave() { 
    await logout(); 
    router.push("/"); 
  } 

  if (!isLoggedIn) return (
    <main className="min-h-screen bg-[#fffdfa]">
      <Navbar />
      <div className="mx-auto grid min-h-[65vh] max-w-xl place-items-center px-5 text-center">
        <div>
          <p className="text-[10px] font-bold tracking-[.3em] text-[#a47b60]">DARNERA ACCOUNT</p>
          <h1 className="mt-3 font-serif text-4xl text-[#342b24]">Your scent story starts here.</h1>
          <p className="mt-4 text-sm text-[#806f63]">Use the account icon in the navbar to sign in securely.</p>
        </div>
      </div>
      <Footer />
    </main>
  ); 

  return (
    <main className="min-h-screen bg-[#fffdfa]">
      <Navbar />
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-10">
        
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-[#eadfd4] pb-8">
          <div>
            <p className="text-[10px] font-bold tracking-[.28em] text-[#a47b60]">YOUR DARNERA</p>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl text-[#342b24]">Hello, {user?.name || "there"}.</h1>
            <p className="mt-2 text-sm text-[#806f63]">Manage your personal profile, delivery locations, and fragrance orders.</p>
          </div>
          <button onClick={leave} className="rounded-full border border-[#d8c7b8] bg-white px-6 py-3 text-xs font-semibold tracking-[.12em] text-[#735847] transition hover:bg-[#faf7f2]">
            LOG OUT
          </button>
        </div>

        {error && <p className="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
        {note && <p className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">{note}</p>}

        {/* Grid Overview Cards */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          
          {/* Profile Form Card */}
          <section className="rounded-3xl border border-[#eadfd4] bg-white p-8 shadow-sm">
            <p className="text-[10px] font-bold tracking-[.22em] text-[#a47b60]">PROFILE DETAILS</p>
            <form onSubmit={saveName} className="mt-6 max-w-md space-y-5">
              <label className="block text-xs font-medium text-[#796b60]">
                Full name
                <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-xl border border-[#dfd4c9] bg-[#fffdfa] p-3 text-sm text-[#342b24] outline-none focus:border-[#a47b60]" />
              </label>
              <div>
                <p className="text-xs text-[#9c8d80]">Email address</p>
                <p className="mt-1 text-sm font-medium text-[#342b24]">{user?.email}</p>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <button className="rounded-xl bg-[#342a22] px-6 py-3 text-xs font-semibold tracking-[.14em] text-white transition hover:bg-[#1a1511]">
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </section>

          {/* Orders Quick View Card */}
          <section className="relative overflow-hidden rounded-3xl bg-[#314137] p-8 text-[#fffaf3] shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[.22em] text-[#e3bd91]">YOUR ORDERS</p>
              <p className="mt-6 font-serif text-6xl">{orders.length}</p>
              <p className="mt-2 text-sm text-[#d4ddd0]">Curated packages ordered with Darnera</p>
            </div>
            <div className="mt-8">
              <Link href="/account/orders" className="inline-flex items-center gap-2 text-xs font-semibold tracking-[.14em] text-[#f0c99f] transition hover:text-white">
                VIEW ORDER HISTORY →
              </Link>
            </div>
          </section>

        </div>

        {/* Saved Addresses Section */}
        <section className="mt-8 rounded-3xl border border-[#eadfd4] bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[.22em] text-[#a47b60]">DELIVERY PLACES</p>
              <h2 className="mt-2 font-serif text-2xl text-[#342b24]">Saved addresses</h2>
            </div>
            <button 
              onClick={() => { 
                if (showForm) { setEditingId(null); setFormData({ fullName: "", phone: "", address: "", city: "", state: "", pincode: "" }); }
                setShowForm(!showForm); 
              }} 
              className="rounded-full bg-[#342a22] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1a1511]"
            >
              {showForm ? "Cancel" : "+ Add Address"}
            </button>
          </div>

          {/* Add / Edit Address Form Accordion */}
          {showForm && (
            <form onSubmit={handleSaveAddress} className="mt-8 rounded-2xl border border-[#eadfd4] bg-[#faf7f2] p-6">
              <h3 className="font-serif text-lg text-[#342b24] mb-4">{editingId ? "Edit address" : "Add a new delivery address"}</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-medium text-[#796b60]">
                  Full Name
                  <input required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="mt-1.5 w-full rounded-xl border border-[#dfd4c9] bg-white p-3 text-sm text-[#342b24]" />
                </label>
                <label className="text-xs font-medium text-[#796b60]">
                  Phone Number
                  <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="mt-1.5 w-full rounded-xl border border-[#dfd4c9] bg-white p-3 text-sm text-[#342b24]" />
                </label>
                <label className="text-xs font-medium text-[#796b60] sm:col-span-2">
                  Street Address
                  <input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="mt-1.5 w-full rounded-xl border border-[#dfd4c9] bg-white p-3 text-sm text-[#342b24]" />
                </label>
                <label className="text-xs font-medium text-[#796b60]">
                  City
                  <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="mt-1.5 w-full rounded-xl border border-[#dfd4c9] bg-white p-3 text-sm text-[#342b24]" />
                </label>
                <label className="text-xs font-medium text-[#796b60]">
                  State
                  <input required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="mt-1.5 w-full rounded-xl border border-[#dfd4c9] bg-white p-3 text-sm text-[#342b24]" />
                </label>
                <label className="text-xs font-medium text-[#796b60]">
                  Pincode
                  <input required value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} className="mt-1.5 w-full rounded-xl border border-[#dfd4c9] bg-white p-3 text-sm text-[#342b24]" />
                </label>
              </div>
              <button disabled={loading} className="mt-6 rounded-xl bg-[#342a22] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#1a1511]">
                {loading ? "Saving..." : editingId ? "Update Address" : "Save Address"}
              </button>
            </form>
          )}

          {!user?.addresses || user.addresses.length === 0 ? (
            <p className="mt-6 text-sm text-[#806f63]">You haven’t saved a delivery address yet. Click "+ Add Address" above to save one.</p>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {user.addresses.map((address) => (
                <article key={address._id} className="flex flex-col justify-between rounded-2xl border border-[#f0eade] bg-[#faf7f2] p-6 text-sm leading-6 text-[#66584e]">
                  <div>
                    <b className="font-serif text-base text-[#342b24]">{address.fullName}</b>
                    <div className="mt-2 space-y-0.5 text-xs text-[#796b60]">
                      <p>{address.address}</p>
                      <p>{address.city}, {address.state} — {address.pincode}</p>
                      <p className="pt-2 font-medium text-[#342b24]">Phone: {address.phone}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex gap-3 border-t border-[#eadfd4] pt-4">
                    <button onClick={() => startEdit(address)} className="rounded-lg border border-[#d8c7b8] bg-white px-4 py-1.5 text-xs font-medium text-[#735847] transition hover:bg-[#f1e8df]">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteAddress(address._id)} className="rounded-lg border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100">
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </div>
      <Footer />
    </main>
  ); 
}