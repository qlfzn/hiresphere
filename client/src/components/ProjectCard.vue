<script setup>
import { defineProps } from 'vue';

defineProps({
    project: Object,
});
</script>

<template>
    <div class="group p-4 border rounded-lg shadow-sm transition 
                bg-white hover:bg-[#2B4570] hover:shadow-lg">
        <h2 class="text-xl group-hover:text-white font-semibold">{{ project.title }}</h2>
        <p class="text-gray-700 group-hover:text-gray-200">{{ project.description }}</p>
        <p class="text-sm text-green-600 font-medium">Status: {{ project.status }}</p>
    </div>
</template>