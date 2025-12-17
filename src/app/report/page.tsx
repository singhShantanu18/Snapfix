"use client";
import Link from "next/link";
import { Poppins } from "next/font/google";
import React, { useState } from "react";
import { Lightbulb, Navigation, Trash2 } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});
L.Marker.prototype.options.icon = DefaultIcon;


const ManholeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="12" cy="12" r="6" fill="currentColor" opacity="0.3" />
    <rect x="8" y="8" width="8" height="1" fill="currentColor" />
    <rect x="8" y="10" width="8" height="1" fill="currentColor" />
    <rect x="8" y="14" width="8" height="1" fill="currentColor" />
    <rect x="8" y="16" width="8" height="1" fill="currentColor" />
  </svg>
);


function LocationMarker({
  setLatitude,
  setLongitude,
}: {
  setLatitude: any;
  setLongitude: any;
}) {
  useMapEvents({
    click(e) {
      setLatitude(e.latlng.lat.toFixed(6));
      setLongitude(e.latlng.lng.toFixed(6));
    },
  });
  return null;
}

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

  // 🔎 Search by Pincode
  const handlePincodeSearch = async () => {
    if (!pincode) return;
    try {
      const response = await fetch(
       ` https://nominatim.openstreetmap.org/search?q=${pincode},India&format=json&limit=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        setLatitude(data[0].lat);
        setLongitude(data[0].lon);
      } else {
        alert("No location found for this pincode");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching location");
    }
  };


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <main>
      <div className="section1 min-h-[135vh] bg-[#FAFAF7] p-6 relative">
        {/* Navbar */}
        <nav
          className={`${poppins.className} relative z-30 bg-[#FAFAF7] flex items-center justify-between px-6 py-4`}
        >
          <img
            src="/Logo.png"
            alt="SnapFix Logo"
            className="h-12 sm:h-14 w-auto"
          />

          <div className="hidden md:flex gap-8 font-semibold text-lg">
            <Link href="/"><h4 className="cursor-pointer">Home</h4></Link>
            <Link href="/issues"><h4 className="cursor-pointer">Issues</h4></Link>
            <Link href="/report"><h4 className="cursor-pointer">Report</h4></Link>
          </div>

          <button className="border px-6 py-2 rounded-full font-semibold text-sm">
            Login
          </button>
        </nav>

        {/* Layout: Form + Map */}
        <div className="absolute flex h-[79vh] w-[190vh] top-[19vh] left-[13vh] gap-6">
          {/* White Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg w-[90vh] h-[107vh]">
            {/* Title */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-3 text-[1.4rem]">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#e8f9f0] border-2 border-[#b9e6c9] focus:outline-none focus:border-[#96caa8] transition-colors"
              />
            </div>

            {/* Issue Type */}
            <div className="mb-5">
              <div className="flex gap-4 flex-wrap">
                {issueTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedIssueType(type.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                      selectedIssueType === type.id
                        ? "bg-[#e8f9f0] text-[#6fbd8c] border-[#6fbd8c]"
                        : "bg-[#f1fcf6] text-[#88cfa2] hover:bg-[#bfeccd] border border-[#6fbd8c]"
                    }`}
                  >
                    <type.icon className="w-8 h-8" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Image */}
            <div className="mb-4">
              <label className="flex items-center gap-3 px-6 py-3 bg-[#cceeff] hover:bg-[#b3e0ff] text-[#4a6b89] rounded-2xl transition-colors font-medium cursor-pointer">
                <span className="text-lg">📷</span>
                {image ? image.name : "Upload image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {/* Pincode Input */}
            <div className="mb-6 flex gap-3">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 px-4 py-3 bg-[#e8f9f0] border-2 border-[#b9e6c9] focus:border-[#96caa8] rounded-2xl focus:outline-none"
                placeholder="Enter pincode"
              />
              <button
                onClick={handlePincodeSearch}
                className="px-6 py-3 bg-[#cceeff] hover:bg-[#b3e0ff] rounded-2xl text-[#4a6b89] font-medium  transition-colors"
              >
                Go
              </button>
            </div>

            {/* Latitude & Longitude */}
            <div className="mb-6 flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 mb-2 text-[1.3rem] font-semibold">
                  Latitude
                </label>
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-full px-4 py-3 bg-[#e8f9f0] border-2 border-[#b9e6c9] focus:border-[#96caa8] rounded-2xl focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 mb-2 text-[1.3rem] font-semibold">
                  Longitude
                </label>
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-full px-4 py-3 bg-[#e8f9f0] border-2 border-[#b9e6c9] focus:border-[#96caa8] rounded-2xl focus:outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button className="bg-gradient-to-r from-[#7ddcff] via-[#8de8d8] to-[#6edfbf] hover:from-[#5dc7f2] hover:via-[#73dec7] hover:to-[#58cfae] transition-all duration-300 text-white font-semibold py-3 px-6 rounded-2xl shadow-md w-full py-4">
              Submit
            </button>
          </div>

          {/* Map Div */}
          <div className="flex-1 rounded-3xl overflow-hidden shadow-lg h-[107vh]">
            <MapContainer
              center={[lat, lng]}
              zoom={13}
              key={`${lat}-${lng}`} // 🔑 re-render map when coords change
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={[lat, lng]}>
                <Popup>Issue Location</Popup>
              </Marker>
              <LocationMarker setLatitude={setLatitude} setLongitude={setLongitude} />
            </MapContainer>
          </div>
        </div>
      </div>
    </main>
  );
}