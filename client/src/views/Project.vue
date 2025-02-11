<script setup>
import Navbar from '@/components/Navbar.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import { ref } from 'vue';

const projectData = ref({
    activeProjects: [
        {id: 123, title: "Project ABC", description: "project description is put here", status: "active"},
        {id: 124, title: "Project xyz", description: "project description is put here", status: "active"},
        {id: 125, title: "Project 123", description: "project description is put here", status: "active"},
    ] 
});
</script>

<template>
    <section>
        <Navbar />
    </section>
    <div class="container mx-auto max-w-screen-lg p-6">
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-bold">Projects</h1>
                <p class="text-lg text-gray-600">List of current active projects</p>
            </div>
            <button class="mr-2 bg-white text-black px-4 py-2 rounded-md shadow-lg outline outline-black
                           hover:bg-[#16235b] hover:text-white focus:ring-2 focus:ring-blue-400 
                           active:bg-blue-800 transition">
               New Project 
            </button>
        </div>

        <div class="mt-6 space-y-4">
            <ProjectCard v-for="project in projectData.activeProjects" :key="project.id" :project="project" />
            <div v-if="projectData.activeProjects.length === 0" class="text-center text-gray-500 m-20">
                No active project at the moment.
            </div>
        </div>
    </div>
</template>