"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, Edit2, Trash2, X, Loader2, Image as ImageIcon, UploadCloud } from "lucide-react";
import { usePromos } from "@/hooks/usePromos";
import { storageService } from "@/services/storage.service";
import { Database } from "@/types/database.types";
import Image from "next/image";

type PromoRow = Database["public"]["Tables"]["promos"]["Row"];

export default function AdminPromos() {
  const { promos, loading, error, fetchPromos, createPromo, updatePromo, deletePromo } = usePromos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromoRow | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  
  // File Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPromos();
  }, [fetchPromos]);

  const openFormModal = (promo?: PromoRow) => {
    if (promo) {
      setEditingPromo(promo);
      setTitle(promo.title);
      setDescription(promo.description || "");
      setImageUrl(promo.image_url || "");
      setActive(promo.active);
    } else {
      setEditingPromo(null);
      setTitle("");
      setDescription("");
      setImageUrl("");
      setActive(true);
    }
    setIsModalOpen(true);
  };

  const closeFormModal = () => {
    setIsModalOpen(false);
    setEditingPromo(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const publicUrl = await storageService.uploadImage("promos", file);
      setImageUrl(publicUrl);
    } catch (err: any) {
      console.error(err);
      alert("Failed to upload image. Ensure the 'promos' storage bucket exists and allows public uploads.");
    } finally {
      setUploadingImage(false);
      // Reset input so the same file could be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      if (editingPromo) {
        await updatePromo(editingPromo.id, { 
          title, description, active, image_url: imageUrl || null
        });
      } else {
        await createPromo({ 
          title, description, active, image_url: imageUrl || null
        });
      }
      closeFormModal();
      fetchPromos();
    } catch (err) {
      console.error(err);
      alert("Failed to save promotion.");
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = (promo: PromoRow) => {
    setEditingPromo(promo);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!editingPromo) return;
    setSubmitting(true);
    try {
      if (editingPromo.image_url) {
        await storageService.deleteImageByUrl("promos", editingPromo.image_url);
      }
      await deletePromo(editingPromo.id);
      setIsDeleteModalOpen(false);
      setEditingPromo(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete promotion.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl">{error.message}</div>}

      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Promotions</h1>
          <p className="text-slate-500 text-sm mt-1">Manage marketing banners and deals</p>
        </div>
        <button 
          onClick={() => openFormModal()}
          className="flex items-center gap-2 bg-brand-800 hover:bg-brand-900 text-white px-4 py-2 rounded-xl transition font-medium shadow-sm active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Promo
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative min-h-[300px]">
        {loading && promos.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <Loader2 className="w-8 h-8 text-brand-800 animate-spin" />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium w-32">Image</th>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Created At</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {promos.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No active promotions found. Add a new banner to engage visitors.
                  </td>
                </tr>
              )}
              {promos.map((promo) => (
                <tr key={promo.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    {promo.image_url ? (
                      <div className="relative w-24 h-14 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                        <Image src={promo.image_url} alt={promo.title} fill className="object-cover" unoptimized/>
                      </div>
                    ) : (
                      <div className="w-24 h-14 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-slate-300" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">{promo.title}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(promo.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                     <span className={`px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 ${promo.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${promo.active ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                      {promo.active ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => openFormModal(promo)}
                        className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition" 
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => confirmDelete(promo)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" 
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Write/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
              <h3 className="text-lg font-bold text-slate-900">
                {editingPromo ? "Edit Promotion" : "Add New Promotion"}
              </h3>
              <button onClick={closeFormModal} className="text-slate-400 hover:text-slate-600 transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Banner Image</label>
                {!imageUrl ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-brand-500 hover:bg-brand-50 transition min-h-[160px]"
                  >
                    {uploadingImage ? (
                      <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
                    ) : (
                      <>
                        <div className="bg-white p-3 rounded-full shadow-sm border border-slate-100">
                          <UploadCloud className="w-6 h-6 text-brand-600" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-slate-700">Click to upload banner</p>
                          <p className="text-xs text-slate-500 mt-1">Recommended size: 1200x600 (Supports JPG, PNG, WEBP)</p>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="relative group overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                    <img src={imageUrl} alt="Preview" className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <button 
                        type="button"
                        onClick={() => setImageUrl("")}
                        className="bg-white/10 hover:bg-red-500/80 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition"
                      >
                        <Trash2 className="w-4 h-4" /> Remove Image
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Hidden File Input */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/png, image/jpeg, image/webp" 
                  onChange={handleImageUpload}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Promotion Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="e.g. Back To School Promo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
                <textarea 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[100px]"
                  placeholder="Short marketing text describing the promotion..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 mt-2">
                <input
                  type="checkbox"
                  id="active-toggle"
                  className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                />
                <label htmlFor="active-toggle" className="text-sm font-medium text-slate-700 select-none flex-1">
                  Active (Visible on public landing page)
                </label>
              </div>
            </form>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
              <button 
                type="button" 
                onClick={closeFormModal}
                className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={submitting || (uploadingImage)}
                className="px-5 py-2.5 text-sm font-medium text-white bg-brand-800 hover:bg-brand-900 rounded-xl transition flex items-center gap-2 disabled:opacity-70 active:scale-95"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingPromo ? "Save Changes" : "Create Promo"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && editingPromo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2 text-red-600">
                <Trash2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Delete Promo</h3>
              <p className="text-slate-500 text-sm">
                Are you sure you want to delete <strong className="text-slate-700">"{editingPromo.title}"</strong>? This action cannot be undone.
              </p>
            </div>
            
            <div className="p-6 pt-0 flex gap-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                disabled={submitting}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
