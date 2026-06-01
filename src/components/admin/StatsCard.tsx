import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  count: number | null;
  loading?: boolean;
  iconBgColor?: string;
  iconColor?: string;
}

export function StatsCard({
  icon: Icon,
  label,
  count,
  loading = false,
  iconBgColor = "bg-brand-50",
  iconColor = "text-brand-600",
}: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full flex flex-col justify-between min-h-[160px]">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 ${iconBgColor} rounded-2xl`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        </div>
        
        {loading ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-9 bg-slate-200 rounded-xl w-24"></div>
            <div className="h-4 bg-slate-100 rounded-md w-36"></div>
          </div>
        ) : (
          <div>
            <h3 className="text-4xl font-black text-slate-900 mb-1 leading-none">
              {count !== null ? count : 0}
            </h3>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wide mt-1.5">{label}</p>
          </div>
        )}
      </div>
    </div>
  );
}
