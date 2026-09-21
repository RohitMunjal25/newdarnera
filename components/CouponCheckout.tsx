"use client";
import { useState } from "react";
import { api } from "@/lib/api";

export default function CouponCheckout({ subtotal, onApplied }: { subtotal: number; onApplied: (code: string, discount: number) => void }) {
  const [code, setCode] = useState(""), [message, setMessage] = useState(""), [loading, setLoading] = useState(false);
  const apply = async () => { setLoading(true); try { const data = await api<{ discount: number; message?: string }>("/api/coupons/validate", { method: "POST", body: JSON.stringify({ code, subtotal }) }); onApplied(code, data.discount); setMessage(data.message || "Coupon applied."); } catch (err) { onApplied("", 0); setMessage(err instanceof Error ? err.message : "Coupon could not be applied."); } finally { setLoading(false); } };
  return <div className="mt-5 rounded-xl border border-white/15 p-3"><p className="text-xs font-semibold tracking-wider">COUPON</p><div className="mt-2 flex gap-2"><input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="ENTER CODE" className="min-w-0 flex-1 rounded-lg bg-white px-3 py-2 text-xs text-[#342a22] outline-none" /><button type="button" onClick={apply} disabled={!code || loading} className="rounded-lg bg-[#f3d0aa] px-3 text-xs font-semibold text-[#342a22] disabled:opacity-50">{loading ? "..." : "APPLY"}</button></div>{message && <p className="mt-2 text-xs text-[#d4ddd0]">{message}</p>}</div>;
}
