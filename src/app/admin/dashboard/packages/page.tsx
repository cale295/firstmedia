"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X, Loader2, ListPlus } from "lucide-react";
import { usePackages } from "@/hooks/usePackages";
import { Database } from "@/types/database.types";

type PackageRow = Database["public"]["Tables"]["packages"]["Row"];

export default function AdminPackages() {
  const { packages, loading, error, fetchPackages, createPackage, updatePackage, deletePackage } = usePackages();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageRow | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [speed, setSpeed] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [active, setActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const openFormModal = (pkg?: PackageRow) => {
    if (pkg) {
      setEditingPackage(pkg);
      setName(pkg.name);
      setSpeed(pkg.speed);
      setPrice(pkg.price);
      setDescription(pkg.description || "");
      setFeatures(pkg.features?.length ? [...pkg.features] : [""]);
      setActive(pkg.active);
    } else {
      setEditingPackage(null);
      setName("");
      setSpeed("");
      setPrice("");
      setDescription("");
      setFeatures([""]);
      setActive(true);
    }
    setIsModalOpen(true);
  };

  const closeFormModal = () => {
    setIsModalOpen(false);
    setEditingPackage(null);
  };

  const updateFeature = (index: number, value: string) => {
    const newF = [...features];
    newF[index] = value;
    setFeatures(newF);
  };

  const addFeature = () => setFeatures([...features, ""]);
  
  const removeFeature = (index: number) => {
    if (features.length <= 1) return;
    const newF = features.filter((_, i) => i !== index);
    setFeatures(newF);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Clean empty features before saving
    const cleanedFeatures = features.map(f => f.trim()).filter(Boolean);

    try {
      if (editingPackage) {
        await updatePackage(editingPackage.id, { 
          name, speed, price, description, active, features: cleanedFeatures
        });
      } else {
        await createPackage({ 
          name, speed, price, description, active, features: cleanedFeatures 
        });
      }
      closeFormModal();
      fetchPackages();
    } catch (err) {
      console.error(err);
      alert("Failed to save internet package.");
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = (pkg: PackageRow) => {
    setEditingPackage(pkg);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!editingPackage) return;
    setSubmitting(true);
    try {
      await deletePackage(editingPackage.id);
      setIsDeleteModalOpen(false);
      setEditingPackage(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete package.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl">{error.message}</div>}

      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Internet Packages</h1>
          <p className="text-slate-500 text-sm mt-1">Manage broadband plans and pricing</p>
        </div>
        <button 
          onClick={() => openFormModal()}
          className="flex items-center gap-2 bg-brand-800 hover:bg-brand-900 text-white px-4 py-2 rounded-xl transition font-medium shadow-sm active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Package
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative min-h-[300px]">
        {loading && packages.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <Loader2 className="w-8 h-8 text-brand-800 animate-spin" />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Package Name</th>
                <th className="px-6 py-4 font-medium">Speed</th>
                <th className="px-6 py-4 font-medium">Price (Rp)</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {packages.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No packages found. Add a new plan to display here.
                  </td>
                </tr>
              )}
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-medium text-slate-900">{pkg.name}</td>
                  <td className="px-6 py-4 text-slate-600">{pkg.speed}</td>
                  <td className="px-6 py-4 text-slate-600 font-mono">{pkg.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 ${pkg.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${pkg.active ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                      {pkg.active ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => openFormModal(pkg)}
                        className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition" 
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => confirmDelete(pkg)}
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
                {editingPackage ? "Edit Package" : "Add New Package"}
              </h3>
              <button onClick={closeFormModal} className="text-slate-400 hover:text-slate-600 transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Package Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="e.g. Stream Package"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Speed</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="e.g. 50 Mbps"
                    value={speed}
                    onChange={(e) => setSpeed(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price (Rp)</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="e.g. 299.000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
                <textarea 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[80px]"
                  placeholder="Short marketing blurb..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-slate-700">Features</label>
                  <button 
                    type="button" 
                    onClick={addFeature}
                    className="text-xs flex items-center gap-1 text-brand-600 font-medium hover:text-brand-700 transition"
                  >
                    <ListPlus className="w-3.5 h-3.5" />
                    Add Feature
                  </button>
                </div>
                <div className="space-y-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                        placeholder={`Feature ${index + 1}...`}
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                      />
                      <button 
                        type="button"
                        onClick={() => removeFeature(index)}
                        disabled={features.length === 1}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
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
                disabled={submitting}
                className="px-5 py-2.5 text-sm font-medium text-white bg-brand-800 hover:bg-brand-900 rounded-xl transition flex items-center gap-2 disabled:opacity-70 active:scale-95"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingPackage ? "Save Changes" : "Create Package"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && editingPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2 text-red-600">
                <Trash2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Delete Package</h3>
              <p className="text-slate-500 text-sm">
                Are you sure you want to delete <strong className="text-slate-700">"{editingPackage.name}"</strong>? This action cannot be undone.
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
