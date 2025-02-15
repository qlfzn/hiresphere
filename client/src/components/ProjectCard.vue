<script setup>
import { defineProps } from 'vue';

defineProps({
    project: Object,
});
</script>

<template>
    <div class="group flex justify-between items-center p-4 border rounded-lg shadow-sm transition 
                bg-white hover:bg-[#2B4570] hover:shadow-lg">
        <!-- Left Section: Title & Description -->
        <div>
            <h2 class="text-xl font-semibold text-gray-900 group-hover:text-white">
                {{ project.title }}
            </h2>
            <p class="text-gray-600 group-hover:text-gray-300">
                {{ project.description }}
            </p>
        </div>

        <!-- Right Section: Status -->
        <p class="text-sm font-medium px-3 py-1 rounded-md"
           :class="{
               'text-green-600 text-bold': project.status === 'active',
               'text-gray-600': project.status === 'Inactive',
               'text-red-600': project.status === 'Archived'
           }">
            {{ project.status }}
        </p>
    </div>
</template>