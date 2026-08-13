"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { api, token } from "@/lib/api";
import AdminContentManager from "@/components/AdminContentManager";
import DiscoveryPackManagerV2 from "@/components/DiscoveryPackManagerV2";

type View = "dashboard" | "products" | "content" | "orders" | "coupons" | "support" | "newsletter";
type Product = { _id: string; name: string; brand?: string; description?: string; category?: string; price: number; stock: number; bottleSizeMl?: number; images?: string[]; coverImage?: string; forHim?: boolean; forHer?: boolean; unisex?: boolean; featured?: boolean };

type OrderItem = { name?: string; title?: string; subtitle?: string; quantity: number; price?: number };
type Order = { 
  _id: string; 
  finalAmount?: number; 
  totalAmount: number; 
  orderStatus: string; 
  paymentStatus: string; 
  trackingLink?: string; 
  courierName?: string; 
  userId?: { name: string; email: string }; 
  createdAt: string;
  items?: OrderItem[];
  products?: OrderItem[]; // Purane orders ke liye fallback
};

type Coupon = { _id: string; code: string; discountType: string; discountValue: number; usageLimit?: number; usedCount: number };
type Ticket = { _id: string; ticketNumber: string; name: string; email: string; issue: string; description: string; attachmentUrl?: string; status: string };

const nav: { id: View; label: string }[] = [{ id: "dashboard", label: "Overview" }, { id: "products", label: "Products" }, { id: "content", label: "Homepage content" }, { id: "orders", label: "Orders" }, { id: "coupons", label: "Coupons" }, { id: "support", label: "Support" }, { id: "newsletter", label: "Newsletter" }];
const money = (amount = 0) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

export default function AdminPage() {
  const [view, setView] = useState<View>("dashboard"), [ready, setReady] = useState(false), [error, setError] = useState("");
  const [stats, setStats] = useState<Record<string, number>>({}), [products, setProducts] = useState<Product[]>([]), [orders, setOrders] = useState<Order[]>([]), [coupons, setCoupons] = useState<Coupon[]>([]), [tickets, setTickets] = useState<Ticket[]>([]), [subscribers, setSubscribers] = useState<{ _id: string; email: string; createdAt: string }[]>([]);
  const [product, setProduct] = useState({ name: "", brand: "", description: "", category: "unisex", price: "", stock: "", bottleSizeMl: "", images: "", coverImage: "", forHim: false, forHer: false, unisex: true, featured: false }), [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [coupon, setCoupon] = useState({ code: "", discountType: "percentage", discountValue: "", usageLimit: "", endDate: "" });
  
  const load = useCallback(async () => { 
    const auth = token(); 
    if (!auth) { setError("Please log in with your admin account first."); setReady(true); return; } 
    try { 
      const [dashboard, productData, orderData, couponData, ticketData, newsletterData] = await Promise.all([
        api<{ stats: Record<string, number> }>("/api/admin/dashboard", { token: auth }), 
        api<{ products: Product[] }>("/api/products?limit=100"), 
        api<{ orders: Order[] }>("/api/orders/admin", { token: auth }), 
        api<{ coupons: Coupon[] }>("/api/coupons", { token: auth }), 
        api<{ contacts: Ticket[] }>("/api/contact/admin", { token: auth }), 
        api<{ subscribers: { _id: string; email: string; createdAt: string }[] }>("/api/newsletter/admin", { token: auth })
      ]); 
      setStats(dashboard.stats); 
      setProducts(productData.products); 
      setOrders(orderData.orders); 
      setCoupons(couponData.coupons); 
      setTickets(ticketData.contacts); 
      setSubscribers(newsletterData.subscribers); 
      setError(""); 
    } catch (err) { 
      setError(err instanceof Error ? err.message : "Could not load admin data."); 
    } finally { 
      setReady(true); 
    } 
  }, []);
  
  useEffect(() => { load(); }, [load]);
  
  const resetProduct = () => { 
    setProduct({ name: "", brand: "", description: "", category: "unisex", price: "", stock: "", bottleSizeMl: "", images: "", coverImage: "", forHim: false, forHer: false, unisex: true, featured: false }); 
    setEditingProductId(null); 
  };
  
  const editProduct = (p: Product) => { 
    setEditingProductId(p._id); 
    setProduct({ name: p.name, brand: p.brand || "", description: p.description || "", category: p.category || "unisex", price: String(p.price), stock: String(p.stock), bottleSizeMl: p.bottleSizeMl ? String(p.bottleSizeMl) : "", images: p.images?.join("\n") || "", coverImage: p.coverImage || p.images?.[0] || "", forHim: !!p.forHim || p.category === "him", forHer: !!p.forHer || p.category === "her", unisex: p.unisex ?? p.category === "unisex", featured: !!p.featured }); 
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };
  
  async function createProduct(event: FormEvent) { 
    event.preventDefault(); 
    try { 
      const payload = { ...product, price: Number(product.price), stock: Number(product.stock), bottleSizeMl: product.bottleSizeMl ? Number(product.bottleSizeMl) : null, images: product.images.split("\n").map((x) => x.trim()).filter(Boolean) }; 
      await api(editingProductId ? `/api/products/${editingProductId}` : "/api/products", { method: editingProductId ? "PATCH" : "POST", token: token(), body: JSON.stringify(payload) }); 
      resetProduct(); 
      await load(); 
    } catch (err) { 
      setError(err instanceof Error ? err.message : "Product could not be saved."); 
    } 
  }
  
  async function deleteProduct(id: string) { 
    if (!window.confirm("Delete this product permanently?")) return; 
    try { 
      await api(`/api/products/${id}`, { method: "DELETE", token: token() }); 
      if (editingProductId === id) resetProduct(); 
      await load(); 
    } catch (err) { 
      setError(err instanceof Error ? err.message : "Product could not be deleted."); 
    } 
  }
  
  async function createCoupon(event: FormEvent) { 
    event.preventDefault(); 
    try { 
      await api("/api/coupons", { method: "POST", token: token(), body: JSON.stringify({ ...coupon, discountValue: Number(coupon.discountValue), usageLimit: coupon.usageLimit ? Number(coupon.usageLimit) : null, endDate: coupon.endDate || null }) }); 
      setCoupon({ code: "", discountType: "percentage", discountValue: "", usageLimit: "", endDate: "" }); 
      await load(); 
    } catch (err) { 
      setError(err instanceof Error ? err.message : "Coupon could not be saved."); 
    } 
  }
  
  async function ship(order: Order) { 
    const trackingLink = window.prompt("Tracking URL", order.trackingLink || ""); 
    if (trackingLink === null) return; 
    const courierName = window.prompt("Courier partner", order.courierName || ""); 
    if (courierName === null) return; 
    try { 
      await api(`/api/orders/admin/${order._id}`, { method: "PATCH", token: token(), body: JSON.stringify({ orderStatus: "shipped", trackingLink, courierName }) }); 
      await load(); 
    } catch (err) { 
      setError(err instanceof Error ? err.message : "Order could not be updated."); 
    } 
  }
  
  async function resolve(ticket: Ticket) { 
    const resolutionNote = window.prompt("Resolution note for customer", ""); 
    if (resolutionNote === null) return; 
    try { 
      await api(`/api/contact/admin/${ticket._id}`, { method: "PATCH", token: token(), body: JSON.stringify({ status: "resolved", resolutionNote }) }); 
      await load(); 
    } catch (err) { 
      setError(err instanceof Error ? err.message : "Ticket could not be updated."); 
    } 
  }
  
  if (!ready) return <main className="grid min-h-screen place-items-center bg-[#f7f5f0] text-[#3a3029]">Loading Darnera workspace…</main>;
  
  if (error && !stats.totalOrders) return <main className="grid min-h-screen place-items-center bg-[#f7f5f0] p-6"><div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-sm"><p className="mb-4 text-lg">{error}</p><p className="text-sm text-[#887b70]">Login from the storefront with your admin email, then return here.</p><Link href="/" className="mt-6 inline-block rounded-full bg-[#312820] px-6 py-3 text-sm text-white">Go to storefront</Link></div></main>;
  
  const metrics = [{ label: "Total sales", value: money(stats.totalSales), note: "Paid orders" }, { label: "Orders", value: stats.totalOrders || 0, note: "All time" }, { label: "Pending shipment", value: stats.pendingOrders || 0, note: "Needs attention" }, { label: "Returns", value: stats.returnOrders || 0, note: "Cancelled / returned" }];
  
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#3a3029]">
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-[#e6ded5] bg-[#fffdfa] p-6 lg:block">
          <Link href="/" className="mb-12 block font-serif text-2xl tracking-[.22em]">DARNERA</Link>
          <p className="mb-4 text-[10px] font-semibold tracking-[.18em] text-[#9d8e81]">ADMIN WORKSPACE</p>
          {nav.map((item) => (
            <button key={item.id} onClick={() => setView(item.id)} className={`mb-1 block w-full rounded-xl px-4 py-3 text-left text-sm transition ${view === item.id ? "bg-[#312820] text-white shadow-lg" : "text-[#75685e] hover:bg-[#f3eee7]"}`}>
              {item.label}
            </button>
          ))}
          <Link href="/" className="absolute bottom-8 text-sm text-[#806e60]">← View storefront</Link>
        </aside>
        <section className="min-w-0 flex-1 p-5 md:p-10">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-[.2em] text-[#a88a70]">DARNERA / ADMIN</p>
              <h1 className="mt-2 font-serif text-3xl capitalize md:text-4xl">{view}</h1>
            </div>
            <button onClick={load} className="rounded-full border border-[#dfd4c8] bg-white px-4 py-2 text-xs">Refresh data</button>
          </header>
          {error && <p className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
          
          {view === "dashboard" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((m) => (
                  <article key={m.label} className="rounded-2xl border border-[#ebe3da] bg-white p-5 shadow-sm">
                    <p className="text-xs text-[#8d7e70]">{m.label}</p>
                    <p className="mt-3 font-serif text-3xl">{m.value}</p>
                    <p className="mt-2 text-xs text-[#ad9e90]">{m.note}</p>
                  </article>
                ))}
              </div>
              <Panel title="Recent orders"><Orders orders={orders.slice(0, 6)} onShip={ship} /></Panel>
            </>
          )}
          
          {view === "products" && (
            <div className="grid gap-6 xl:grid-cols-[1fr_390px]">
              <Panel title="Product catalogue">
                <div className="grid gap-3 sm:grid-cols-2">
                  {products.map((p) => (
                    <article key={p._id} className="rounded-xl border border-[#eee7df] p-4">
                      <p className="font-medium">{p.name} {p.bottleSizeMl ? `(${p.bottleSizeMl} ML)` : ""}</p>
                      <p className="mt-1 text-sm text-[#8b7d72]">{p.category || "Uncategorised"} · {p.stock} in stock</p>
                      <p className="mt-3 font-serif">{money(p.price)}</p>
                      <div className="mt-4 flex gap-2">
                        <button onClick={() => editProduct(p)} className="rounded-lg border border-[#decfc1] px-3 py-2 text-xs text-[#705846]">Edit product</button>
                        <button onClick={() => deleteProduct(p._id)} className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600 hover:bg-red-100">Delete</button>
                      </div>
                    </article>
                  ))}
                </div>
              </Panel>
              <form onSubmit={createProduct} className="h-fit rounded-2xl border border-[#ebe3da] bg-white p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-serif text-xl">{editingProductId ? "Update product" : "Add product"}</h2>
                  {editingProductId && <button type="button" onClick={resetProduct} className="text-xs text-[#896c55]">Cancel edit</button>}
                </div>
                <Input label="Product name" value={product.name} set={(x) => setProduct({ ...product, name: x })} required />
                <Input label="Brand" value={product.brand} set={(x) => setProduct({ ...product, brand: x })} />
                <Input label="Description" value={product.description} set={(x) => setProduct({ ...product, description: x })} />
                
                <div className="grid grid-cols-3 gap-3">
                  <Input label="Price" type="number" value={product.price} set={(x) => setProduct({ ...product, price: x })} required />
                  <Input label="Stock" type="number" value={product.stock} set={(x) => setProduct({ ...product, stock: x })} required />
                  <label className="mb-4 block text-xs text-[#796b60]">
                    Size (ML)
                    <select value={product.bottleSizeMl} onChange={(e) => setProduct({ ...product, bottleSizeMl: e.target.value })} className="mt-1 w-full rounded-lg border border-[#e3d9cf] p-3 text-sm outline-none focus:border-[#9b765a]">
                      <option value="">Select size</option>
                      <option value="2">2 ML</option>
                      <option value="18">18 ML</option>
                      <option value="50">50 ML</option>
                    </select>
                  </label>
                </div>
                
                <Input label="Cover image URL" value={product.coverImage} set={(x) => setProduct({ ...product, coverImage: x })} />
                <label className="mb-4 block text-xs text-[#796b60]">
                  Category
                  <select value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} className="mt-1 w-full rounded-lg border border-[#e3d9cf] p-3 text-sm outline-none focus:border-[#9b765a]">
                    <option value="unisex">Unisex</option>
                    <option value="him">For him</option>
                    <option value="her">For her</option>
                  </select>
                </label>
                <div className="mb-4 grid grid-cols-2 gap-2 text-xs text-[#796b60]">
                  {[["forHim", "For him"], ["forHer", "For her"], ["unisex", "Unisex"], ["featured", "Homepage featured"]].map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 rounded-lg bg-[#f7f2ec] p-2">
                      <input type="checkbox" checked={product[key as keyof typeof product] as boolean} onChange={(e) => setProduct({ ...product, [key]: e.target.checked })} />
                      {label}
                    </label>
                  ))}
                </div>
                <label className="mb-5 block text-xs text-[#796b60]">
                  Image URLs (one per line)
                  <textarea value={product.images} onChange={(e) => setProduct({ ...product, images: e.target.value })} className="mt-1 min-h-24 w-full rounded-lg border border-[#e3d9cf] p-3 text-sm outline-none focus:border-[#9b765a]" />
                </label>
                <button className="w-full rounded-xl bg-[#312820] py-3 text-sm text-white">
                  {editingProductId ? "Update product" : "Save product"}
                </button>
              </form>
            </div>
          )}
          
          {view === "orders" && <Panel title="All orders"><Orders orders={orders} onShip={ship} /></Panel>}
          
          {view === "coupons" && (
            <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
              <Panel title="Active coupons">
                <div className="grid gap-3 sm:grid-cols-2">
                  {coupons.map((c) => (
                    <article key={c._id} className="rounded-xl border border-[#eee7df] p-4">
                      <p className="font-semibold tracking-wider">{c.code}</p>
                      <p className="mt-2 text-sm">{c.discountValue}{c.discountType === "percentage" ? "%" : " ₹"} off</p>
                      <p className="mt-2 text-xs text-[#907f71]">Used {c.usedCount}{c.usageLimit ? ` / ${c.usageLimit}` : ""}</p>
                    </article>
                  ))}
                </div>
              </Panel>
              <form onSubmit={createCoupon} className="h-fit rounded-2xl border border-[#ebe3da] bg-white p-6">
                <h2 className="mb-5 font-serif text-xl">Create coupon</h2>
                <Input label="Code" value={coupon.code} set={(x) => setCoupon({ ...coupon, code: x.toUpperCase() })} required />
                <Input label="Discount value" type="number" value={coupon.discountValue} set={(x) => setCoupon({ ...coupon, discountValue: x })} required />
                <label className="mb-4 block text-xs text-[#796b60]">
                  Type
                  <select value={coupon.discountType} onChange={(e) => setCoupon({ ...coupon, discountType: e.target.value })} className="mt-1 w-full rounded-lg border border-[#e3d9cf] p-3 text-sm outline-none focus:border-[#9b765a]">
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed amount</option>
                  </select>
                </label>
                <Input label="Usage limit (optional)" type="number" value={coupon.usageLimit} set={(x) => setCoupon({ ...coupon, usageLimit: x })} />
                <Input label="Expiry date (optional)" type="date" value={coupon.endDate} set={(x) => setCoupon({ ...coupon, endDate: x })} />
                <button className="w-full rounded-xl bg-[#312820] py-3 text-sm text-white">Create coupon</button>
              </form>
            </div>
          )}
          
          {view === "support" && (
            <Panel title="Support tickets">
              <div className="space-y-3">
                {tickets.map((t) => (
                  <article key={t._id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#eee7df] p-4">
                    <div>
                      <p className="font-medium">{t.issue} <span className="ml-2 text-xs text-[#9a8b7e]">#{t.ticketNumber}</span></p>
                      <p className="mt-1 text-sm text-[#827469]">{t.name} · {t.email}</p>
                      <p className="mt-1 max-w-2xl text-sm text-[#827469]">{t.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {t.attachmentUrl && <a className="text-sm text-[#896c55]" href={t.attachmentUrl} target="_blank">Attachment</a>}
                      <span className="rounded-full bg-[#f2ede7] px-3 py-1 text-xs capitalize">{t.status.replace("_", " ")}</span>
                      {t.status !== "resolved" && <button onClick={() => resolve(t)} className="rounded-lg bg-[#312820] px-3 py-2 text-xs text-white">Resolve</button>}
                    </div>
                  </article>
                ))}
              </div>
            </Panel>
          )}
          
          {view === "newsletter" && (
            <Panel title={`${subscribers.length} subscribers`}>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {subscribers.map((s) => (
                  <article key={s._id} className="rounded-xl border border-[#eee7df] p-4">
                    <p>{s.email}</p>
                    <p className="mt-1 text-xs text-[#9c8d80]">Joined {new Date(s.createdAt).toLocaleDateString("en-IN")}</p>
                  </article>
                ))}
              </div>
            </Panel>
          )}
          
          {view === "content" && <><AdminContentManager /><DiscoveryPackManagerV2 /></>}
        </section>
      </div>
    </main>
  );
}

function Input({ label, value, set, type = "text", required = false }: { label: string; value: string; set: (value: string) => void; type?: string; required?: boolean }) { 
  return (
    <label className="mb-4 block text-xs text-[#796b60]">
      {label}
      <input required={required} type={type} value={value} onChange={(e) => set(e.target.value)} className="mt-1 w-full rounded-lg border border-[#e3d9cf] p-3 text-sm outline-none focus:border-[#9b765a]" />
    </label>
  ); 
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) { 
  return (
    <section className="mt-8 rounded-2xl border border-[#ebe3da] bg-white p-6">
      <h2 className="mb-5 font-serif text-xl">{title}</h2>
      {children}
    </section>
  ); 
}

function Orders({ orders, onShip }: { orders: Order[]; onShip: (o: Order) => void }) { 
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px] text-left text-sm">
        <thead className="border-b border-[#eee7df] text-xs text-[#948579]">
          <tr>
            <th className="pb-3">Customer</th>
            <th className="pb-3">Items Ordered</th>
            <th className="pb-3">Date</th>
            <th className="pb-3">Payment</th>
            <th className="pb-3">Status</th>
            <th className="pb-3">Total</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => {
            const orderItems = o.items || o.products || [];

            return (
              <tr key={o._id} className="border-b border-[#f3eee9]">
                <td className="py-4 align-top">
                  <p>{o.userId?.name || "Customer"}</p>
                  <p className="text-xs text-[#97887b]">{o.userId?.email}</p>
                </td>
                <td className="py-4 align-top">
                  {orderItems.length > 0 ? (
                    <div className="space-y-1">
                      {orderItems.map((item, i) => (
                        <p key={i} className="text-xs text-[#705846]">
                          <span className="font-medium text-[#342b24]">{item.quantity || 1}x</span> {item.name || item.title || "Product"}{" "}
                          {item.subtitle && <span className="text-[10px] text-[#97887b] block mt-0.5">({item.subtitle})</span>}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-[#97887b]">No items recorded</span>
                  )}
                </td>
                <td className="py-4 align-top">{new Date(o.createdAt).toLocaleDateString("en-IN")}</td>
                <td className="py-4 align-top capitalize">{o.paymentStatus}</td>
                <td className="py-4 align-top capitalize">{o.orderStatus}</td>
                <td className="py-4 align-top">{money(o.finalAmount || o.totalAmount)}</td>
                <td className="py-4 align-top">
                  {o.trackingLink ? (
                    <div className="text-xs">
                      <p>{o.courierName || "Courier"}</p>
                      <a href={o.trackingLink} target="_blank" className="text-[#705846] underline">Tracking saved</a>
                    </div>
                  ) : (
                    <button onClick={() => onShip(o)} className="rounded-lg border border-[#decfc1] px-3 py-2 text-xs text-[#705846]">Ship / Track</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ); 
}