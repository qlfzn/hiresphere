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
        path: '/:pathMatch(.*)*',
        redirect: '/'  // Redirects unknown routes to landing page
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

// Redirect unauthenticated users
router.beforeEach( async (to, from, next) => {
    const { data } = await supabase.auth.getSession();
    const isAuthenticated = !!data.session;
    
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/auth/login')
    } else {
        next();
    }
});

export default router;
