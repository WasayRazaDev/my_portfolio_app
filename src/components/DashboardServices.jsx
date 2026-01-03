import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Save, X, Upload, Image as ImageIcon } from 'lucide-react';

const DashboardServices = ({ data }) => {
  const [services, setServices] = useState(data || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const openModal = (service = null) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingService(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 12-COLUMN HEADER GRID */}
      <div className="grid grid-cols-12 items-center bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-xl">
        <div className="col-span-12 md:col-span-8 mb-4 md:mb-0">
          <h3 className="text-xl font-bold text-white">My Services</h3>
          <p className="text-zinc-500 text-sm">Create and manage the service cards shown in your portfolio.</p>
        </div>
        <div className="col-span-12 md:col-span-4 flex md:justify-end">
          <button 
            onClick={() => openModal()}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#FD6F00] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#e56500] transition-all"
          >
            <Plus size={20} /> Add Service
          </button>
        </div>
      </div>

      {/* SERVICES DISPLAY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="group relative bg-zinc-900 border border-zinc-800 p-8 rounded-3xl hover:border-[#FD6F00]/50 transition-all duration-300">
            {/* Quick Actions */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => openModal(service)} className="p-2 bg-zinc-800 text-zinc-400 hover:text-[#FD6F00] rounded-lg transition-colors">
                <Pencil size={16} />
              </button>
              <button className="p-2 bg-zinc-800 text-zinc-400 hover:text-red-500 rounded-lg transition-colors">
                <Trash2 size={16} />
              </button>
            </div>

            {/* Icon Display */}
            <div className="w-16 h-16 bg-black border border-zinc-800 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
              {service.icon ? (
                <img src={service.icon} alt={service.title} className="w-10 h-10 object-contain" />
              ) : (
                <ImageIcon className="text-zinc-700" size={30} />
              )}
            </div>

            <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
            <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      {/* ADD/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-[2rem] p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white">
                {editingService ? 'Update Service' : 'New Service Offering'}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-zinc-800 rounded-full transition-colors"><X /></button>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Title Input */}
              <div className="md:col-span-12 space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Service Title</label>
                <input 
                  type="text" 
                  placeholder="e.g., UI/UX Design"
                  defaultValue={editingService?.title}
                  className="w-full bg-black border border-zinc-800 rounded-xl p-4 focus:border-[#FD6F00] outline-none transition-all"
                />
              </div>

              {/* Icon Upload Area */}
              <div className="md:col-span-12 space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Service Icon (SVG/PNG)</label>
                <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-[#FD6F00] transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500 group-hover:text-[#FD6F00] transition-colors">
                    <Upload size={24} />
                  </div>
                  <span className="text-sm text-zinc-400">Click to upload icon</span>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>
              
              {/* Description Area */}
              <div className="md:col-span-12 space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Description</label>
                <textarea 
                  rows="4"
                  placeholder="What does this service include?"
                  defaultValue={editingService?.description}
                  className="w-full bg-black border border-zinc-800 rounded-xl p-4 focus:border-[#FD6F00] outline-none resize-none transition-all"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="md:col-span-12 grid grid-cols-2 gap-4 mt-4">
                <button type="button" onClick={closeModal} className="py-4 bg-zinc-800 text-white rounded-xl font-bold hover:bg-zinc-700 transition-all">
                  Cancel
                </button>
                <button type="submit" className="py-4 bg-[#FD6F00] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#e56500] transition-all">
                  <Save size={20} /> {editingService ? 'Save Changes' : 'Publish Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardServices;