<script setup>
import { ref, watch, computed } from 'vue';
import { Building, Briefcase, Tags, Laptop, MapPin } from 'lucide-vue-next';

const props = defineProps({
  project: {
    type: Object,
    default: () => ({})
  }
});

const projectData = ref({});

console.log('Project data:', props.project.skills_required);


const formattedSkills = computed(() => {
  if (!props.project.skills_required) return [];
  return typeof props.project.skills_required === 'string' 
    ? props.project.skills_required.split(',').map(skill => skill.trim())
    : Array.isArray(props.project.skills_required) 
      ? props.project.skills_required 
      : [];
});

console.log("Company:", props.project.clients);
</script>

<template>
  <div class="bg-gray-700 p-5 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-3 border-b border-gray-600 pb-2">Project Summary</h3>
    
    <h4 class="text-xl font-medium mb-2 text-white">{{ props.project.title }}</h4>
    
    <div class="mb-4">
      <p class="text-gray-300 mb-3 leading-relaxed">{{ props.project.description }}</p>
    </div>
    
    <!-- Company and Industry -->
    <div class="flex items-start mb-3">
      <Building class="w-5 h-5 mr-3 text-gray-400 mt-0.5 flex-shrink-0" />
      <div>
        <h5 class="text-sm font-medium text-white">Company</h5>
        <p class="text-gray-300">
          {{ props.project.clients?.company || 'Not specified' }}
          <span v-if="props.project.industry" class="text-gray-400">
            ({{ props.project.industry }})
          </span>
        </p>
      </div>
    </div>
    
    <!-- Job Title -->
    <div class="flex items-start mb-3">
      <Briefcase class="w-5 h-5 mr-3 text-gray-400 mt-0.5 flex-shrink-0" />
      <div>
        <h5 class="text-sm font-medium text-white">Position</h5>
        <p class="text-gray-300">{{ props.project.job_title || 'Not specified' }}</p>
      </div>
    </div>
    
    <!-- Skills -->
    <div class="flex items-start mb-3">
      <Tags class="w-5 h-5 mr-3 text-gray-400 mt-0.5 flex-shrink-0" />
      <div>
        <h5 class="text-sm font-medium text-white">Skills Required</h5>
        <div v-if="formattedSkills.length > 0" class="flex flex-wrap gap-2 mt-1">
          <span 
            v-for="skill in formattedSkills" 
            :key="skill"
            class="bg-gray-600 text-gray-200 px-2 py-1 rounded-md text-xs">
            {{ skill }}
          </span>
        </div>
        <p v-else class="text-gray-300">No specific skills listed</p>
      </div>
    </div>
    
    <!-- Working Mode -->
    <div class="flex items-start mb-3">
      <Laptop class="w-5 h-5 mr-3 text-gray-400 mt-0.5 flex-shrink-0" />
      <div>
        <h5 class="text-sm font-medium text-white">Working Mode</h5>
        <p class="text-gray-300">{{ props.project.working_mode || 'Not specified' }}</p>
      </div>
    </div>
    
    <!-- Location -->
    <div class="flex items-start">
      <MapPin class="w-5 h-5 mr-3 text-gray-400 mt-0.5 flex-shrink-0" />
      <div>
        <h5 class="text-sm font-medium text-white">Location</h5>
        <p class="text-gray-300">{{ props.project.location|| 'Not specified' }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.leading-relaxed {
  line-height: 1.6;
}
</style>