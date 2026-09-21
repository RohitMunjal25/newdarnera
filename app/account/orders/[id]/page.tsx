"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api, token } from "@/lib/api";

type OrderProduct = {
  _id?: string;
  productId?: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
};

type Order = {
  _id: string;
  products: OrderProduct[];
  totalAmount: number;
  discountAmount?: number;
  finalAmount?: number;
  couponCode?: string;
  orderStatus: string;
  courierName?: string;
  trackingLink?: string;
  trackingEmbedSrc?: string;
  createdAt: string;
  shippingAddress?: {
    fullName?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
};

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [trackingNotice, setTrackingNotice] = useState(false);

  useEffect(() => {
    if (!params.id) return;

    api<{ order: Order }>(`/api/orders/${params.id}`, { token: token() })
      .then((data) => setOrder(data.order))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <main className="min-h-screen bg-[#fffdfa]">
      <Navbar />
      <div className="mx-auto min-h-[70vh] max-w-6xl px-5 py-14 md:px-10">
        <Link href="/account/orders" className="text-xs text-[#926b50]">
          Back to orders
        </Link>

        {loading && <p className="mt-8 text-sm text-[#806f63]">Loading order...</p>}
        {error && <p className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}

        {order && (
          <>
            <header className="mt-5 flex flex-wrap items-end justify-between gap-5 border-b border-[#eadfd4] pb-7">
              <div>
                <p className="text-[10px] font-bold tracking-[.28em] text-[#a47b60]">ORDER DETAILS</p>
                <h1 className="mt-3 font-serif text-4xl">Order #{order._id.slice(-8).toUpperCase()}</h1>
                <p className="mt-2 text-sm text-[#806f63]">
                  Placed on {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>
              <div className="rounded-2xl bg-[#f1e8df] px-5 py-4 text-sm capitalize text-[#66584e]">
                <p>Order: {order.orderStatus}</p>
                <p>Payment mode: Cash on delivery</p>
              </div>
            </header>

            <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
              <section className="rounded-3xl border border-[#eadfd4] bg-white p-6">
                <h2 className="font-serif text-2xl">Products</h2>
                <div className="mt-5 space-y-4">
                  {order.products.map((product, index) => (
                    <article key={product._id || `${product.name}-${index}`} className="flex gap-4 rounded-2xl bg-[#faf7f2] p-4">
                      <div className="relative h-20 w-16 overflow-hidden rounded-xl bg-white">
                        {product.image ? (
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        ) : (
                          <div className="grid h-full place-items-center text-xs text-[#967052]">No image</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-[#312820]">{product.name}</h3>
                        <p className="mt-1 text-sm text-[#806f63]">Quantity: {product.quantity}</p>
                        <p className="mt-1 text-sm text-[#806f63]">Price: Rs. {product.price.toLocaleString()}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <div className="space-y-5">
                <section className="rounded-3xl bg-[#f1e8df] p-6">
                  <h2 className="font-serif text-2xl">Delivery address</h2>
                  <div className="mt-4 text-sm leading-7 text-[#66584e]">
                    <p className="font-medium text-[#312820]">{order.shippingAddress?.fullName}</p>
                    <p>{order.shippingAddress?.phone}</p>
                    <p>{order.shippingAddress?.address}</p>
                    <p>
                      {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}
                    </p>
                  </div>
                </section>

                <section className="rounded-3xl border border-[#eadfd4] bg-white p-6">
                  <h2 className="font-serif text-2xl">Payment</h2>
                  <div className="mt-4 space-y-2 text-sm text-[#66584e]">
                    <Row label="Subtotal" value={`Rs. ${order.totalAmount.toLocaleString()}`} />
                    <Row label="Discount" value={`Rs. ${(order.discountAmount || 0).toLocaleString()}`} />
                    <Row label="Final amount" value={`Rs. ${(order.finalAmount || order.totalAmount).toLocaleString()}`} />
                    {order.couponCode && <Row label="Coupon" value={order.couponCode} />}
                    <Row label="Payment mode" value="Cash on delivery" />
                  </div>
                </section>
              </div>
            </div>

            <section className="mt-5 rounded-3xl border border-[#eadfd4] bg-white p-6">
              <h2 className="font-serif text-2xl">Tracking</h2>
              <TrackingTimeline status={order.orderStatus} />
              {order.courierName && <p className="mt-5 text-sm text-[#806f63]">Courier partner: <span className="font-medium text-[#342a22]">{order.courierName}</span></p>}
              {order.trackingLink ? (
                <a
                  href={order.trackingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#312820] px-5 py-3 text-sm text-white"
                >
                  Track now <span>→</span>
                </a>
              ) : (
                <><button type="button" onClick={() => setTrackingNotice(true)} className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#cbb8a8] px-5 py-3 text-sm text-[#624d3d]">Track now <span>→</span></button>{trackingNotice && <p className="mt-3 rounded-xl bg-[#f5eadf] p-3 text-sm text-[#705846]">Tracking will update when your order is shipped.</p>}</>
              )}
            </section>

            <section className="mt-5 rounded-3xl bg-[#314137] p-6 text-[#fffaf3]">
              <h2 className="font-serif text-2xl">Support</h2>
              <p className="mt-2 text-sm text-[#d4ddd0]">Need help with this order? Share your order ID with support.</p>
              <Link href={`/contact?orderId=${order._id}`} className="mt-5 inline-block text-sm font-semibold text-[#f0c99f]">
                Contact support
              </Link>
            </section>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}

function TrackingTimeline({ status }: { status: string }) {
  const steps = ["Ordered", "Shipped", "Delivered"];
  const active = status === "delivered" ? 2 : status === "shipped" ? 1 : 0;
  if (status === "cancelled") return <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">This order has been cancelled.</p>;
  return <div className="mt-8"><div className="relative mx-5 h-1 rounded-full bg-[#eadfd4]"><div className="h-full rounded-full bg-[#b88962] transition-all duration-700" style={{ width: `${active * 50}%` }} />{steps.map((step,index) => <div key={step} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${index * 50}%` }}><div className={`grid h-10 w-10 place-items-center rounded-full border-4 border-white text-sm shadow-sm ${index <= active ? "bg-[#b88962] text-white" : "bg-[#f4eee7] text-[#a09286]"}`}>{index === 1 ? "🚚" : index <= active ? "✓" : "○"}</div><p className={`mt-3 whitespace-nowrap text-center text-xs font-semibold ${index <= active ? "text-[#4f3b2d]" : "text-[#9a8b7e]"}`}>{step}</p></div>)}</div><p className="mt-12 text-center text-xs text-[#806f63]">{active === 0 ? "Your order is confirmed and will be updated once it ships." : active === 1 ? "Your order is on the way." : "Your order has been delivered."}</p></div>;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span>{label}</span>
      <span className="text-right font-medium text-[#312820]">{value}</span>
    </div>
  );
}
