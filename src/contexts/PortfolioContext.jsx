// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { supabaseAPI } from '../services/api';
// import { useAuth } from './AuthContext';

// const PortfolioContext = createContext();

// export const usePortfolio = () => {
//   const context = useContext(PortfolioContext);
//   if (!context) {
//     throw new Error('usePortfolio must be used within a PortfolioProvider');
//   }
//   return context;
// };

// export const PortfolioProvider = ({ children }) => {
//   const [portfolioData, setPortfolioData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { user } = useAuth();

//   // Function to transform database data to frontend format
//   const transformPortfolioData = (dbData) => {
//     if (!dbData) return getDefaultPortfolioData();
    
//     return {
//       profile: {
//         name: dbData.profile?.name || 'Your Name',
//         role: dbData.profile?.role || 'Web Developer',
//         cv: dbData.profile?.cv_url || '#',
//         photo: dbData.profile?.photo_url || '',
//         stats: dbData.profile?.stats || { exp: '0+', projects: '0+', clients: '0+' },
//         socials: dbData.profile?.socials || {
//           github: '',
//           linkedin: '',
//           instagram: '',
//           facebook: ''
//         }
//       },
//       services: (dbData.services || []).map(service => ({
//         title: service.title,
//         icon: service.icon,
//         desc: service.description
//       })),
//       about: {
//         description: dbData.about?.description || dbData.profile?.about_description || '',
//         skills: (dbData.skills || []).map(skill => ({
//           name: skill.name,
//           level: skill.level,
//           icon: skill.icon
//         }))
//       },
//       projects: (dbData.projects || []).map(project => ({
//         id: project.id,
//         title: project.title,
//         category: project.category,
//         img: project.image_url,
//         github: project.github_url,
//         gallery: project.gallery || []
//       })),
//       contact: {
//         email: dbData.contact?.email || '',
//         phone: dbData.contact?.phone || ''
//       }
//     };
//   };

//   // Function to transform frontend data to database format
//   const transformToDbFormat = (frontendData) => {
//     return {
//       profile: {
//         name: frontendData.profile?.name,
//         role: frontendData.profile?.role,
//         cv_url: frontendData.profile?.cv,
//         photo_url: frontendData.profile?.photo,
//         stats: frontendData.profile?.stats,
//         socials: frontendData.profile?.socials,
//         about_description: frontendData.about?.description
//       },
//       services: frontendData.services?.map(service => ({
//         title: service.title,
//         icon: service.icon,
//         description: service.desc
//       })),
//       about: {
//         description: frontendData.about?.description,
//         skills: frontendData.about?.skills?.map(skill => ({
//           name: skill.name,
//           level: skill.level,
//           icon: skill.icon,
//           category: skill.category || 'technical'
//         }))
//       },
//       projects: frontendData.projects?.map(project => ({
//         title: project.title,
//         category: project.category,
//         image_url: project.img,
//         github_url: project.github,
//         gallery: project.gallery,
//         is_published: true
//       })),
//       contact: {
//         email: frontendData.contact?.email,
//         phone: frontendData.contact?.phone
//       }
//     };
//   };

//   const getDefaultPortfolioData = () => {
//     return {
//       profile: {
//         name: 'Your Name',
//         role: 'Web Developer',
//         cv: '#',
//         photo: '',
//         stats: { exp: '0+', projects: '0+', clients: '0+' },
//         socials: {
//           github: '',
//           linkedin: '',
//           instagram: '',
//           facebook: ''
//         }
//       },
//       services: [
//         { title: 'Web Development', icon: '🌐', desc: 'Crafting high-performance digital experiences.' },
//         { title: 'UI/UX Design', icon: '🎨', desc: 'Designing intuitive and beautiful interfaces.' },
//         { title: 'App Solution', icon: '📱', desc: 'Building scalable mobile applications.' },
//       ],
//       about: {
//         description: 'I am a web developer passionate about creating amazing digital experiences.',
//         skills: [
//           { name: 'HTML/CSS', level: 90, icon: '💻' },
//           { name: 'JavaScript', level: 85, icon: '⚡' },
//           { name: 'React', level: 80, icon: '⚛️' },
//         ]
//       },
//       projects: [
//         { 
//           id: 1, 
//           title: 'My First Project', 
//           category: 'Web Development', 
//           img: 'https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Project+1', 
//           github: '',
//           gallery: []
//         }
//       ],
//       contact: {
//         email: '',
//         phone: ''
//       }
//     };
//   };

//   const fetchMyPortfolio = async () => {
//     if (!user?.id) return;
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       console.log('Fetching portfolio from Supabase for user:', user.id);
//       const dbData = await supabaseAPI.getPortfolio(user.id);
//       console.log('Portfolio data received from Supabase:', dbData);
      
//       const transformedData = transformPortfolioData(dbData);
//       setPortfolioData(transformedData);
      
//       return transformedData;
//     } catch (err) {
//       console.error('Error fetching portfolio from Supabase:', err);
//       setError('Failed to fetch portfolio. Using default data.');
      
//       const defaultData = getDefaultPortfolioData();
//       setPortfolioData(defaultData);
//       return defaultData;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updatePortfolio = async (data) => {
//     if (!user?.id) {
//       return { success: false, error: 'User not authenticated' };
//     }
    
//     try {
//       console.log('Updating portfolio in Supabase:', data);
      
//       // Transform data to database format
//       const dbFormatData = transformToDbFormat(data);
      
//       await supabaseAPI.updatePortfolio(user.id, dbFormatData);
      
//       // Refresh the portfolio data
//       const updatedData = await fetchMyPortfolio();
      
//       return { success: true, data: updatedData };
//     } catch (err) {
//       console.error('Update error:', err);
//       return { 
//         success: false, 
//         error: err.message || 'Update failed. Please try again.' 
//       };
//     }
//   };

//   // Load portfolio data when user changes
//   useEffect(() => {
//     if (user?.id) {
//       fetchMyPortfolio();
//     } else {
//       setPortfolioData(getDefaultPortfolioData());
//     }
//   }, [user]);

//   const value = {
//     portfolioData,
//     loading,
//     error,
//     fetchMyPortfolio,
//     updatePortfolio,
//     setPortfolioData
//   };

//   return (
//     <PortfolioContext.Provider value={value}>
//       {children}
//     </PortfolioContext.Provider>
//   );
// };






import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { supabaseAPI } from '../services/api';
import { useAuth } from './AuthContext';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Function to transform database data to frontend format
  const transformPortfolioData = (dbData) => {
    if (!dbData) return getDefaultPortfolioData();
    
    return {
      profile: {
        name: dbData.profile?.name || 'Your Name',
        role: dbData.profile?.role || 'Web Developer',
        cv: dbData.profile?.cv_url || '#',
        photo: dbData.profile?.photo_url || '',
        stats: dbData.profile?.stats || { exp: '0+', projects: '0+', clients: '0+' },
        socials: dbData.profile?.socials || {
          github: '',
          linkedin: '',
          instagram: '',
          facebook: ''
        }
      },
      services: (dbData.services || []).map(service => ({
        title: service.title,
        icon: service.icon,
        desc: service.description
      })),
      about: {
        description: dbData.profile?.about_description || '',
        skills: (dbData.skills || []).map(skill => ({
          name: skill.name,
          level: skill.level,
          icon: skill.icon
        }))
      },
      projects: (dbData.projects || []).map(project => ({
        id: project.id,
        title: project.title,
        category: project.category,
        img: project.image_url,
        github: project.github_url,
        gallery: project.gallery || []
      })),
      contact: {
        email: dbData.contact?.email || '',
        phone: dbData.contact?.phone || ''
      }
    };
  };

  // Function to transform frontend data to database format
  const transformToDbFormat = (frontendData) => {
    if (!frontendData) return {};
    
    return {
      profile: {
        name: frontendData.profile?.name,
        role: frontendData.profile?.role,
        cv_url: frontendData.profile?.cv,
        photo_url: frontendData.profile?.photo,
        stats: frontendData.profile?.stats,
        socials: frontendData.profile?.socials,
        about_description: frontendData.about?.description
      },
      services: frontendData.services?.map(service => ({
        title: service.title,
        icon: service.icon,
        description: service.desc
      })),
      about: {
        description: frontendData.about?.description,
        skills: frontendData.about?.skills?.map(skill => ({
          name: skill.name,
          level: skill.level,
          icon: skill.icon,
          category: skill.category || 'technical'
        }))
      },
      projects: frontendData.projects?.map(project => ({
        title: project.title,
        category: project.category,
        image_url: project.img,
        github_url: project.github,
        gallery: project.gallery,
        is_published: true
      })),
      contact: {
        email: frontendData.contact?.email,
        phone: frontendData.contact?.phone
      }
    };
  };

  const getDefaultPortfolioData = () => {
    return {
      profile: {
        name: 'Your Name',
        role: 'Web Developer',
        cv: '#',
        photo: '',
        stats: { exp: '0+', projects: '0+', clients: '0+' },
        socials: {
          github: '',
          linkedin: '',
          instagram: '',
          facebook: ''
        }
      },
      services: [
        { title: 'Web Development', icon: '🌐', desc: 'Crafting high-performance digital experiences.' },
        { title: 'UI/UX Design', icon: '🎨', desc: 'Designing intuitive and beautiful interfaces.' },
        { title: 'App Solution', icon: '📱', desc: 'Building scalable mobile applications.' },
      ],
      about: {
        description: 'I am a web developer passionate about creating amazing digital experiences.',
        skills: [
          { name: 'HTML/CSS', level: 90, icon: '💻' },
          { name: 'JavaScript', level: 85, icon: '⚡' },
          { name: 'React', level: 80, icon: '⚛️' },
        ]
      },
      projects: [
        { 
          id: 1, 
          title: 'My First Project', 
          category: 'Web Development', 
          img: 'https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Project+1', 
          github: '',
          gallery: []
        }
      ],
      contact: {
        email: '',
        phone: ''
      }
    };
  };

  const fetchMyPortfolio = useCallback(async () => {
    if (!user?.id) {
      console.log('No user ID, using default data');
      const defaultData = getDefaultPortfolioData();
      setPortfolioData(defaultData);
      return defaultData;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching portfolio from Supabase for user:', user.id);
      const dbData = await supabaseAPI.getPortfolio(user.id);
      console.log('Portfolio data received from Supabase:', dbData);
      
      const transformedData = transformPortfolioData(dbData);
      setPortfolioData(transformedData);
      
      // Save to localStorage as backup
      localStorage.setItem(`portfolio_${user.id}`, JSON.stringify(transformedData));
      
      return transformedData;
    } catch (err) {
      console.error('Error fetching portfolio from Supabase:', err);
      setError('Failed to fetch portfolio. Using cached data.');
      
      // Try to load from localStorage
      const cachedData = localStorage.getItem(`portfolio_${user.id}`);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setPortfolioData(parsedData);
        return parsedData;
      }
      
      const defaultData = getDefaultPortfolioData();
      setPortfolioData(defaultData);
      return defaultData;
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const updatePortfolio = async (data) => {
    if (!user?.id) {
      return { success: false, error: 'User not authenticated' };
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Updating portfolio in Supabase:', data);
      
      // Transform data to database format
      const dbFormatData = transformToDbFormat(data);
      
      // Update in Supabase
      const result = await supabaseAPI.updatePortfolio(user.id, dbFormatData);
      
      if (!result.success) {
        throw new Error(result.error || 'Update failed');
      }
      
      // Force refresh by updating timestamp
      setLastUpdate(Date.now());
      
      // Also update local state immediately with the new data
      if (data.profile || data.services || data.about || data.projects || data.contact) {
        const currentData = portfolioData || getDefaultPortfolioData();
        const updatedData = {
          ...currentData,
          ...data,
          profile: {
            ...currentData.profile,
            ...data.profile
          },
          about: {
            ...currentData.about,
            ...data.about
          },
          contact: {
            ...currentData.contact,
            ...data.contact
          }
        };
        
        setPortfolioData(updatedData);
        localStorage.setItem(`portfolio_${user.id}`, JSON.stringify(updatedData));
      }
      
      // Dispatch custom event for real-time updates
      window.dispatchEvent(new CustomEvent('portfolioUpdated', { 
        detail: { userId: user.id } 
      }));
      
      return { success: true, data: portfolioData };
    } catch (err) {
      console.error('Update error:', err);
      return { 
        success: false, 
        error: err.message || 'Update failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Load portfolio data when user changes or lastUpdate changes
  useEffect(() => {
    fetchMyPortfolio();
  }, [user?.id, fetchMyPortfolio, lastUpdate]);

  // Listen for portfolio update events
  useEffect(() => {
    const handlePortfolioUpdate = (event) => {
      if (event.detail?.userId === user?.id) {
        console.log('Portfolio update event received, refreshing...');
        fetchMyPortfolio();
      }
    };

    window.addEventListener('portfolioUpdated', handlePortfolioUpdate);
    
    return () => {
      window.removeEventListener('portfolioUpdated', handlePortfolioUpdate);
    };
  }, [user?.id, fetchMyPortfolio]);

  const value = {
    portfolioData,
    loading,
    error,
    fetchMyPortfolio,
    updatePortfolio,
    setPortfolioData,
    refreshPortfolio: () => {
      setLastUpdate(Date.now());
      return fetchMyPortfolio();
    }
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};