"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Search,
  Plus,
  Truck,
  Brain,
  Package,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";

export default function Inventory() {
  /* ---------------- DATA ---------------- */

  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const API_URL = `${process.env.NEXT_PUBLIC_API || "https://automind-backend-40d5.onrender.com"}/inventory-analytics`;


  /* ---------------- MODALS ---------------- */

  const [showAdd, setShowAdd] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  /* ---------------- ADD FORM ---------------- */

  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    stock: "",
    max: "",
    price: "",
  });

  /* ---------------- FETCH ML DATA ---------------- */

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.inventory.map(
          (item, index) => {
            const [stock, max] = item.stock
              .split("/")
              .map(Number);

            return {
              id: index + 1,
              name: item.name,
              sku: item.sku,
              category: item.category,
              stock,
              max,
              demand: parseFloat(
                item.ai_demand.replace("/week", "")
              ),
              price: item.price,
            };
          }
        );

        setItems(formatted);
      });
  }, []);

  /* ---------------- HELPERS ---------------- */

  const getStatus = (item) => {
    const percent = (item.stock / item.max) * 100;

    if (percent <= 15) return "critical";
    if (percent <= 40) return "low";
    return "in";
  };

  /* ---------------- REORDER ---------------- */

  const handleReorder = (item) => {
    const qty = Math.floor(item.max / 2);

    // Update stock
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id
          ? { ...i, stock: i.stock + qty }
          : i
      )
    );

    // Add to orders
    setOrders((prev) => [
      {
        id: Date.now(),
        name: item.name,
        sku: item.sku,
        quantity: qty,
        date: new Date().toLocaleString(),
        status: "Ordered",
      },
      ...prev,
    ]);
  };

  /* ---------------- ADD ITEM ---------------- */

  const handleAddItem = () => {
    if (!form.name) return;

    const newItem = {
      id: Date.now(),
      name: form.name,
      sku: form.sku,
      category: form.category,
      stock: Number(form.stock),
      max: Number(form.max),
      demand: 5,
      price: Number(form.price),
    };

    setItems((prev) => [...prev, newItem]);

    setForm({
      name: "",
      sku: "",
      category: "",
      stock: "",
      max: "",
      price: "",
    });

    setShowAdd(false);
  };

  /* ---------------- FILTER + SORT ---------------- */

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("none");

  const filteredItems = useMemo(() => {
    let data = [...items];

    if (search) {
      data = data.filter(
        (i) =>
          i.name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          i.sku
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (filter !== "all") {
      data = data.filter(
        (i) => getStatus(i) === filter
      );
    }

    if (sort === "name") {
      data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sort === "stock") {
      data.sort((a, b) => b.stock - a.stock);
    }

    if (sort === "price") {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [items, search, filter, sort]);

  /* ---------------- STATS ---------------- */

  const totalValue = items.reduce(
    (sum, i) => sum + i.stock * i.price,
    0
  );

  const lowStockCount = items.filter(
    (i) => getStatus(i) !== "in"
  ).length;

  const efficiency = Math.round(
    (items.filter((i) => getStatus(i) === "in")
      .length /
      items.length) *
      100
  );

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Parts Inventory
          </h1>
          <p className="text-gray-500">
            AI-powered inventory management
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowOrders(true)}
            className="btn-secondary"
          >
            <Truck size={18} /> Order Parts
          </button>

          <button
            onClick={() => setShowAdd(true)}
            className="btn-primary"
          >
            <Plus size={18} /> Add Item
          </button>
        </div>
      </div>

      {/* DASHBOARD */}

      <div className="grid md:grid-cols-4 gap-5 mb-8">
        <StatCard
          icon={<Package />}
          title="Product Types"
          value={items.length}
          color="blue"
        />

        <StatCard
          icon={<AlertCircle />}
          title="Low Stock"
          value={lowStockCount}
          color="red"
        />

        <StatCard
          icon={<CheckCircle />}
          title="Total Value"
          value={`$${totalValue.toFixed(0)}`}
          color="green"
        />

        <StatCard
          icon={<Brain />}
          title="Efficiency"
          value={`${efficiency}%`}
          color="purple"
        />
      </div>

      {/* SEARCH */}

      <div className="flex flex-wrap gap-4 mb-5">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="input flex-1"
        />
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              {[
                "Product",
                "SKU",
                "Category",
                "Stock",
                "AI Demand",
                "Price",
                "Status",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((item) => {
              const status = getStatus(item);

              return (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-3">
                    {item.name}
                  </td>

                  <td className="px-4 py-3">
                    {item.sku}
                  </td>

                  <td className="px-4 py-3">
                    {item.category}
                  </td>

                  <td className="px-4 py-3">
                    {item.stock}/{item.max}
                  </td>

                  <td className="px-4 py-3 text-purple-600">
                    {item.demand}/week
                  </td>

                  <td className="px-4 py-3">
                    ${item.price}
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge
                      status={status}
                    />
                  </td>

                  <td className="px-4 py-3">
                    {status !== "in" && (
                      <button
                        onClick={() =>
                          handleReorder(item)
                        }
                        className="btn-primary-sm"
                      >
                        Reorder
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ADD MODAL */}

      {showAdd && (
        <Modal
          title="Add New Item"
          onClose={() => setShowAdd(false)}
        >
          {[
            "name",
            "sku",
            "category",
            "stock",
            "max",
            "price",
          ].map((f) => (
            <input
              key={f}
              placeholder={f}
              value={form[f]}
              onChange={(e) =>
                setForm({
                  ...form,
                  [f]: e.target.value,
                })
              }
              className="input w-full mb-3"
            />
          ))}

          <button
            onClick={handleAddItem}
            className="btn-primary w-full"
          >
            Add Item
          </button>
        </Modal>
      )}

      {/* ORDERS MODAL */}

      {showOrders && (
        <Modal
          title="Ordered Parts"
          onClose={() => setShowOrders(false)}
        >
          {orders.length === 0 && (
            <p className="text-gray-500 text-center">
              No orders yet
            </p>
          )}

          {orders.map((o) => (
            <div
              key={o.id}
              className="border p-3 rounded mb-2"
            >
              <p className="font-medium">
                {o.name}
              </p>

              <p className="text-sm text-gray-500">
                Qty: {o.quantity} | {o.date}
              </p>

              <p className="text-green-600 text-sm">
                {o.status}
              </p>
            </div>
          ))}
        </Modal>
      )}
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px] relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-bold mb-4">
          {title}
        </h2>

        {children}
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">
          {title}
        </p>
        <h2 className="text-2xl font-bold">
          {value}
        </h2>
      </div>

      <div
        className={`p-3 rounded-lg bg-${color}-100 text-${color}-600`}
      >
        {icon}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    in: "bg-green-100 text-green-700",
    low: "bg-yellow-100 text-yellow-700",
    critical: "bg-red-100 text-red-700",
  };

  const labels = {
    in: "In Stock",
    low: "Low Stock",
    critical: "Critical",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
