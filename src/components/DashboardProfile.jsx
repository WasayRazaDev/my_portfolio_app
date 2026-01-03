import React from 'react';
import { Upload, FileText, Camera, Save, Mail, Phone } from 'lucide-react';

const DashboardProfile = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in duration-500">
      
      {/* LEFT COLUMN: Basic Info, Contacts & Stats (8 Cols) */}
      <div className="md:col-span-8 space-y-6">
        
        {/* Basic Info & Contact Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-6 text-[#FD6F00]">General Information</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Row 1: Name & Role */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">Full Name</label>
              <input type="text" defaultValue={data.name} className="w-full bg-black border border-zinc-800 rounded-xl p-3 focus:border-[#FD6F00] outline-none transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">Professional Role</label>
              <input type="text" defaultValue={data.role} className="w-full bg-black border border-zinc-800 rounded-xl p-3 focus:border-[#FD6F00] outline-none transition-colors" />
            </div>

            {/* Row 2: Email & Phone */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                <input type="email" defaultValue={data.email} placeholder="your@email.com" className="w-full bg-black border border-zinc-800 rounded-xl p-3 pl-10 focus:border-[#FD6F00] outline-none transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                <input type="tel" defaultValue={data.phone} placeholder="+1 234 567 890" className="w-full bg-black border border-zinc-800 rounded-xl p-3 pl-10 focus:border-[#FD6F00] outline-none transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Impact Stats Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-6 text-[#FD6F00]">Performance Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2 text-center md:text-left">
              <label className="text-xs font-bold text-zinc-500 uppercase">Experience (Yrs)</label>
              <input type="number" defaultValue={data.exp} className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-center focus:border-[#FD6F00] outline-none" />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <label className="text-xs font-bold text-zinc-500 uppercase">Total Projects</label>
              <input type="number" defaultValue={data.projects} className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-center focus:border-[#FD6F00] outline-none" />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <label className="text-xs font-bold text-zinc-500 uppercase">Happy Clients</label>
              <input type="number" defaultValue={data.clients} className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-center focus:border-[#FD6F00] outline-none" />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Media & Actions (4 Cols) */}
      <div className="md:col-span-4 space-y-6">
        {/* Photo Upload Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center">
          <h3 className="text-sm font-semibold mb-4 self-start text-zinc-400">Profile Photo</h3>
          <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-zinc-800 hover:border-[#FD6F00] transition-all">
            <img src={data.photo} alt="Avatar" className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="text-white" />
            </div>
          </div>
          <p className="text-[10px] text-zinc-600 mt-4 uppercase font-bold tracking-widest text-center">Transparent PNG Recommended</p>
        </div>

        {/* CV Upload Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-sm font-semibold mb-4 text-zinc-400">Documents</h3>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl py-6 px-4 hover:border-[#FD6F00] cursor-pointer group transition-all">
            <FileText className="text-zinc-700 group-hover:text-[#FD6F00] mb-2" size={24} />
            <span className="text-xs text-zinc-500 group-hover:text-zinc-300">Upload CV (PDF)</span>
            <input type="file" className="hidden" accept=".pdf" />
          </label>
        </div>

        {/* Global Save Button */}
        <button className="w-full py-4 bg-[#FD6F00] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(253,111,0,0.15)] hover:shadow-[0_15px_40px_rgba(253,111,0,0.25)] hover:-translate-y-1 transition-all active:scale-95">
          <Save size={18} />
          Save All Changes
        </button>
      </div>
    </div>
  );
};

export default DashboardProfile;