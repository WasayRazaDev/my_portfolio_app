import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePortfolio } from '../contexts/PortfolioContext'
import { useAuth } from '../contexts/AuthContext'

const Dashboard = () => {
  const navigate = useNavigate()
  const { portfolioData, updatePortfolio } = usePortfolio()
  const { logout } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    profile: {
      name: '',
      role: '',
      about_description: '',
      cv_url: '',
      photo_url: '',
      stats: { exp: '', projects: '', clients: '' },
      socials: { github: '', linkedin: '', instagram: '', facebook: '' }
    },
    services: [],
    about: {
      description: '',
      skills: []
    },
    projects: [],
    contact: {
      email: '',
      phone: ''
    }
  })

  // Initialize form data when portfolioData loads
  useEffect(() => {
    if (portfolioData) {
      console.log('Portfolio data loaded in dashboard:', portfolioData);
      
      // Transform frontend data to backend format
      setFormData({
        profile: {
          name: portfolioData.profile?.name || '',
          role: portfolioData.profile?.role || '',
          about_description: portfolioData.about?.description || '',
          cv_url: portfolioData.profile?.cv || '',
          photo_url: portfolioData.profile?.photo || '',
          stats: portfolioData.profile?.stats || { exp: '', projects: '', clients: '' },
          socials: portfolioData.profile?.socials || { 
            github: '', linkedin: '', instagram: '', facebook: '' 
          }
        },
        services: portfolioData.services?.map(service => ({
          title: service.title,
          icon: service.icon,
          description: service.desc
        })) || [],
        about: {
          description: portfolioData.about?.description || '',
          skills: portfolioData.about?.skills?.map(skill => ({
            name: skill.name,
            level: skill.level,
            icon: skill.icon,
            category: 'technical'
          })) || []
        },
        projects: portfolioData.projects?.map(project => ({
          id: project.id,
          title: project.title,
          category: project.category,
          image_url: project.img,
          github_url: project.github,
          gallery: project.gallery || [],
          is_published: true
        })) || [],
        contact: {
          email: portfolioData.contact?.email || '',
          phone: portfolioData.contact?.phone || ''
        }
      })
    }
  }, [portfolioData])

const handleSave = async () => {
  setLoading(true);
  setMessage('');
  
  try {
    let updateData = {};
    
    // Prepare data based on active tab
    switch(activeTab) {
      case 'profile':
        updateData = {
          profile: {
            name: formData.profile.name,
            role: formData.profile.role,
            cv: formData.profile.cv_url,
            photo: formData.profile.photo_url,
            stats: formData.profile.stats,
            socials: formData.profile.socials
          },
          about: {
            description: formData.profile.about_description,
            skills: formData.about.skills
          }
        };
        break;
      case 'services':
        updateData = { services: formData.services };
        break;
      case 'projects':
        updateData = { projects: formData.projects };
        break;
      case 'skills':
        updateData = { 
          about: {
            description: formData.about.description,
            skills: formData.about.skills
          }
        };
        break;
      case 'contact':
        updateData = { contact: formData.contact };
        break;
    }
    
    console.log('Saving to Supabase:', updateData);
    const result = await updatePortfolio(updateData);
    
    if (result.success) {
      setMessage('✅ Changes saved successfully! Refreshing portfolio...');
      
      // Force refresh of portfolio data
      if (refreshPortfolio) {
        await refreshPortfolio();
      }
      
      // Show success message for 3 seconds
      setTimeout(() => {
        setMessage('');
        // Optional: Open portfolio in new tab to see changes
        window.open('/', '_blank');
      }, 2000);
    } else {
      setMessage(`❌ Error: ${result.error}`);
    }
  } catch (error) {
    setMessage('❌ An error occurred while saving');
    console.error('Save error:', error);
  } finally {
    setLoading(false);
    setTimeout(() => setMessage(''), 5000);
  }
};

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleSocialChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        socials: {
          ...prev.profile.socials,
          [platform]: value
        }
      }
    }))
  }

  const handleStatChange = (stat, value) => {
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        stats: {
          ...prev.profile.stats,
          [stat]: value
        }
      }
    }))
  }

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...formData.about.skills]
    newSkills[index] = { ...newSkills[index], [field]: value }
    setFormData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        skills: newSkills
      }
    }))
  }

  const handleServiceChange = (index, field, value) => {
    const newServices = [...formData.services]
    newServices[index] = { ...newServices[index], [field]: value }
    setFormData(prev => ({ ...prev, services: newServices }))
  }

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...formData.projects]
    newProjects[index] = { ...newProjects[index], [field]: value }
    setFormData(prev => ({ ...prev, projects: newProjects }))
  }

  const addNewSkill = () => {
    setFormData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        skills: [...prev.about.skills, { name: '', level: 50, icon: '', category: 'technical' }]
      }
    }))
  }

  const addNewService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { title: '', icon: '📱', description: '' }]
    }))
  }

  const addNewProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { 
        title: '', 
        category: '', 
        image_url: '', 
        github_url: '', 
        gallery: [], 
        is_published: true 
      }]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Portfolio Dashboard</h1>
              <p className="text-gray-400 text-sm">Manage your portfolio content</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-gradient-to-r from-[#FD6F00] to-[#E46400] hover:opacity-90 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                View Portfolio
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Message Alert */}
      {message && (
        <div className={`container mx-auto px-4 py-3 mt-4 rounded-lg ${message.includes('✅') ? 'bg-green-500/20 border border-green-500 text-green-300' : 'bg-red-500/20 border border-red-500 text-red-300'}`}>
          {message}
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-400">{formData.projects.length}</div>
            <div className="text-gray-400 mt-2">Projects</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400">{formData.services.length}</div>
            <div className="text-gray-400 mt-2">Services</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400">{formData.about.skills.length}</div>
            <div className="text-gray-400 mt-2">Skills</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400">
              {Object.values(formData.profile.stats).filter(val => val).length}
            </div>
            <div className="text-gray-400 mt-2">Stats Configured</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-8 overflow-x-auto">
          {['profile', 'services', 'projects', 'skills', 'contact'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium capitalize whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-[#FD6F00] text-[#FD6F00]' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800 rounded-xl p-6">
          {loading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mx-auto"></div>
              <p className="mt-2">Saving changes...</p>
            </div>
          )}

          {/* Profile Editor */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div>
                  <label className="block text-gray-400 mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.profile.name}
                    onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD6F00]"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Role *</label>
                  <input
                    type="text"
                    value={formData.profile.role}
                    onChange={(e) => handleInputChange('profile', 'role', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD6F00]"
                    placeholder="Web Developer"
                  />
                </div>
                
                {/* About Description */}
                <div className="md:col-span-2">
                  <label className="block text-gray-400 mb-2">About Description *</label>
                  <textarea
                    value={formData.profile.about_description}
                    onChange={(e) => handleInputChange('profile', 'about_description', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-[#FD6F00]"
                    placeholder="Tell people about yourself..."
                  />
                </div>
                
                {/* Stats Section */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-bold mb-3 border-b border-gray-700 pb-2">Stats</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-2">Experience</label>
                      <input
                        type="text"
                        value={formData.profile.stats.exp}
                        onChange={(e) => handleStatChange('exp', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                        placeholder="2+ years"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Projects</label>
                      <input
                        type="text"
                        value={formData.profile.stats.projects}
                        onChange={(e) => handleStatChange('projects', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                        placeholder="50+"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Clients</label>
                      <input
                        type="text"
                        value={formData.profile.stats.clients}
                        onChange={(e) => handleStatChange('clients', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                        placeholder="30+"
                      />
                    </div>
                  </div>
                </div>

                {/* Social Links Section */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-bold mb-3 border-b border-gray-700 pb-2">Social Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-2">GitHub</label>
                      <input
                        type="url"
                        value={formData.profile.socials.github}
                        onChange={(e) => handleSocialChange('github', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                        placeholder="https://github.com/username"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">LinkedIn</label>
                      <input
                        type="url"
                        value={formData.profile.socials.linkedin}
                        onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Instagram</label>
                      <input
                        type="url"
                        value={formData.profile.socials.instagram}
                        onChange={(e) => handleSocialChange('instagram', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                        placeholder="https://instagram.com/username"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Facebook</label>
                      <input
                        type="url"
                        value={formData.profile.socials.facebook}
                        onChange={(e) => handleSocialChange('facebook', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                        placeholder="https://facebook.com/username"
                      />
                    </div>
                  </div>
                </div>

                {/* CV and Photo URLs */}
                <div>
                  <label className="block text-gray-400 mb-2">CV/Resume URL</label>
                  <input
                    type="url"
                    value={formData.profile.cv_url}
                    onChange={(e) => handleInputChange('profile', 'cv_url', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                    placeholder="https://your-cv-link.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Profile Photo URL</label>
                  <input
                    type="url"
                    value={formData.profile.photo_url}
                    onChange={(e) => handleInputChange('profile', 'photo_url', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                    placeholder="https://your-photo-url.com"
                  />
                </div>
              </div>
              
              <button
                onClick={handleSave}
                disabled={loading}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-[#FD6F00] to-[#E46400] hover:opacity-90 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold"
              >
                {loading ? 'Saving...' : '💾 Save Profile Changes'}
              </button>
            </div>
          )}

          {/* Services Editor */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Services</h2>
                <button 
                  onClick={addNewService}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Service
                </button>
              </div>
              
              <div className="space-y-4">
                {formData.services.map((service, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-400 mb-2">Title *</label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                          className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-2"
                          placeholder="Service Title"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Icon</label>
                        <input
                          type="text"
                          value={service.icon}
                          onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                          className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-2"
                          placeholder="📱"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-gray-400 mb-2">Description *</label>
                        <textarea
                          value={service.description}
                          onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                          className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-2"
                          placeholder="Describe your service..."
                          rows="2"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const newServices = formData.services.filter((_, i) => i !== index)
                        setFormData(prev => ({ ...prev, services: newServices }))
                      }}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                    >
                      Remove Service
                    </button>
                  </div>
                ))}
              </div>
              
              <button
                onClick={handleSave}
                disabled={loading}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-[#FD6F00] to-[#E46400] hover:opacity-90 rounded-lg transition-colors font-bold"
              >
                💾 Save Services
              </button>
            </div>
          )}

          {/* Projects Editor */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Projects</h2>
                <button 
                  onClick={addNewProject}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Project
                </button>
              </div>
              
              <div className="space-y-4">
                {formData.projects.map((project, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-400 mb-2">Title *</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                          className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-2"
                          placeholder="Project Title"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Category *</label>
                        <input
                          type="text"
                          value={project.category}
                          onChange={(e) => handleProjectChange(index, 'category', e.target.value)}
                          className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-2"
                          placeholder="Web Development"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-400 mb-2">Image URL *</label>
                        <input
                          type="url"
                          value={project.image_url}
                          onChange={(e) => handleProjectChange(index, 'image_url', e.target.value)}
                          className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-2"
                          placeholder="https://image-url.com/project.jpg"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-400 mb-2">GitHub URL</label>
                        <input
                          type="url"
                          value={project.github_url}
                          onChange={(e) => handleProjectChange(index, 'github_url', e.target.value)}
                          className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-2"
                          placeholder="https://github.com/username/project"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={project.is_published}
                          onChange={(e) => handleProjectChange(index, 'is_published', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-gray-300">Published</span>
                      </label>
                      <button
                        onClick={() => {
                          const newProjects = formData.projects.filter((_, i) => i !== index)
                          setFormData(prev => ({ ...prev, projects: newProjects }))
                        }}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                      >
                        Remove Project
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={handleSave}
                disabled={loading}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-[#FD6F00] to-[#E46400] hover:opacity-90 rounded-lg transition-colors font-bold"
              >
                💾 Save Projects
              </button>
            </div>
          )}

          {/* Skills Editor */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Skills</h2>
                <button 
                  onClick={addNewSkill}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Skill
                </button>
              </div>
              
              <div className="space-y-4">
                {formData.about.skills.map((skill, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-400 mb-2">Skill Name *</label>
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                          className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-2"
                          placeholder="Figma"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Icon</label>
                        <input
                          type="text"
                          value={skill.icon}
                          onChange={(e) => handleSkillChange(index, 'icon', e.target.value)}
                          className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-2"
                          placeholder="F"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Level (0-100) *</label>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={skill.level}
                            onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value))}
                            className="flex-1"
                          />
                          <span className="w-12 text-center font-bold">{skill.level}%</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const newSkills = formData.about.skills.filter((_, i) => i !== index)
                        setFormData(prev => ({
                          ...prev,
                          about: {
                            ...prev.about,
                            skills: newSkills
                          }
                        }))
                      }}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                    >
                      Remove Skill
                    </button>
                  </div>
                ))}
              </div>
              
              <button
                onClick={handleSave}
                disabled={loading}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-[#FD6F00] to-[#E46400] hover:opacity-90 rounded-lg transition-colors font-bold"
              >
                💾 Save Skills
              </button>
            </div>
          )}

          {/* Contact Editor */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      contact: { ...prev.contact, email: e.target.value }
                    }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD6F00]"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.contact.phone}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      contact: { ...prev.contact, phone: e.target.value }
                    }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD6F00]"
                    placeholder="+123 456 7890"
                  />
                </div>
              </div>
              
              <button
                onClick={handleSave}
                disabled={loading}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-[#FD6F00] to-[#E46400] hover:opacity-90 rounded-lg transition-colors font-bold"
              >
                💾 Save Contact Info
              </button>
            </div>
          )}
        </div>

        {/* Preview Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              window.open('/', '_blank');
            }}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2 mx-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview Portfolio in New Tab
          </button>
          <p className="text-gray-400 text-sm mt-2">
            Changes will be visible immediately in your portfolio
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard