"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api, token } from "@/lib/api";

type Order = {
  _id: string;
  products: { name: string; image?: string; quantity: number }[];
  finalAmount?: number;
  totalAmount: number;
  paymentStatus: string;
  orderStatus: string;
  trackingLink?: string;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<{ orders: Order[] }>("/api/orders/my-orders", { token: token() })
      .then((data) => setOrders(data.orders))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#fffdfa]">
      <Navbar />
      <div className="mx-auto min-h-[70vh] max-w-5xl px-5 py-14 md:px-10">
        <Link href="/account" className="text-xs text-[#926b50]">
          Back to account
        </Link>
        <h1 className="mt-4 font-serif text-4xl">Your orders</h1>

        {loading && <p className="mt-8 text-sm text-[#806f63]">Loading your orders...</p>}
        {error && <p className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}

        {!loading && orders.length === 0 && !error ? (
          <p className="mt-8 text-sm text-[#806f63]">No orders placed yet.</p>
        ) : (
          <div className="mt-8 space-y-4">
            {orders.map((order) => (
              <Link
                href={`/account/orders/${order._id}`}
                key={order._id}
                className="block rounded-2xl border border-[#eadfd4] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <p className="font-medium">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="mt-1 text-xs text-[#806f63]">
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <p className="text-right text-sm capitalize">
                    {order.orderStatus}
                    <br />
                    <span className="text-[#806f63]">
                      {order.paymentStatus} | Rs. {(order.finalAmount || order.totalAmount).toLocaleString()}
                    </span>
                  </p>
                </div>
                <p className="mt-5 text-sm text-[#66584e]">
                  {order.products.map((product) => `${product.name} x ${product.quantity}`).join(", ")}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-[#926b50]">View order details</span>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
