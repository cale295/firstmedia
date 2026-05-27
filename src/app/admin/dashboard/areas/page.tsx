"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, MapPinned, X, Loader2 } from "lucide-react";
import { useAreas } from "@/hooks/useAreas";
import { Database } from "@/types/database.types";

type AreaRow = Database["public"]["Tables"]["areas"]["Row"];

export default function AdminAreas() {
  const { areas, loading, error, fetchAreas, createArea, updateArea, deleteArea } = useAreas();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingArea, setEditingArea] = useState<AreaRow | null>(null);
  
  // Form State
  const [city, setCity] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [active, setActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAreas();
  }, [fetchAreas]);

  // Auto-generate slug when typing city for new areas
  useEffect(() => {
    if (!editingArea && city) {
      setSlug(city.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
    }
  }, [city, editingArea]);

  const openFormModal = (area?: AreaRow) => {
    if (area) {
      setEditingArea(area);
      setCity(area.city);
      setSlug(area.slug);
      setDescription(area.description || "");
      setLatitude(area.latitude ? area.latitude.toString() : "");
      setLongitude(area.longitude ? area.longitude.toString() : "");
      setActive(area.active);
    } else {
      setEditingArea(null);
      setCity("");
      setSlug("");
      setDescription("");
      setLatitude("");
      setLongitude("");
      setActive(true);
    }
    setIsModalOpen(true);
  };

  const closeFormModal = () => {
    setIsModalOpen(false);
    setEditingArea(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const latNum = latitude ? parseFloat(latitude) : null;
    const lngNum = longitude ? parseFloat(longitude) : null;

    try {
      if (editingArea) {
        await updateArea(editingArea.id, { 
          city, slug, description, active, 
          latitude: latNum, longitude: lngNum 
        });
      } else {
        await createArea({ 
          city, slug, description, active, 
          latitude: latNum, longitude: lngNum 
        });
      }
      closeFormModal();
      fetchAreas(); // Refresh
    } catch (err) {
      console.error(err);
      alert("Failed to save area.");
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = (area: AreaRow) => {
    setEditingArea(area);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!editingArea) return;
    setSubmitting(true);
    try {
      await deleteArea(editingArea.id);
      setIsDeleteModalOpen(false);
      setEditingArea(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete area.");
    } finally {
      setSubmitting(false);
    }
  };

  // Safe checks for map preview
  const previewLat = parseFloat(latitude);
  const previewLng = parseFloat(longitude);
  const showMapPreview = !isNaN(previewLat) && !isNaN(previewLng) && previewLat !== 0 && previewLng !== 0;

  return (
    <div className="space-y-6">
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl">{error.message}</div>}

      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Coverage Areas</h1>
          <p className="text-slate-500 text-sm mt-1">Manage locations where service is available</p>
        </div>
        <button 
          onClick={() => openFormModal()}
          className="flex items-center gap-2 bg-brand-800 hover:bg-brand-900 text-white px-4 py-2 rounded-xl transition font-medium shadow-sm active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Area
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative min-h-[300px]">
        {loading && areas.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <Loader2 className="w-8 h-8 text-brand-800 animate-spin" />
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Area Name</th>
                <th className="px-6 py-4 font-medium">Coordinates</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {areas.length === 0 && !loading && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No coverage areas found. Add a new one to get started.
                  </td>
                </tr>
              )}
              {areas.map((area) => (
                <tr key={area.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-50 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                        <MapPinned className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{area.city}</p>
                        <p className="text-xs text-slate-500">{area.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {area.latitude && area.longitude ? (
                      <div className="text-xs text-slate-600 font-mono bg-slate-100 px-2 py-1 rounded inline-block border border-slate-200">
                        {area.latitude}, {area.longitude}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">No coordinates</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 ${area.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${area.active ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                      {area.active ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => openFormModal(area)}
                        className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition" 
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => confirmDelete(area)}
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingArea ? "Edit Coverage Area" : "Add Coverage Area"}
              </h3>
              <button onClick={closeFormModal} className="text-slate-400 hover:text-slate-600 transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Column: Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">City / Region Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="E.g. Jakarta Selatan"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">URL Slug</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="jakarta-selatan"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Short Description (Optional)</label>
                    <textarea 
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[80px]"
                      placeholder="Brief description about coverage in this area"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <input
                      type="checkbox"
                      id="active-toggle"
                      className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500"
                      checked={active}
                      onChange={(e) => setActive(e.target.checked)}
                    />
                    <label htmlFor="active-toggle" className="text-sm font-medium text-slate-700 select-none">
                      Active (Visible on map & list)
                    </label>
                  </div>
                </div>

                {/* Right Column: Coordinates & Map */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Latitude</label>
                      <input 
                        type="number" 
                        step="any"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono text-sm"
                        placeholder="-6.2000"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Longitude</label>
                      <input 
                        type="number" 
                        step="any"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono text-sm"
                        placeholder="106.8166"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50 h-48 relative flex items-center justify-center">
                    {showMapPreview ? (
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${previewLng-0.05},${previewLat-0.05},${previewLng+0.05},${previewLat+0.05}&layer=mapnik&marker=${previewLat},${previewLng}`}
                        className="absolute inset-0"
                      ></iframe>
                    ) : (
                      <div className="text-center p-4">
                        <MapPinned className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-sm text-slate-400 font-medium">Enter valid coordinates<br/>to see map preview</p>
                      </div>
                    )}
                  </div>
                </div>

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
                {editingArea ? "Save Changes" : "Create Area"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && editingArea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2 text-red-600">
                <Trash2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Delete Area</h3>
              <p className="text-slate-500 text-sm">
                Are you sure you want to delete <strong className="text-slate-700">"{editingArea.city}"</strong>? This action cannot be undone.
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
