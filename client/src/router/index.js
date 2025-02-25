import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Project from "@/views/Project.vue";
import CreateProject from "@/views/CreateProject.vue";
import LandingPage from "@/views/LandingPage.vue";
import Auth from "@/views/Auth.vue";
import ProfileMatch from "@/views/ProfileMatch.vue";

const routes = [
    {
        path: '/',
        name: 'landing',
        component: LandingPage,
        meta: { requiresAuth: false }
    },
    {
        path: '/auth',
        name: 'auth',
        component: Auth,
        meta: { requiresAuth: false }
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: { requiresAuth: false }
    },
    {
        path: '/projects',
        name: 'projectView',
        component: Project,
    },
    {
        path: '/projects/create',
        name: 'createProject',
        component: CreateProject,
        meta: { requiresAuth: false }
    },
    {
        path: '/projects/:id',
        name: 'projectDetails',
        component: Project,
        meta: { requiresAuth: false }
    },
    {
        path: '/projects/:id/matches',
        name: 'profileMatch',
        component: ProfileMatch,
        meta: { requiresAuth: false }
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
// router.beforeEach((to, from, next) => {
//     const isAuthenticated = localStorage.getItem("token"); // Replace with actual auth logic

//     if (to.meta.requiresAuth && !isAuthenticated) {
//         next('/auth'); // Redirect to login if not authenticated
//     } else {
//         next();
//     }
// });

export default router;
