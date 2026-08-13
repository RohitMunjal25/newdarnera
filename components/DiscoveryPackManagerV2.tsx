"use client";
import { FormEvent, useEffect, useState } from "react";
import { api, token } from "@/lib/api";

type Pack = { _id: string; name: string; description: string; price: number; image: string; bottleCount: number; bottleSizeMl?: number };
const blank = { name: "", description: "", price: "", image: "", bottleCount: "", bottleSizeMl: "" };

export default function DiscoveryPackManagerV2() { 
  const [packs, setPacks] = useState<Pack[]>([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState<string | null>(null);
  const [message, setMessage] = useState(""); 
  
  const load = () => api<{ packs: Pack[] }>("/api/discovery-packs").then(r => setPacks(r.packs)); 
  
  useEffect(() => { load().catch(() => undefined) }, []); 
  
  async function save(e: FormEvent) { 
    e.preventDefault(); 
    try { 
      await api(editing ? `/api/discovery-packs/${editing}` : "/api/discovery-packs", { 
        method: editing ? "PATCH" : "POST", 
        token: token(), 
        body: JSON.stringify({ 
          ...form, 
          price: Number(form.price), 
          bottleCount: Number(form.bottleCount),
          bottleSizeMl: Number(form.bottleSizeMl) // Naya field backend jayega
        }) 
      }); 
      setForm(blank); 
      setEditing(null); 
      setMessage("Discovery pack saved."); 
      load();
    } catch (err) { 
      setMessage(err instanceof Error ? err.message : "Could not save discovery pack."); 
    } 
  } 
  
  async function remove(id: string) { 
    if (!confirm("Delete this discovery pack?")) return; 
    await api(`/api/discovery-packs/${id}`, { method: "DELETE", token: token() }); 
    load(); 
  } 
  
  return (
    <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">
      <div className="rounded-2xl border border-[#ebe3da] bg-white p-6">
        <h2 className="font-serif text-2xl">Manage discovery packs</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {packs.map(pack => (
            <article key={pack._id} className="rounded-xl border border-[#eee7df] p-4">
              <p className="font-medium">{pack.name}</p>
              <p className="mt-1 text-xs text-[#806f63]">
                Set of {pack.bottleCount} ({pack.bottleSizeMl || 18} ML each) · ₹ {pack.price.toLocaleString()}
              </p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => { setEditing(pack._id); setForm({ name: pack.name, description: pack.description, price: String(pack.price), image: pack.image, bottleCount: String(pack.bottleCount), bottleSizeMl: String(pack.bottleSizeMl || "") }) }} className="rounded-lg border px-3 py-2 text-xs">Edit</button>
                <button onClick={() => remove(pack._id)} className="rounded-lg border border-red-200 px-3 py-2 text-xs text-red-700">Delete</button>
              </div>
            </article>
          ))}
        </div>
      </div>
      
      <form onSubmit={save} className="rounded-2xl border border-[#ebe3da] bg-white p-6">
        <h2 className="font-serif text-xl">{editing ? "Update" : "Add"} discovery pack</h2>
        
        {/* Yahan Box labels me clarity de di hai taaki mistake na ho */}
        {([
          ['Pack name', 'name', 'text'],
          ['Kitni bottles ka set hai? (e.g. 4 ya 8)', 'bottleCount', 'number'],
          ['Bottle kitne ML ki hai? (e.g. 18 ya 2)', 'bottleSizeMl', 'number'],
          ['Price', 'price', 'number'],
          ['Image link', 'image', 'text']
        ] as const).map(([label, key, type]) => (
          <label key={key} className="mt-4 block text-xs text-[#796b60]">
            {label}
            <input required type={type} value={form[key as keyof typeof form]} onChange={e => setForm({ ...form, [key]: e.target.value })} className="mt-1 w-full rounded-lg border border-[#e3d9cf] p-3 text-sm" />
          </label>
        ))}
        
        <label className="mt-4 block text-xs text-[#796b60]">Description<textarea required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-1 min-h-24 w-full rounded-lg border border-[#e3d9cf] p-3 text-sm" /></label>
        <button className="mt-5 w-full rounded-xl bg-[#312820] py-3 text-sm text-white">{editing ? "Update" : "Save"} discovery pack</button>
        {message && <p className="mt-3 text-xs text-[#705846]">{message}</p>}
      </form>
    </section>
  ); 
}