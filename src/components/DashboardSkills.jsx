import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Save, X, Upload, Award, BarChart3 } from 'lucide-react';

const DashboardSkills = ({ data }) => {
  const [skills, setSkills] = useState(data || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const openModal = (skill = null) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingSkill(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER: 12-Column Grid */}
      <div className="grid grid-cols-12 items-center bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-xl">
        <div className="col-span-12 md:col-span-8 mb-4 md:mb-0">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="text-[#FD6F00]" /> Technical Proficiency
          </h3>
          <p className="text-zinc-500 text-sm">Manage your tech stack and expertise levels.</p>
        </div>
        <div className="col-span-12 md:col-span-4 flex md:justify-end">
          <button 
            onClick={() => openModal()}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#FD6F00] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#e56500] transition-all"
          >
            <Plus size={20} /> Add Skill
          </button>
        </div>
      </div>

      {/* SKILLS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="group bg-zinc-900 border border-zinc-800 p-5 rounded-2xl hover:border-[#FD6F00] transition-all relative">
            <div className="flex items-center gap-4">
              {/* Skill Icon */}
              <div className="w-12 h-12 bg-black rounded-lg border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
                {skill.icon ? (
                  <img src={skill.icon} alt={skill.name} className="w-8 h-8 object-contain" />
                ) : (
                  <BarChart3 className="text-zinc-700" size={20} />
                )}
              </div>
              
              {/* Skill Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-bold truncate">{skill.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#FD6F00]" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">{skill.level}%</span>
                </div>
              </div>
            </div>

            {/* Hover Actions */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => openModal(skill)} className="p-1.5 text-zinc-500 hover:text-white"><Pencil size={14}/></button>
              <button className="p-1.5 text-zinc-500 hover:text-red-500"><Trash2 size={14}/></button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-[2rem] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-white">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              <button onClick={closeModal} className="text-zinc-500 hover:text-white"><X /></button>
            </div>

            <form className="space-y-6">
              {/* Skill Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Skill Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. React.js"
                  defaultValue={editingSkill?.name}
                  className="w-full bg-black border border-zinc-800 rounded-xl p-3 focus:border-[#FD6F00] outline-none"
                />
              </div>

              {/* Icon Upload */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Skill Icon</label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl py-4 hover:border-[#FD6F00] cursor-pointer group transition-all">
                  <Upload className="text-zinc-700 group-hover:text-[#FD6F00] mb-1" size={20} />
                  <span className="text-xs text-zinc-500">Upload SVG/PNG</span>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>

              {/* Proficiency Level */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Proficiency (%)</label>
                  <span className="text-[#FD6F00] font-mono text-sm">{editingSkill?.level || 50}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  defaultValue={editingSkill?.level || 50}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#FD6F00]" 
                />
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button type="button" onClick={closeModal} className="py-3 bg-zinc-800 text-white rounded-xl font-bold hover:bg-zinc-700">Cancel</button>
                <button type="submit" className="py-3 bg-[#FD6F00] text-white rounded-xl font-bold flex items-center justify-center gap-2">
                  <Save size={18} /> Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSkills;