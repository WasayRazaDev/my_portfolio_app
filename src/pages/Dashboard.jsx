


import React, { useState } from 'react';
import { User, Briefcase, Code, Folder, Mail, LogOut, Menu, X, Upload, FileText } from 'lucide-react';
import DashboardProfile from '../components/DashboardProfile';
import DashboardServices from '../components/DashboardServices';
import DashboardSkills from '../components/DashboardSkills';

const Dashboard = ({ portfolioData }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar logic remains the same as previous response */}
      <aside className={`fixed md:relative z-40 w-64 h-screen transition-transform duration-300 bg-zinc-900 border-r border-zinc-800 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 text-2xl font-bold text-[#FD6F00]">Admin<span className="text-white">Panel</span></div>
        <nav className="flex-1 px-4 space-y-2">
          {['profile', 'services', 'skills', 'projects', 'Social'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${activeTab === item ? 'bg-[#FD6F00] shadow-[0_0_20px_rgba(253,111,0,0.3)]' : 'text-zinc-400 hover:bg-zinc-800'}`}
            >
              <span className="capitalize">{item}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold capitalize">{activeTab} Management</h1>
          <p className="text-zinc-400">Manage your personal branding and statistics.</p>
        </header>



        {activeTab === 'profile' && <DashboardProfile data={portfolioData.profile} />}
        {activeTab === 'services' && <DashboardServices data={portfolioData.services} />}
        {activeTab === 'skills' && <DashboardSkills data={portfolioData.skills} />}
      </main>
    </div>
  );
};


export default Dashboard;