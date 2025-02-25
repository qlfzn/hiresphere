<script setup>
import { defineProps } from 'vue';

defineProps({
    project: Object,
});
</script>

<template>
    <div class="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 border border-gray-200">
        <h2 class="text-2xl font-semibold text-[#16235b]">{{ project.title }}</h2>
        <p class="text-gray-600">{{ project.description }}</p>
        <div class="flex justify-between items-center mt-auto">
            <span class="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md">
                {{ project.status }}
            </span>
            <button class="bg-[#2b4570] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#6eb7ff] transition">
                View Details
            </button>
        </div>
    </div>
</template>