import Image from "next/image";
import { IMAGES } from "@/constants/images";
import { Play, Gamepad2, Laptop, Tv, Zap, Smartphone } from "lucide-react";

const features = [
  {
    id: "streaming",
    title: "Streaming Tanpa Buffering",
    alt: "Streaming film 4K Ultra HD tanpa buffering menggunakan internet fiber optic First Media",
    description: "Nikmati film dan series favorit dalam resolusi 4K Ultra HD tanpa jeda dengan koneksi fiber optic super stabil.",
    image: IMAGES.FEATURES.STREAMING,
    icon: Play,
    color: "from-red-500/80 to-red-900/90"
  },
  {
    id: "gaming",
    title: "Gaming Ping Stabil",
    alt: "Gaming online dengan ping stabil dan anti-lag menggunakan internet cepat First Media",
    description: "Dominasi setiap pertandingan esport dengan latency rendah dan koneksi anti-lag khusus untuk gamer sejati.",
    image: IMAGES.FEATURES.GAMING,
    icon: Gamepad2,
    color: "from-brand-500/80 to-brand-900/90"
  },
  {
    id: "wfh",
    title: "Internet Cepat untuk WFH",
    alt: "Bekerja dari rumah (WFH) lancar dengan koneksi internet fiber optic unlimited First Media",
    description: "Meeting online lancar, kirim file besar dalam hitungan detik. Produktivitas maksimal dari rumah.",
    image: IMAGES.FEATURES.WFH,
    icon: Laptop,
    color: "from-blue-500/80 to-blue-900/90"
  },
  {
    id: "fiber",
    title: "Fiber Optic Super Cepat",
    alt: "Infrastruktur fiber optic 100% First Media untuk kecepatan internet simetris upload dan download",
    description: "Didukung infrastruktur 100% Fiber Optic memastikan kecepatan simetris upload dan download tanpa batas kuota.",
    image: IMAGES.FEATURES.FIBER_OPTIC,
    icon: Zap,
    color: "from-emerald-500/80 to-emerald-900/90"
  },
  {
    id: "family",
    title: "TV & Entertainment",
    alt: "Menonton TV kabel 150 channel lebih dengan layanan First Media untuk keluarga",
    description: "Lebih dari 150+ channel TV lokal & internasional plus akses ke berbagai platform OTT untuk semua.",
    image: IMAGES.FEATURES.SMART_HOME,
    icon: Tv,
    color: "from-purple-500/80 to-purple-900/90"
  },
  {
    id: "devices",
    title: "Support Banyak Device",
    alt: "Internet rumah First Media mendukung banyak perangkat sekaligus tanpa lag di seluruh ruangan",
    description: "Koneksi stabil di seluruh ruangan rumah Anda meskipun digunakan oleh banyak perangkat secara bersamaan.",
    image: IMAGES.FEATURES.MULTIPLE_DEVICES,
    icon: Smartphone,
    color: "from-orange-500/80 to-orange-900/90"
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-slate-50 relative" aria-label="Keunggulan Layanan Internet First Media">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">

        {/* Section Header */}
        <header className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-3">Keunggulan Layanan</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-6">
            Satu Koneksi Untuk Segala Aktivitas Anda
          </h2>
          <p className="text-slate-600 text-lg font-medium leading-relaxed">
            Didesain khusus untuk memenuhi kebutuhan digital modern. Dari hiburan keluarga hingga produktivitas kerja, semuanya lebih lancar.
          </p>
        </header>

        {/* Feature Grid: updated to 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <article
              key={feature.id}
              className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 aspect-[4/5] sm:aspect-auto sm:h-[350px] cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={feature.image}
                alt={feature.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Gradient Overlay for readability */}
              <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 transform transition-transform duration-300 group-hover:-translate-y-2">
                <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                  <feature.icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-white font-black text-xl mb-3 leading-tight">{feature.title}</h3>
                <p className="text-white/80 text-sm font-medium leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
