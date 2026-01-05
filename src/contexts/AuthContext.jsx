// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { supabaseAPI } from '../services/api';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check current session on mount
//     const checkUser = async () => {
//       try {
//         const { data } = await supabaseAPI.getCurrentUser();
//         if (data?.user) {
//           setUser({
//             id: data.user.id,
//             email: data.user.email,
//             name: data.user.user_metadata?.full_name,
//             isAuthenticated: true,
//           });
          
//           // Store in localStorage for persistence
//           localStorage.setItem('user_id', data.user.id);
//           localStorage.setItem('user_email', data.user.email);
//           localStorage.setItem('user_name', data.user.user_metadata?.full_name || '');
//         }
//       } catch (error) {
//         console.log('No user logged in');
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkUser();

//     // Listen for auth changes
//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         if (session?.user) {
//           setUser({
//             id: session.user.id,
//             email: session.user.email,
//             name: session.user.user_metadata?.full_name,
//             isAuthenticated: true,
//           });
          
//           localStorage.setItem('user_id', session.user.id);
//           localStorage.setItem('user_email', session.user.email);
//           localStorage.setItem('user_name', session.user.user_metadata?.full_name || '');
//         } else {
//           setUser(null);
//           localStorage.removeItem('user_id');
//           localStorage.removeItem('user_email');
//           localStorage.removeItem('user_name');
//         }
//         setLoading(false);
//       }
//     );

//     return () => {
//       authListener?.subscription.unsubscribe();
//     };
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const data = await supabaseAPI.signIn(email, password);
      
//       if (data.user) {
//         setUser({
//           id: data.user.id,
//           email: data.user.email,
//           name: data.user.user_metadata?.full_name,
//           isAuthenticated: true,
//         });
        
//         // Store access token for FastAPI if needed
//         localStorage.setItem('access_token', data.session?.access_token || '');
//         localStorage.setItem('user_id', data.user.id);
//         localStorage.setItem('user_email', data.user.email);
//         localStorage.setItem('user_name', data.user.user_metadata?.full_name || '');
        
//         return { success: true, user: data.user };
//       }
      
//       return { success: false, error: 'Login failed' };
//     } catch (error) {
//       console.error('Login error:', error);
//       return { 
//         success: false, 
//         error: error.message || 'Login failed. Please check credentials.' 
//       };
//     }
//   };

//   const register = async (email, password, full_name) => {
//     try {
//       const data = await supabaseAPI.signUp(email, password, full_name);
      
//       if (data.user) {
//         // Auto-login after registration
//         const loginResult = await login(email, password);
        
//         if (loginResult.success) {
//           // Create initial portfolio for new user
//           await createInitialPortfolio(data.user.id, email, full_name);
//           return { success: true, user: data.user };
//         }
        
//         return loginResult;
//       }
      
//       return { success: false, error: 'Registration failed' };
//     } catch (error) {
//       console.error('Registration error:', error);
//       return { 
//         success: false, 
//         error: error.message || 'Registration failed. Please try again.' 
//       };
//     }
//   };

//   const createInitialPortfolio = async (userId, email, fullName) => {
//     try {
//       const defaultPortfolio = {
//         profile: {
//           name: fullName || 'Your Name',
//           role: 'Web Developer',
//           cv_url: '#',
//           stats: { exp: '0+', projects: '0+', clients: '0+' },
//           socials: {
//             github: '',
//             linkedin: '',
//             instagram: '',
//             facebook: ''
//           }
//         },
//         services: [
//           { title: 'Web Development', icon: '🌐', description: 'Crafting high-performance digital experiences.' },
//           { title: 'UI/UX Design', icon: '🎨', description: 'Designing intuitive and beautiful interfaces.' },
//           { title: 'App Solution', icon: '📱', description: 'Building scalable mobile applications.' },
//         ],
//         about: {
//           description: 'I am a web developer passionate about creating amazing digital experiences.',
//           skills: [
//             { name: 'HTML/CSS', level: 90, icon: '💻', category: 'technical' },
//             { name: 'JavaScript', level: 85, icon: '⚡', category: 'technical' },
//             { name: 'React', level: 80, icon: '⚛️', category: 'technical' },
//           ]
//         },
//         projects: [
//           {
//             title: 'My First Project',
//             category: 'Web Development',
//             image_url: 'https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Project+1',
//             github_url: '',
//             gallery: [],
//             is_published: true
//           }
//         ],
//         contact: {
//           email: email,
//           phone: ''
//         }
//       };

//       await supabaseAPI.updatePortfolio(userId, defaultPortfolio);
//       console.log('Initial portfolio created for user:', userId);
//     } catch (error) {
//       console.error('Error creating initial portfolio:', error);
//     }
//   };

//   const logout = async () => {
//     try {
//       await supabaseAPI.signOut();
//       setUser(null);
//       localStorage.removeItem('access_token');
//       localStorage.removeItem('user_id');
//       localStorage.removeItem('user_email');
//       localStorage.removeItem('user_name');
//       window.location.href = '/';
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     register,
//     logout,
//     isAuthenticated: !!user?.isAuthenticated,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




















import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      console.log('Supabase not configured, skipping auth check');
      setLoading(false);
      return;
    }

    // Check current session on mount
    const checkUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        
        if (error) {
          console.log('No user logged in:', error.message);
          setLoading(false);
          return;
        }
        
        if (data?.user) {
          setUser({
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.full_name,
            isAuthenticated: true,
          });
          
          // Store in localStorage for persistence
          localStorage.setItem('user_id', data.user.id);
          localStorage.setItem('user_email', data.user.email);
          localStorage.setItem('user_name', data.user.user_metadata?.full_name || '');
        }
      } catch (error) {
        console.log('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes if supabase is available
    if (supabase && supabase.auth && supabase.auth.onAuthStateChange) {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('Auth state changed:', event);
          
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.full_name,
              isAuthenticated: true,
            });
            
            localStorage.setItem('user_id', session.user.id);
            localStorage.setItem('user_email', session.user.email);
            localStorage.setItem('user_name', session.user.user_metadata?.full_name || '');
            localStorage.setItem('access_token', session.access_token);
          } else {
            setUser(null);
            localStorage.removeItem('user_id');
            localStorage.removeItem('user_email');
            localStorage.removeItem('user_name');
            localStorage.removeItem('access_token');
          }
          setLoading(false);
        }
      );

      return () => {
        authListener?.subscription.unsubscribe();
      };
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    if (!supabase || !supabase.auth) {
      console.log('Mock login for:', email);
      
      // Mock response for development
      const mockUser = {
        id: 'mock-user-' + Date.now(),
        email: email,
        user_metadata: { full_name: 'Demo User' }
      };
      
      setUser({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.user_metadata?.full_name,
        isAuthenticated: true,
      });
      
      localStorage.setItem('user_id', mockUser.id);
      localStorage.setItem('user_email', mockUser.email);
      localStorage.setItem('user_name', mockUser.user_metadata?.full_name || '');
      localStorage.setItem('access_token', 'mock-token');
      
      return { success: true, user: mockUser };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.full_name,
          isAuthenticated: true,
        });
        
        localStorage.setItem('user_id', data.user.id);
        localStorage.setItem('user_email', data.user.email);
        localStorage.setItem('user_name', data.user.user_metadata?.full_name || '');
        localStorage.setItem('access_token', data.session.access_token);
        
        return { success: true, user: data.user };
      }
      
      return { success: false, error: 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Login failed. Please check credentials.' 
      };
    }
  };

  const register = async (email, password, full_name) => {
    if (!supabase || !supabase.auth) {
      console.log('Mock registration for:', email, full_name);
      
      // Mock response for development
      const mockUser = {
        id: 'mock-user-' + Date.now(),
        email: email,
        user_metadata: { full_name: full_name }
      };
      
      setUser({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.user_metadata?.full_name,
        isAuthenticated: true,
      });
      
      localStorage.setItem('user_id', mockUser.id);
      localStorage.setItem('user_email', mockUser.email);
      localStorage.setItem('user_name', mockUser.user_metadata?.full_name || '');
      localStorage.setItem('access_token', 'mock-token');
      
      return { success: true, user: mockUser };
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
      
      if (data.user) {
        // Auto-login after registration
        const loginResult = await login(email, password);
        return loginResult;
      }
      
      return { success: false, error: 'Registration failed' };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.message || 'Registration failed. Please try again.' 
      };
    }
  };

  const logout = async () => {
    if (supabase?.auth) {
      try {
        await supabase.auth.signOut();
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    
    setUser(null);
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('access_token');
    window.location.href = '/';
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user?.isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};