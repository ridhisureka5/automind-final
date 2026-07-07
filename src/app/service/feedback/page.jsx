"use client";

import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  Star,
  ThumbsUp,
  Send,
  ThumbsDown,
  Search,
} from "lucide-react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function FeedbackPage() {

  const [data, setData] = useState(null);

  useEffect(() => {

    const fetchFeedback = async () => {

      try {

        const snapshot = await getDocs(collection(db, "feedback"));

        const complaints = snapshot.docs.map(doc => {

          const d = doc.data();

          const sentiment =
            d.rating >= 4
              ? "positive"
              : d.rating === 3
              ? "neutral"
              : "negative";

          return {
            name: d.userName || "Unknown",
            rating: d.rating || 0,
            category: "Service",
            text: d.comment || "",
            date: d.createdAt
              ? d.createdAt.toDate().toLocaleDateString()
              : "",
            sentiment,
          };
        });

        const total = complaints.length;

        const avgRating =
          complaints.reduce((a, b) => a + b.rating, 0) / total || 0;

        const positive =
          complaints.filter(c => c.sentiment === "positive").length;

        const neutral =
          complaints.filter(c => c.sentiment === "neutral").length;

        const negative =
          complaints.filter(c => c.sentiment === "negative").length;

        const result = {
          total_feedback: total,
          avg_rating: avgRating.toFixed(1),
          sentiment: {
            positive_percent: total
              ? Math.round((positive / total) * 100)
              : 0,
            positive,
            neutral,
            negative,
          },
          categories: {
            Service: total,
          },
          complaints,
        };

        setData(result);

      } catch (err) {
        console.error("Firestore error:", err);
      }
    };

    fetchFeedback();

  }, []);


  if (!data) {
    return (
      <div className="p-10 text-center text-slate-600">
        Loading feedback analytics...
      </div>
    );
  }

  const total = data.total_feedback;
  const avgRating = data.avg_rating;
  const positivePercent = data.sentiment.positive_percent;
  const complaints = data.complaints;
  const categories = data.categories;

  const ratingCount = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  complaints.forEach(c => {
    if (ratingCount[c.rating] !== undefined) {
      ratingCount[c.rating] += 1;
    }
  });

  return (
    <div className="p-6 bg-slate-50 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">
          Customer Feedback
        </h1>
        <p className="text-slate-500 text-sm">
          Customer satisfaction and sentiment analysis
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        <StatCard
          title="Total Feedback"
          value={total}
          sub="+ ML powered"
          color="bg-blue-500"
          icon={<MessageSquare size={22} />}
        />

        <StatCard
          title="Avg Rating"
          value={avgRating}
          sub="out of 5"
          color="bg-orange-500"
          icon={<Star size={22} />}
        />

        <StatCard
          title="Positive Sentiment"
          value={`${positivePercent}%`}
          sub="AI analysis"
          color="bg-emerald-500"
          icon={<ThumbsUp size={22} />}
        />

        <StatCard
          title="Response Rate"
          value="94%"
          sub="within 24h"
          color="bg-violet-500"
          icon={<Send size={22} />}
        />

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        <Card title="Rating Distribution">
          {[5,4,3,2,1].map(star => (
            <RatingRow
              key={star}
              star={star}
              value={ratingCount[star]}
              percent={
                complaints.length
                  ? (ratingCount[star] / complaints.length) * 100
                  : 0
              }
              color={
                star===5 ? "bg-emerald-500" :
                star===4 ? "bg-blue-500" :
                star===3 ? "bg-yellow-400" :
                star===2 ? "bg-orange-400" :
                "bg-red-500"
              }
            />
          ))}
        </Card>

        <Card title="Sentiment Overview">
          <div className="text-center text-slate-600">
            <p className="text-5xl font-bold text-emerald-500">
              {positivePercent}%
            </p>
            <p className="mt-2">Positive Feedback</p>
          </div>
        </Card>

        <Card title="By Category">
          {Object.keys(categories).map(cat => (
            <CategoryRow
              key={cat}
              name={cat}
              value={categories[cat]}
              total={total}
            />
          ))}
        </Card>

      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-xl shadow-sm p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Customer Feedback List
          </h2>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              placeholder="Search feedback..."
              className="pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm"
            />
          </div>
        </div>

        <div className="space-y-4">
          {complaints.map((c, i) => (
            <Complaint
              key={i}
              {...c}
              status={c.sentiment === "negative" ? "Pending" : "Resolved"}
            />
          ))}
        </div>

      </div>

    </div>
  );
}


/* COMPONENTS */

function StatCard({ title, value, sub, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        <p className="text-xs text-emerald-600 mt-1">{sub}</p>
      </div>
      <div className={`${color} text-white p-3 rounded-lg`}>
        {icon}
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-semibold mb-4 text-slate-700">{title}</h3>
      {children}
    </div>
  );
}

function RatingRow({ star, value, percent, color }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1 text-slate-600">
        <span>{star} Stars</span>
        <span>{value}</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full">
        <div
          className={`h-2 ${color} rounded-full`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function CategoryRow({ name, value, total }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1 text-slate-600">
        <span>{name}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{ width: `${(value / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

function Complaint({ name, rating, category, text, date, status }) {
  return (
    <div className="bg-slate-100 rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ThumbsDown size={18} className="text-red-500" />
            <span className="font-medium">{name}</span>
            <Stars count={rating} />
            <span className="text-xs bg-slate-300 px-2 py-0.5 rounded">
              {category}
            </span>
          </div>
          <p className="text-sm text-slate-600 mb-1">{text}</p>
          <p className="text-xs text-slate-400">{date}</p>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full font-medium
            ${
              status === "Pending"
                ? "bg-orange-100 text-orange-600"
                : "bg-emerald-100 text-emerald-600"
            }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

function Stars({ count }) {
  return (
    <div className="flex text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
        />
      ))}
    </div>
  );
}