"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { Database } from "@/types/database.types";

type Area = Database["public"]["Tables"]["areas"]["Row"];

const CoverageMap = dynamic(() => import("./CoverageMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] bg-slate-100 animate-pulse flex items-center justify-center rounded-3xl border border-slate-200">
      <div className="flex flex-col items-center gap-3">
        <MapPin className="w-8 h-8 text-slate-300 animate-bounce" />
        <p className="text-slate-400 font-medium">Memuat peta area jangkauan...</p>
      </div>
    </div>
  ),
});

interface Props {
  areas: Area[];
}

export default function CoverageMapClient({ areas }: Props) {
  return <CoverageMap areas={areas} />;
}
