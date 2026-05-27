"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CheckCircle2, Phone } from "lucide-react";
import { Database } from "@/types/database.types";

type Area = Database["public"]["Tables"]["areas"]["Row"];

interface CoverageMapProps {
  areas: Area[];
}

// Center map on Jakarta/Jabodetabek roughly
const DEFAULT_CENTER: [number, number] = [-6.2088, 106.8456];
const DEFAULT_ZOOM = 10;

// Custom modern marker matching the brand
const createCustomIcon = (active: boolean) => {
  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div style="
        background-color: ${active ? '#f62d47' : '#94a3b8'};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        border: 2px solid white;
      ">
        <div style="
          width: 10px;
          height: 10px;
          background-color: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
  });
};

export default function CoverageMap({ areas }: CoverageMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Leaflet requires window to be defined, avoid hydration mismatch
    setMounted(true);

    // Fix default icon issues with Leaflet in React if needed
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center rounded-3xl">
        <p className="text-slate-400 font-medium">Memuat peta interaktif...</p>
      </div>
    );
  }

  const mapAreas = areas.filter(a => a.latitude !== null && a.longitude !== null);

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 z-10">
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={false}
        className="w-full h-full"
        zoomControl={false} // Disable default zoom control to move it
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // Cleaner, lighter map style
        />

        {/* Custom Zoom Control Position */}
        <ZoomControl position="bottomright" />

        {mapAreas.map((area) => (
          <Marker
            key={area.id}
            position={[area.latitude!, area.longitude!]}
            icon={createCustomIcon(area.active)}
          >
            <Popup className="custom-leaflet-popup">
              <div className="p-1 min-w-[200px]">
                <h4 className="font-bold text-slate-900 text-lg mb-1">{area.city}</h4>
                {area.active ? (
                  <div className="flex items-center gap-1.5 text-green-600 mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Tercover Jaringan</span>
                  </div>
                ) : (
                  <div className="text-slate-500 text-xs font-semibold mb-3">
                    Belum Tercover
                  </div>
                )}

                {area.description && (
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-2">
                    {area.description}
                  </p>
                )}

                <a
                  href={`https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20pasang%20internet%20di%20area%20${encodeURIComponent(area.city)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-accent-500 hover:bg-accent-600 text-white py-2.5 rounded-lg text-sm font-bold transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Cek Alamat via WA
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Global styles for popup customization to overwrite leaflet defaults */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .leaflet-popup-content-wrapper {
          border-radius: 1rem;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        }
        .leaflet-popup-content {
          margin: 12px;
        }
        .leaflet-container a.leaflet-popup-close-button {
          top: 12px;
          right: 12px;
          color: #94a3b8;
        }
        .leaflet-container a.leaflet-popup-close-button:hover {
          color: #0f172a;
        }
      `}} />
    </div>
  );
}
