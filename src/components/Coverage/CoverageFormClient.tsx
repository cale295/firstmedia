"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin } from "lucide-react";

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

export default function CoverageFormClient() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field validation logic
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
          // Keep only digits to count length, but allow user input formatting
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

    // Clear error dynamically when user starts typing
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

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormData] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Find the first error and focus the element
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);

    // Format WhatsApp message
    const formattedMessage = `Halo, saya ingin cek coverage area XL SATU / First Media.

Nama: ${formData.name.trim()}
Email: ${formData.email.trim()}
No WhatsApp: ${formData.phone.trim()}
Kota: ${formData.city.trim()}
Alamat: ${formData.address.trim()}

Mohon info apakah area saya sudah tercover jaringan.`;

    const encodedMessage = encodeURIComponent(formattedMessage);
    const waUrl = `https://wa.me/62895329158096?text=${encodedMessage}`;

    // Simulate opening WhatsApp state transitions
    setTimeout(() => {
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setIsSubmitting(false);
      // Reset form after submission
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
    return "border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-100/50";
  };

  return (
    <article className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Background soft glow decoration */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-50 rounded-full blur-3xl opacity-60 -z-10 pointer-events-none"></div>

      <div>
        {/* Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 bg-brand-50 border border-brand-100 text-brand-700 text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Coverage Checker
          </div>
        </div>

        <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2">Cek Coverage Area</h3>
        <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
          Lengkapi formulir di bawah ini untuk memeriksa ketersediaan jaringan fiber optic First Media di lokasi Anda.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Nama Lengkap */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-xs font-black uppercase tracking-wider text-slate-500">
              Nama Lengkap
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Masukkan nama lengkap Anda"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-900 text-sm font-bold placeholder:text-slate-400 placeholder:font-medium transition-all duration-200 outline-none ${getBorderColorClass(
                  "name"
                )}`}
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                disabled={isSubmitting}
              />
            </div>
            {errors.name && (
              <p id="name-error" className="text-xs text-red-500 font-bold mt-1 pl-1" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-black uppercase tracking-wider text-slate-500">
              Alamat Email
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="contoh@email.com"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-900 text-sm font-bold placeholder:text-slate-400 placeholder:font-medium transition-all duration-200 outline-none ${getBorderColorClass(
                  "email"
                )}`}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p id="email-error" className="text-xs text-red-500 font-bold mt-1 pl-1" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Nomor WhatsApp */}
          <div className="space-y-1.5">
            <label htmlFor="phone" className="block text-xs font-black uppercase tracking-wider text-slate-500">
              Nomor WhatsApp
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Contoh: 0895329158096"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-900 text-sm font-bold placeholder:text-slate-400 placeholder:font-medium transition-all duration-200 outline-none ${getBorderColorClass(
                  "phone"
                )}`}
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                disabled={isSubmitting}
              />
            </div>
            {errors.phone && (
              <p id="phone-error" className="text-xs text-red-500 font-bold mt-1 pl-1" role="alert">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Kota / Area */}
          <div className="space-y-1.5">
            <label htmlFor="city" className="block text-xs font-black uppercase tracking-wider text-slate-500">
              Kota / Area
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Masukkan Kota atau Area Anda"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-900 text-sm font-bold placeholder:text-slate-400 placeholder:font-medium transition-all duration-200 outline-none ${getBorderColorClass(
                  "city"
                )}`}
                aria-required="true"
                aria-invalid={!!errors.city}
                aria-describedby={errors.city ? "city-error" : undefined}
                disabled={isSubmitting}
              />
            </div>
            {errors.city && (
              <p id="city-error" className="text-xs text-red-500 font-bold mt-1 pl-1" role="alert">
                {errors.city}
              </p>
            )}
          </div>

          {/* Alamat Lengkap */}
          <div className="space-y-1.5">
            <label htmlFor="address" className="block text-xs font-black uppercase tracking-wider text-slate-500">
              Alamat Lengkap
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-4 text-slate-400 flex items-start justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tuliskan nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, dan nama perumahan (jika ada)"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-900 text-sm font-bold placeholder:text-slate-400 placeholder:font-medium transition-all duration-200 outline-none resize-none min-h-[96px] ${getBorderColorClass(
                  "address"
                )}`}
                aria-required="true"
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? "address-error" : undefined}
                disabled={isSubmitting}
              />
            </div>
            {errors.address && (
              <p id="address-error" className="text-xs text-red-500 font-bold mt-1 pl-1" role="alert">
                {errors.address}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full relative inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-black py-4 px-6 rounded-2xl shadow-lg shadow-accent-500/20 active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:bg-accent-400 disabled:cursor-not-allowed text-base tracking-wide overflow-hidden"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Membuka WhatsApp...</span>
                </>
              ) : (
                <span>Cek Coverage Sekarang</span>
              )}
            </button>

            {/* Trust badge */}
            <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5 mt-4 font-bold">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Respon cepat via WhatsApp
            </p>
          </div>
        </form>
      </div>
    </article>
  );
}
