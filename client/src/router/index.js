import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Project from "@/views/Project.vue";
import CreateProject from "@/views/CreateProject.vue";
import LandingPage from "@/views/LandingPage.vue";
import Auth from "@/views/Auth.vue";
import ProfileMatch from "@/views/ProfileMatch.vue";
import { supabase } from "@/lib/supabaseClient";

const routes = [
    {
        path: '/',
        name: 'landing',
        component: LandingPage,
        meta: { requiresAuth: false }
    },
    {
        path: '/auth/login',
        name: 'login',
        component: Auth,
        meta: { requiresAuth: false }
    },
    {
        path: '/auth/signup',
        name: 'signup',
        component: Auth,
        meta: { requiresAuth: false }
    },
    {
        path: '/auth/callback',
        name: 'auth-callback',
        component: () => import('@/lib/AuthCallback.vue'),
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true}
    },
    {
        path: '/projects',
        name: 'projectView',
        component: Project,
        meta: { requiresAuth: true }
    },
    {
        path: '/projects/create',
        name: 'createProject',
        component: CreateProject,
        meta: { requiresAuth: true}
    },
    {
        path: '/projects/:id',
        name: 'projectDetails',
        component: Project,
        meta: { requiresAuth: true}
    },
    {
        path: '/projects/:id/matches',
        name: 'profileMatch',
        component: ProfileMatch,
        meta: { requiresAuth: true}
    },
    {
        path: '/freelancer/dashboard',
        name: 'freelancer-dashboard',
        component: () => import('@/views/freelancer/FreelancerDashboard.vue'),
        meta: { requiresAuth: true, role: 'Freelancer' }
    },
    {
        path: '/freelancer/profile/edit',
        name: 'freelancer-profile-edit',
        component: () => import('@/views/freelancer/ProfileEdit.vue'),
        meta: { requiresAuth: true, role: 'Freelancer' }
    },
    {
        path: '/freelancer/resume/upload',
        name: 'freelancer-resume-upload',
        component: () => import('@/views/freelancer/ResumeUpload.vue'),
        meta: { requiresAuth: true, role: 'Freelancer' }
    },
    // {
    //     path: '/freelancer/matches',
    //     name: 'freelancer-matches',
    //     component: () => import('@/views/freelancer/ProjectMatches.vue'),
    //     meta: { requiresAuth: true, role: 'Freelancer' }
    // },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'  // Redirects unknown routes to landing page
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiredRole = to.matched.find(record => record.meta.role)?.meta.role;
    
    if (requiresAuth) {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        next({ name: 'login' });
        return;
      }
      
      if (requiredRole) {
        try {
          const response = await fetch(`http://localhost:5050/api/user/${session.user.id}`, {
            headers: {
              'Authorization': `Bearer ${session.access_token}`
            }
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          
          const userData = await response.json();
          
          if (userData.role !== requiredRole) {
            if (userData.role === 'Client') {
              next({ name: 'client-dashboard' });
            } else if (userData.role === 'Freelancer') {
              next({ name: 'freelancer-dashboard' });
            } else {
              next({ name: 'home' });
            }
            return;
          }
        } catch (error) {
          console.error('Error in route guard:', error);
          next({ name: 'login' });
          return;
        }
      }
    }
    
    next();
  });

export default router;
