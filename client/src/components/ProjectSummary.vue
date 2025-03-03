<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();

const project = ref({
    title: '',
    description: '',
    companyName: '',
    industry: '',
    jobTitle: '',
    skills: '',
    mode: '',
    locationPreferences: ''
});

onMounted(() => {
    // Assign route query parameters to project
    Object.assign(project.value, route.query);
});
</script>

<template>
    <div class="bg-gray-700 p-4 rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-2">Project Summary</h3>
      <h4 class="text-md font-medium">{{ project.title }}</h4>
      <p class="text-gray-400">{{ project.description }}</p>
      <p class="text-gray-400">Company: {{ project.companyName }} ({{ project.industry }})</p>
      <p class="text-gray-400">Job Title: {{ project.jobTitle }}</p>
      <p class="text-gray-400">Skills: {{ project.skills }}</p>
      <p class="text-gray-400">Mode: {{ project.mode }}</p>
      <p class="text-gray-400">Location: {{ project.locationPreferences }}</p>
    </div>
</template>
