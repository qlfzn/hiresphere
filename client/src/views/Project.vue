<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref } from 'vue';
const projects = ref([
    {id: 123, title: "Project ABC", description: "project description is put here", status: "active"},
    {id: 123, title: "Project xyz", description: "project description is put here", status: "active"},
    {id: 123, title: "Project 123", description: "project description is put here", status: "active"},
])

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
            <button class="mr-6 bg-white text-black px-4 py-2 rounded-md shadow-lg outline-black
                           hover:bg-[#16235b] hover:text-white focus:ring-2 focus:ring-blue-400 
                           active:bg-blue-800 transition">
               New Project 
            </button>
        </div>

        <div class="mt-6 space-y-4">
            <div v-for="project in projects" :key="project.id"
                 class="group p-4 border rounded-lg shadow-sm transition 
                        bg-white hover:bg-[#2B4570] hover:shadow-lg">
                <h2 class="text-xl group-hover:text-white font-semibold">{{ project.title }}</h2>
                <p class="text-gray-700 group-hover:text-gray-200">{{ project.description }}</p>
                <p class="text-sm text-green-600 font-medium">Status: {{ project.status }}</p>
            </div>
        </div>
    </div>
</template>