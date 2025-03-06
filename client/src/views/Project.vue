<script setup>
import Navbar from '@/components/Navbar.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const projectData = ref({
    activeProjects: [
        {id: 123, title: "Project ABC", description: "project description is put here", status: "active"},
        {id: 124, title: "Project xyz", description: "project description is put here", status: "active"},
        {id: 125, title: "Project 123", description: "project description is put here", status: "active"},
    ] 
});

const router = useRouter();

const routeToCreateProject = () => {
    router.push('/projects/create');
};
</script>

<template>
    <div class="bg-stone-100 min-h-screen pt-16">
        <!-- Navbar -->
        <Navbar />

        <!-- Header Section -->
        <section class="bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] text-[#16235b] py-8">
            <div class="container mx-auto max-w-screen-xl px-6">
                <div class="flex justify-between items-center gap-6">
                    <div>
                        <h1 class="text-4xl font-bold flex items-center gap-2">
                            📌 Your Projects
                        </h1>
                        <p class="text-lg text-gray-700">
                            Manage and track your active projects here.
                        </p>
                    </div>
                    <button
                        class="bg-[#16235b] text-white px-6 py-3 rounded-md shadow-lg hover:bg-[#2b4570] focus:ring-2 focus:ring-blue-400 transition"
                        @click.prevent="routeToCreateProject"
                    >
                        New Project
                    </button>
                </div>
            </div>
        </section>

        <!-- Project Grid (Vertical Cards) -->
        <div class="container mx-auto max-w-screen-lg px-6 py-10">
            <div v-if="projectData.activeProjects.length > 0" class="grid grid-cols-1 gap-6">
                <ProjectCard v-for="project in projectData.activeProjects" :key="project.id" :project="project" />
            </div>

            <!-- Empty State -->
            <div v-else class="flex flex-col items-center justify-center text-center text-gray-500 mt-20">
                <p class="text-lg">No active projects at the moment.</p>
                <button 
                    class="mt-4 bg-[#16235b] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#2b4570] transition"
                    @click.prevent="routeToCreateProject"
                >
                    Start a New Project 🚀
                </button>
            </div>
        </div>
    </div>
</template>
