// import axios from 'axios';
// import { createClient } from '@supabase/supabase-js';

// // Initialize Supabase client
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// // Create axios instance for FastAPI backend
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('access_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Supabase API functions (direct database operations)
// export const supabaseAPI = {
//   // Auth functions
//   signUp: async (email, password, full_name) => {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           full_name: full_name
//         }
//       }
//     });
    
//     if (error) throw error;
//     return data;
//   },
  
//   signIn: async (email, password) => {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password
//     });
    
//     if (error) throw error;
//     return data;
//   },
  
//   signOut: async () => {
//     const { error } = await supabase.auth.signOut();
//     if (error) throw error;
//   },
  
//   getCurrentUser: async () => {
//     const { data, error } = await supabase.auth.getUser();
//     if (error) throw error;
//     return data;
//   },
  
//   // Portfolio data functions
//   getPortfolio: async (userId) => {
//     try {
//       // Get profile
//       const { data: profile, error: profileError } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('user_id', userId)
//         .single();
      
//       if (profileError && profileError.code !== 'PGRST116') throw profileError;
      
//       // Get services
//       const { data: services, error: servicesError } = await supabase
//         .from('services')
//         .select('*')
//         .eq('user_id', userId)
//         .order('order_index');
      
//       if (servicesError) throw servicesError;
      
//       // Get projects
//       const { data: projects, error: projectsError } = await supabase
//         .from('projects')
//         .select('*')
//         .eq('user_id', userId)
//         .eq('is_published', true)
//         .order('created_at', { ascending: false });
      
//       if (projectsError) throw projectsError;
      
//       // Get skills
//       const { data: skills, error: skillsError } = await supabase
//         .from('skills')
//         .select('*')
//         .eq('user_id', userId);
      
//       if (skillsError) throw skillsError;
      
//       // Get contact
//       const { data: contact, error: contactError } = await supabase
//         .from('contacts')
//         .select('*')
//         .eq('user_id', userId)
//         .single();
      
//       if (contactError && contactError.code !== 'PGRST116') throw contactError;
      
//       // Transform data to frontend format
//       return {
//         profile: profile || {
//           name: 'Your Name',
//           role: 'Web Developer',
//           cv_url: '#',
//           stats: { exp: '0+', projects: '0+', clients: '0+' },
//           socials: {}
//         },
//         services: services || [],
//         projects: projects || [],
//         skills: skills || [],
//         contact: contact || { email: '', phone: '' }
//       };
//     } catch (error) {
//       console.error('Error fetching portfolio from Supabase:', error);
//       throw error;
//     }
//   },
  
//   updatePortfolio: async (userId, portfolioData) => {
//     const { profile, services, about, projects, contact } = portfolioData;
    
//     // Start a transaction (Supabase doesn't have transactions, but we can use promises)
//     try {
//       // Update profile
//       if (profile) {
//         const { error: profileError } = await supabase
//           .from('profiles')
//           .upsert({
//             user_id: userId,
//             ...profile,
//             updated_at: new Date().toISOString()
//           });
        
//         if (profileError) throw profileError;
//       }
      
//       // Update services (delete all and insert new)
//       if (services !== undefined) {
//         // Delete existing services
//         const { error: deleteError } = await supabase
//           .from('services')
//           .delete()
//           .eq('user_id', userId);
        
//         if (deleteError) throw deleteError;
        
//         // Insert new services with order_index
//         if (services.length > 0) {
//           const servicesWithUserId = services.map((service, index) => ({
//             ...service,
//             user_id: userId,
//             order_index: index
//           }));
          
//           const { error: insertError } = await supabase
//             .from('services')
//             .insert(servicesWithUserId);
          
//           if (insertError) throw insertError;
//         }
//       }
      
//       // Update skills (delete all and insert new)
//       if (about?.skills !== undefined) {
//         // Delete existing skills
//         const { error: deleteError } = await supabase
//           .from('skills')
//           .delete()
//           .eq('user_id', userId);
        
//         if (deleteError) throw deleteError;
        
//         // Insert new skills
//         if (about.skills.length > 0) {
//           const skillsWithUserId = about.skills.map(skill => ({
//             ...skill,
//             user_id: userId
//           }));
          
//           const { error: insertError } = await supabase
//             .from('skills')
//             .insert(skillsWithUserId);
          
//           if (insertError) throw insertError;
//         }
//       }
      
//       // Update projects
//       if (projects !== undefined) {
//         // Delete all projects and insert new ones
//         const { error: deleteError } = await supabase
//           .from('projects')
//           .delete()
//           .eq('user_id', userId);
        
//         if (deleteError) throw deleteError;
        
//         if (projects.length > 0) {
//           const projectsWithUserId = projects.map(project => ({
//             ...project,
//             user_id: userId,
//             created_at: project.created_at || new Date().toISOString()
//           }));
          
//           const { error: insertError } = await supabase
//             .from('projects')
//             .insert(projectsWithUserId);
          
//           if (insertError) throw insertError;
//         }
//       }
      
//       // Update contact
//       if (contact) {
//         const { error: contactError } = await supabase
//           .from('contacts')
//           .upsert({
//             user_id: userId,
//             ...contact,
//             updated_at: new Date().toISOString()
//           });
        
//         if (contactError) throw contactError;
//       }
      
//       return { success: true };
//     } catch (error) {
//       console.error('Error updating portfolio in Supabase:', error);
//       throw error;
//     }
//   }
// };

// // FastAPI backend functions (if you still want to use it)
// export const portfolioAPI = {
//   // Auth endpoints (using Supabase directly now)
//   register: (userData) => api.post('/auth/register', userData),
//   login: (userData) => api.post('/auth/login', userData),
  
//   // Portfolio endpoints
//   getMyPortfolio: () => api.get('/portfolio'),
//   getPublicPortfolio: (userId) => api.get(`/portfolio/${userId}`),
//   updatePortfolio: (data) => api.put('/dashboard/portfolio', data),
  
//   // Project endpoints
//   addProject: (project) => api.post('/dashboard/projects', project),
//   updateProject: (id, project) => api.put(`/dashboard/projects/${id}`, project),
//   deleteProject: (id) => api.delete(`/dashboard/projects/${id}`),
  
//   // Health check
//   health: () => api.get('/health'),
// };

// // Export Supabase client for direct use
// export { supabase };

// export default api;





















import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with error handling
let supabase;

try {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Supabase environment variables are missing!');
    console.error('Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file');
    
    // Create a mock supabase client for development
    supabase = {
      auth: {
        signUp: () => Promise.resolve({ error: 'Supabase not configured' }),
        signInWithPassword: () => Promise.resolve({ error: 'Supabase not configured' }),
        signOut: () => Promise.resolve({ error: 'Supabase not configured' }),
        getUser: () => Promise.resolve({ error: 'Supabase not configured' }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      },
      from: () => ({
        select: () => ({ eq: () => ({ execute: () => Promise.resolve({ data: [], error: null }) }) }),
        insert: () => Promise.resolve({ error: null }),
        update: () => ({ eq: () => Promise.resolve({ error: null }) }),
        delete: () => ({ eq: () => Promise.resolve({ error: null }) }),
        upsert: () => Promise.resolve({ error: null })
      }),
      table: () => ({
        select: () => ({ eq: () => ({ order: () => ({ execute: () => Promise.resolve({ data: [], error: null }) }) }) }),
        insert: () => ({ execute: () => Promise.resolve({ data: [], error: null }) }),
        update: () => ({ eq: () => ({ execute: () => Promise.resolve({ data: [], error: null }) }) }),
        delete: () => ({ eq: () => ({ execute: () => Promise.resolve({ data: [], error: null }) }) }),
        upsert: () => ({ execute: () => Promise.resolve({ data: [], error: null }) })
      })
    };
  } else {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client initialized');
  }
} catch (error) {
  console.error('❌ Error initializing Supabase:', error);
  supabase = null;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id');
    }
    return Promise.reject(error);
  }
);

// Direct Supabase API functions
export const supabaseAPI = {
  // Auth functions
  signUp: async (email, password, full_name) => {
    if (!supabase?.auth) {
      return { error: 'Supabase not configured' };
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: full_name
          }
        }
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
  
  signIn: async (email, password) => {
    if (!supabase?.auth) {
      return { error: 'Supabase not configured' };
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
  
  signOut: async () => {
    if (!supabase?.auth) {
      return { error: 'Supabase not configured' };
    }
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },
  
  getCurrentUser: async () => {
    if (!supabase?.auth) {
      return { error: 'Supabase not configured' };
    }
    
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
  
  // Portfolio data functions
  getPortfolio: async (userId) => {
    if (!supabase) {
      console.log('Supabase not configured, returning mock data');
      return {
        profile: {
          name: 'Demo User',
          role: 'Web Developer',
          cv_url: '#',
          photo_url: '',
          stats: { exp: '2+', projects: '50+', clients: '30+' },
          socials: {},
          about_description: 'Demo portfolio'
        },
        services: [],
        projects: [],
        skills: [],
        contact: { email: 'demo@example.com', phone: '' }
      };
    }
    
    try {
      // Get profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Profile error:', profileError);
        throw profileError;
      }
      
      // Get services
      const { data: services, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', userId)
        .order('order_index');
      
      if (servicesError) {
        console.error('Services error:', servicesError);
        throw servicesError;
      }
      
      // Get projects
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      if (projectsError) {
        console.error('Projects error:', projectsError);
        throw projectsError;
      }
      
      // Get skills
      const { data: skills, error: skillsError } = await supabase
        .from('skills')
        .select('*')
        .eq('user_id', userId);
      
      if (skillsError) {
        console.error('Skills error:', skillsError);
        throw skillsError;
      }
      
      // Get contact
      const { data: contact, error: contactError } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (contactError && contactError.code !== 'PGRST116') {
        console.error('Contact error:', contactError);
        throw contactError;
      }
      
      // Transform data to frontend format
      return {
        profile: profile || {
          name: 'Your Name',
          role: 'Web Developer',
          cv_url: '#',
          photo_url: '',
          stats: { exp: '0+', projects: '0+', clients: '0+' },
          socials: {},
          about_description: ''
        },
        services: services || [],
        projects: projects || [],
        skills: skills || [],
        contact: contact || { email: '', phone: '' }
      };
    } catch (error) {
      console.error('Error fetching portfolio from Supabase:', error);
      throw error;
    }
  },
  
 updatePortfolio: async (userId, portfolioData) => {
  const { profile, services, about, projects, contact } = portfolioData;
  
  if (!supabase) {
    console.log('Supabase not configured, mock update');
    return { success: true };
  }
  
  try {
    // Update profile - Use UPSERT to handle both insert and update
    if (profile) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({  // Changed from .insert() to .upsert()
          user_id: userId,
          name: profile.name,
          role: profile.role,
          cv_url: profile.cv_url,
          photo_url: profile.photo_url,
          stats: profile.stats,
          socials: profile.socials,
          about_description: profile.about_description,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'  // Specify which column has unique constraint
        });
      
      if (profileError) {
        console.error('Profile upsert error:', profileError);
        throw profileError;
      }
    }
    
    // Update services - Delete all and insert new (this is fine since user_id is not unique here)
    if (services !== undefined) {
      // Delete existing services
      const { error: deleteError } = await supabase
        .from('services')
        .delete()
        .eq('user_id', userId);
      
      if (deleteError) {
        console.error('Delete services error:', deleteError);
        throw deleteError;
      }
      
      // Insert new services with order_index
      if (services.length > 0) {
        const servicesWithUserId = services.map((service, index) => ({
          ...service,
          user_id: userId,
          order_index: index
        }));
        
        const { error: insertError } = await supabase
          .from('services')
          .insert(servicesWithUserId);
        
        if (insertError) {
          console.error('Insert services error:', insertError);
          throw insertError;
        }
      }
    }
    
    // Update skills - Delete all and insert new (this is fine)
    if (about?.skills !== undefined) {
      // Delete existing skills
      const { error: deleteError } = await supabase
        .from('skills')
        .delete()
        .eq('user_id', userId);
      
      if (deleteError) {
        console.error('Delete skills error:', deleteError);
        throw deleteError;
      }
      
      // Insert new skills
      if (about.skills.length > 0) {
        const skillsWithUserId = about.skills.map(skill => ({
          ...skill,
          user_id: userId,
          category: skill.category || 'technical'
        }));
        
        const { error: insertError } = await supabase
          .from('skills')
          .insert(skillsWithUserId);
        
        if (insertError) {
          console.error('Insert skills error:', insertError);
          throw insertError;
        }
      }
    }
    
    // Update projects - Delete all and insert new
    if (projects !== undefined) {
      // Delete all projects
      const { error: deleteError } = await supabase
        .from('projects')
        .delete()
        .eq('user_id', userId);
      
      if (deleteError) {
        console.error('Delete projects error:', deleteError);
        throw deleteError;
      }
      
      if (projects.length > 0) {
        const projectsWithUserId = projects.map(project => ({
          ...project,
          user_id: userId,
          created_at: project.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString()
        }));
        
        const { error: insertError } = await supabase
          .from('projects')
          .insert(projectsWithUserId);
        
        if (insertError) {
          console.error('Insert projects error:', insertError);
          throw insertError;
        }
      }
    }
    
    // Update contact - Use UPSERT
    if (contact) {
      const { error: contactError } = await supabase
        .from('contacts')
        .upsert({  // Changed from .insert() to .upsert()
          user_id: userId,
          email: contact.email,
          phone: contact.phone,
          address: contact.address,
          website: contact.website,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'  // Specify which column has unique constraint
        });
      
      if (contactError) {
        console.error('Contact upsert error:', contactError);
        throw contactError;
      }
    }
    
    console.log('✅ Portfolio updated successfully for user:', userId);
    return { success: true };
  } catch (error) {
    console.error('❌ Error updating portfolio in Supabase:', error);
    throw error;
  }
 }
};

// FastAPI backend functions
export const portfolioAPI = {
  // Auth endpoints (using Supabase directly now)
  register: (userData) => api.post('/auth/register', userData),
  login: (userData) => api.post('/auth/login', userData),
  
  // Portfolio endpoints
  getMyPortfolio: () => api.get('/portfolio'),
  getPublicPortfolio: (userId) => api.get(`/portfolio/${userId}`),
  updatePortfolio: (data) => api.put('/dashboard/portfolio', data),
  
  // Project endpoints
  addProject: (project) => api.post('/dashboard/projects', project),
  updateProject: (id, project) => api.put(`/dashboard/projects/${id}`, project),
  deleteProject: (id) => api.delete(`/dashboard/projects/${id}`),
  
  // Health check
  health: () => api.get('/health'),
};

// Export Supabase client for direct use
export { supabase };

export default api;

















