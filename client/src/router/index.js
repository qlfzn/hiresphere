import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Project from "@/views/Project.vue";
import CreateProject from "@/views/CreateProject.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/projects',
            name: 'projects',
            component: Project 
        },
        {
            path: '/create-project',
            name: 'create-project',
            component: CreateProject 
        }
    ]
});

export default router;
