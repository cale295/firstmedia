"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  address?: string;
}

export default function CoverageCheckerHeroForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: keyof FormData, value: string): string => {
    let error = "";
    const trimmedVal = value.trim();

    switch (name) {
      case "name":
        if (!trimmedVal) error = "Nama lengkap wajib diisi";
        break;
      case "email":
        if (!trimmedVal) {
          error = "Alamat email wajib diisi";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedVal)) {
          error = "Format email tidak valid";
        }
        break;
      case "phone":
        if (!trimmedVal) {
          error = "Nomor WhatsApp wajib diisi";
        } else {
          const digitsOnly = trimmedVal.replace(/\D/g, "");
          if (digitsOnly.length < 9) {
            error = "Nomor WhatsApp minimal 9 digit";
          }
        }
        break;
      case "city":
        if (!trimmedVal) error = "Kota / Area wajib diisi";
        break;
      case "address":
        if (!trimmedVal) error = "Alamat lengkap wajib diisi";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldError = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormData] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);

    const formattedMessage = `Halo Admin,

Saya ingin mengecek coverage internet.

Nama: ${formData.name.trim()}
Email: ${formData.email.trim()}
Nomor HP: ${formData.phone.trim()}
Kota: ${formData.city.trim()}
Alamat: ${formData.address.trim()}

Mohon diinformasikan apakah lokasi saya sudah tercover jaringan.`;

    const encodedMessage = encodeURIComponent(formattedMessage);
    const waUrl = `https://wa.me/62895329158096?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        address: "",
      });
      setErrors({});
    }, 1000);
  };

  const getBorderColorClass = (fieldName: keyof FormData) => {
    if (errors[fieldName]) {
      return "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100/50";
    }
    return "border-white/20 focus:border-brand-500 focus:ring-4 focus:ring-brand-100/50";
  };

  return (
    <article className="w-full bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
      {/* Subtle light reflections */}
      <div className="absolute -right-20 -top-20 w-48 h-48 bg-brand-100/30 rounded-full blur-3xl opacity-60 -z-10 pointer-events-none"></div>
      
      <div>
        <div className="text-center mb-6">
          <h3 className="text-2xl font-black text-slate-900 leading-tight">Cek Coverage Area</h3>
          <p className="text-slate-600 text-xs font-semibold mt-1">
            Isi data berikut dan kami akan menghubungi Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4.5" noValidate>
          {/* Nama Lengkap */}
          <div className="space-y-1">
            <label htmlFor="hero-name" className="block text-[11px] font-black uppercase tracking-wider text-slate-600">
              Nama Lengkap
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="hero-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Masukkan nama lengkap Anda"
                className={`w-full pl-10 pr-4 py-3 bg-white/50 border rounded-2xl text-slate-900 text-sm font-bold placeholder:text-slate-400 placeholder:font-medium transition-all duration-200 outline-none ${getBorderColorClass(
                  "name"
                )}`}
                aria-required="true"
                aria-invalid={!!errors.name}
                disabled={isSubmitting}
              />
            </div>
            {errors.name && (
              <p className="text-[11px] text-red-500 font-bold mt-1 pl-1" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="hero-email" className="block text-[11px] font-black uppercase tracking-wider text-slate-600">
              Alamat Email
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                id="hero-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="contoh@email.com"
                className={`w-full pl-10 pr-4 py-3 bg-white/50 border rounded-2xl text-slate-900 text-sm font-bold placeholder:text-slate-400 placeholder:font-medium transition-all duration-200 outline-none ${getBorderColorClass(
                  "email"
                )}`}
                aria-required="true"
                aria-invalid={!!errors.email}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-red-500 font-bold mt-1 pl-1" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Nomor WhatsApp */}
          <div className="space-y-1">
            <label htmlFor="hero-phone" className="block text-[11px] font-black uppercase tracking-wider text-slate-600">
              Nomor WhatsApp
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                id="hero-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Contoh: 0895329158096"
                className={`w-full pl-10 pr-4 py-3 bg-white/50 border rounded-2xl text-slate-900 text-sm font-bold placeholder:text-slate-400 placeholder:font-medium transition-all duration-200 outline-none ${getBorderColorClass(
                  "phone"
                )}`}
                aria-required="true"
                aria-invalid={!!errors.phone}
                disabled={isSubmitting}
              />
            </div>
            {errors.phone && (
              <p className="text-[11px] text-red-500 font-bold mt-1 pl-1" role="alert">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Kota / Area */}
          <div className="space-y-1">
            <label htmlFor="hero-city" className="block text-[11px] font-black uppercase tracking-wider text-slate-600">
              Kota / Area
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="hero-city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Masukkan Kota atau Area Anda"
                className={`w-full pl-10 pr-4 py-3 bg-white/50 border rounded-2xl text-slate-900 text-sm font-bold placeholder:text-slate-400 placeholder:font-medium transition-all duration-200 outline-none ${getBorderColorClass(
                  "city"
                )}`}
                aria-required="true"
                aria-invalid={!!errors.city}
                disabled={isSubmitting}
              />
            </div>
            {errors.city && (
              <p className="text-[11px] text-red-500 font-bold mt-1 pl-1" role="alert">
                {errors.city}
              </p>
            )}
          </div>

          {/* Alamat Lengkap */}
          <div className="space-y-1">
            <label htmlFor="hero-address" className="block text-[11px] font-black uppercase tracking-wider text-slate-600">
              Alamat Lengkap
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-4.5 text-slate-400 flex items-start justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <textarea
                id="hero-address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tuliskan nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, dan nama perumahan (jika ada)"
                className={`w-full pl-10 pr-4 py-3 bg-white/50 border rounded-2xl text-slate-900 text-sm font-bold placeholder:text-slate-400 placeholder:font-medium transition-all duration-200 outline-none resize-none min-h-[96px] ${getBorderColorClass(
                  "address"
                )}`}
                aria-required="true"
                aria-invalid={!!errors.address}
                disabled={isSubmitting}
              />
            </div>
            {errors.address && (
              <p className="text-[11px] text-red-500 font-bold mt-1 pl-1" role="alert">
                {errors.address}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full relative inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-brand-600/20 active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:bg-brand-500 disabled:cursor-not-allowed text-base tracking-wide overflow-hidden"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                  <span>Mengecek Coverage Area...</span>
                </>
              ) : (
                <span>Cek Coverage Sekarang</span>
              )}
            </button>

            {/* Quick response note */}
            <p className="text-[10px] text-slate-500 flex items-center justify-center gap-1.5 mt-3.5 font-bold uppercase tracking-wider">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Respon cepat via WhatsApp
            </p>
          </div>
        </form>
      </div>
    </article>
  );
}
