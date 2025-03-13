<script setup>
import { defineProps, computed } from 'vue';
import { Calendar, Users, ChevronRight, MoreVertical, ExternalLink } from 'lucide-vue-next';

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  viewMode: {
    type: String,
    default: 'grid'
  }
});

const formattedDate = computed(() => {
  if (!props.project.dueDate) return '';
  
  const date = new Date(props.project.dueDate);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
});

const statusClasses = computed(() => {
  switch(props.project.status.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'completed':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'on-hold':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'delayed':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
});

const progressColorClass = computed(() => {
  const progress = props.project.progress || 0;
  if (progress >= 75) return 'bg-green-500';
  if (progress >= 50) return 'bg-blue-500';
  if (progress >= 25) return 'bg-amber-500';
  return 'bg-red-500';
});
</script>

<template>
  <!-- Grid View Card -->
  <div v-if="viewMode === 'grid'" 
       class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300 flex flex-col">
    <!-- Card Header -->
    <div class="p-5 border-b border-gray-100">
      <div class="flex justify-between items-start">
        <h2 class="text-xl font-semibold text-gray-800 line-clamp-1">{{ project.title }}</h2>
        <button class="text-gray-400 hover:text-gray-600">
          <MoreVertical class="w-5 h-5" />
        </button>
      </div>
      <div class="mt-1 text-sm text-gray-500">{{ project.client }}</div>
    </div>
    
    <!-- Card Body -->
    <div class="p-5 flex-1">
      <p class="text-gray-600 text-sm line-clamp-3 mb-4">{{ project.description }}</p>
      
      <!-- Progress Bar -->
      <div class="mb-4">
        <div class="flex justify-between items-center mb-1">
          <span class="text-sm font-medium text-gray-700">Progress</span>
          <span class="text-sm font-medium text-gray-700">{{ project.progress }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="h-2 rounded-full" 
               :class="progressColorClass"
               :style="{ width: `${project.progress}%` }"></div>
        </div>
      </div>
      
      <!-- Project Meta -->
      <div class="grid grid-cols-2 gap-3">
        <div class="flex items-center text-sm text-gray-600">
          <Calendar class="w-4 h-4 mr-2 text-gray-400" />
          <span>{{ formattedDate }}</span>
        </div>
        <div class="flex items-center text-sm text-gray-600">
          <Users class="w-4 h-4 mr-2 text-gray-400" />
          <span>{{ project.members }} members</span>
        </div>
      </div>
    </div>
    
    <!-- Card Footer -->
    <div class="p-5 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
      <span :class="['px-3 py-1 text-xs font-medium rounded-full border', statusClasses]">
        {{ project.status.charAt(0).toUpperCase() + project.status.slice(1) }}
      </span>
      <button class="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
        View Details
        <ChevronRight class="w-4 h-4 ml-1" />
      </button>
    </div>
  </div>
  
  <!-- List View Card -->
  <div v-else 
       class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 p-4">
    <div class="flex flex-col md:flex-row md:items-center">
      <!-- Left Column -->
      <div class="flex-1 md:pr-6 mb-4 md:mb-0">
        <div class="flex items-start justify-between">
          <div>
            <div class="flex items-center">
              <h2 class="text-lg font-semibold text-gray-800">{{ project.title }}</h2>
              <span :class="['ml-3 px-2.5 py-0.5 text-xs font-medium rounded-full border', statusClasses]">
                {{ project.status.charAt(0).toUpperCase() + project.status.slice(1) }}
              </span>
            </div>
            <div class="text-sm text-gray-500 mt-1">{{ project.client }}</div>
          </div>
          <button class="text-gray-400 hover:text-gray-600 md:hidden">
            <MoreVertical class="w-5 h-5" />
          </button>
        </div>
        <p class="text-gray-600 text-sm mt-2 line-clamp-2">{{ project.description }}</p>
      </div>
      
      <!-- Right Column -->
      <div class="flex flex-col sm:flex-row items-center gap-4">
        <!-- Progress Circle -->
        <div class="relative w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <svg viewBox="0 0 36 36" class="w-16 h-16 absolute">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e6e6e6"
              stroke-width="3"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              :stroke="progressColorClass.replace('bg-', 'text-')"
              stroke-width="3"
              :stroke-dasharray="`${project.progress}, 100`"
              class="progress-circle"
            />
          </svg>
          <span class="text-sm font-semibold">{{ project.progress }}%</span>
        </div>
        
        <!-- Project Meta -->
        <div class="flex flex-col text-sm gap-2">
          <div class="flex items-center text-gray-600">
            <Calendar class="w-4 h-4 mr-2 text-gray-400" />
            <span>{{ formattedDate }}</span>
          </div>
          <div class="flex items-center text-gray-600">
            <Users class="w-4 h-4 mr-2 text-gray-400" />
            <span>{{ project.members }} members</span>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex gap-2 ml-0 md:ml-4">
          <button class="hidden md:block text-gray-400 hover:text-gray-600">
            <MoreVertical class="w-5 h-5" />
          </button>
          <button class="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors text-sm font-medium">
            View
            <ExternalLink class="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-circle {
  transform-origin: center;
  transform: rotate(-90deg);
}
</style>