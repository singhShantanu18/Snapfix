"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import React, { useState } from "react";
import { Lightbulb, Navigation, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";

// ✅ Dynamic import (SSR disabled)
const ReportMap = dynamic(() => import("@/components/ReportMap"), {
  ssr: false,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// ---------- Icons ----------
const ManholeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="6" fill="currentColor" opacity="0.3" />
    <rect x="8" y="8" width="8" height="1" fill="currentColor" />
    <rect x="8" y="10" width="8" height="1" fill="currentColor" />
    <rect x="8" y="14" width="8" height="1" fill="currentColor" />
    <rect x="8" y="16" width="8" height="1" fill="currentColor" />
  </svg>
);

export default function SnapFixReport() {
  const [selectedIssueType, setSelectedIssueType] = useState("");
  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState("28.6139");
  const [longitude, setLongitude] = useState("77.2090");
  const [pincode, setPincode] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const issueTypes = [
    { id: "streetlight", icon: Lightbulb, label: "Streetlight" },
    { id: "pothole", icon: Navigation, label: "Pothole" },
    { id: "waste", icon: Trash2, label: "Waste" },
    { id: "manhole", icon: ManholeIcon, label: "Manhole" },
  ];

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  // 🔍 Pincode search
  const handlePincodeSearch = async () => {
    if (!pincode) return;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${pincode},India&format=json&limit=1`
    );
    const data = await res.json();
    if (data.length > 0) {
      setLatitude(data[0].lat);
      setLongitude(data[0].lon);
    } else {
      alert("No location found");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <main>
      <div className="min-h-[135vh] bg-[#FAFAF7] p-6 relative">
        {/* Navbar */}
        <nav className={`${poppins.className} flex justify-between items-center px-6 py-4`}>
          <Image
            src="/Logo.png"
            alt="SnapFix Logo"
            width={300}
            height={100}
            className="h-12 sm:h-14 w-auto"
            priority
          />

          <div className="hidden md:flex gap-8 font-semibold text-lg">
            <Link href="/">Home</Link>
            <Link href="/issues">Issues</Link>
            <Link href="/report">Report</Link>
          </div>

          <button className="border px-6 py-2 rounded-full font-semibold text-sm">
            Login
          </button>
        </nav>

        {/* Layout */}
        <div className="absolute flex h-[79vh] w-[190vh] top-[19vh] left-[13vh] gap-6">
          {/* Form */}
          <div className="bg-white/80 rounded-3xl p-8 shadow-lg w-[90vh] h-[107vh]">
            <label className="block font-semibold mb-3">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#e8f9f0]"
            />

            {/* Issue Types */}
            <div className="flex gap-4 flex-wrap mt-5">
              {issueTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedIssueType(type.id)}
                  className={`p-4 rounded-2xl border ${
                    selectedIssueType === type.id ? "bg-[#e8f9f0]" : "bg-[#f1fcf6]"
                  }`}
                >
                  <type.icon className="w-8 h-8" />
                  <span>{type.label}</span>
                </button>
              ))}
            </div>

            {/* Upload */}
            <label className="block mt-5 cursor-pointer">
              📷 {image ? image.name : "Upload image"}
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </label>

            {/* Pincode */}
            <div className="flex gap-3 mt-5">
              <input
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter pincode"
                className="flex-1 px-4 py-3 rounded-2xl bg-[#e8f9f0]"
              />
              <button onClick={handlePincodeSearch} className="px-6 rounded-2xl bg-[#cceeff]">
                Go
              </button>
            </div>

            {/* Lat/Lng */}
            <div className="flex gap-4 mt-5">
              <input value={latitude} onChange={(e) => setLatitude(e.target.value)} />
              <input value={longitude} onChange={(e) => setLongitude(e.target.value)} />
            </div>

            <button className="mt-6 w-full py-4 bg-gradient-to-r from-[#7ddcff] to-[#6edfbf] rounded-2xl text-white">
              Submit
            </button>
          </div>

          {/* ✅ Map */}
          <div className="flex-1 rounded-3xl overflow-hidden shadow-lg h-[107vh]">
            <ReportMap
              lat={lat}
              lng={lng}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
