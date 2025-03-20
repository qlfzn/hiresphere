<script setup>
import { defineProps, computed, ref } from 'vue';
import { Calendar, Users, ChevronRight, MoreVertical, ExternalLink, MapPin, Laptop, UserSearch } from 'lucide-vue-next';
import router from '@/router';

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

const emit = defineEmits(['match-profiles']);

const formattedDate = computed(() => {
  if (!props.project.due_date) return '';
  
  const date = new Date(props.project.due_date);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
});

const statusClasses = computed(() => {
    if (props.project.is_active) {
        return 'bg-green-100 text-green-800 border-green-200'; 
    } else {
        return 'bg-gray-100 text-gray-800 border-gray-200'; 
    }
});

const workingModeClasses = computed(() => {
    if (!props.project.working_mode) {
        return 'bg-gray-100 text-gray-800 border-gray-200'; 
    } else if (props.project.working_mode.toLowerCase() === 'remote') {
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'; 
    } else if (props.project.working_mode.toLowerCase() === 'hybrid') {
        return 'bg-purple-100 text-purple-800 border-purple-200'; 
    } else if (props.project.working_mode.toLowerCase() === 'on-site') {
        return 'bg-teal-100 text-teal-800 border-teal-200'; 
    } else {
        return 'bg-gray-100 text-gray-800 border-gray-200'; // Not specified
    }
});

const matchProfiles = () => {
  router.push({
    path: `/projects/matches/${props.project.id}`,
  });
};
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
      <div class="mt-1 text-sm text-gray-500">{{ project.clients.company }}</div>
    </div>
    
    <!-- Card Body -->
    <div class="p-5 flex-1">
      <p class="text-gray-600 text-sm line-clamp-3 mb-4">{{ project.description }}</p>
      
      <!-- Location and Working Mode -->
      <div class="mb-4 space-y-3">
        <!-- Location -->
        <div class="flex items-center">
          <MapPin class="w-4 h-4 mr-2 text-gray-400" />
          <span class="text-sm text-gray-700">{{ project.location || 'Not specified' }}</span>
        </div>
        
        <!-- Working Mode -->
        <div class="flex items-center">
          <Laptop class="w-4 h-4 mr-2 text-gray-400" />
          <span :class="['px-2 py-0.5 text-xs font-medium rounded-md border', workingModeClasses]">
            {{ project.working_mode || 'Not specified' }}
          </span>
        </div>
      </div>
      
      <!-- Project Meta -->
      <div class="grid grid-cols-2 gap-3">
        <div class="flex items-center text-sm text-gray-600">
          <Calendar class="w-4 h-4 mr-2 text-gray-400" />
          <span>{{ formattedDate }}</span>
        </div>
      </div>
      
      <!-- Match Button -->
      <button 
        @click="matchProfiles"
        class="w-full mt-4 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium gap-2">
        <UserSearch class="w-4 h-4" />
        Find Matching Profiles
      </button>
    </div>
    
    <!-- Card Footer -->
    <div class="p-5 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
      <span :class="['px-3 py-1 text-xs font-medium rounded-full border', statusClasses]">
        {{ project.is_active ? 'Active' : 'Inactive' }}
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
                {{ project.is_active ? 'Active' : 'Inactive' }}
              </span>
            </div>
            <div class="text-sm text-gray-500 mt-1">{{ project.client }}</div>
          </div>
          <button class="text-gray-400 hover:text-gray-600 md:hidden">
            <MoreVertical class="w-5 h-5" />
          </button>
        </div>
        <p class="text-gray-600 text-sm mt-2 line-clamp-2">{{ project.description }}</p>
        
        <!-- Location and Working Mode for smaller screens -->
        <div class="mt-3 space-y-2 md:hidden">
          <div class="flex items-center">
            <MapPin class="w-4 h-4 mr-2 text-gray-400" />
            <span class="text-sm text-gray-700">{{ project.location || 'Not specified' }}</span>
          </div>
          <div class="flex items-center">
            <Laptop class="w-4 h-4 mr-2 text-gray-400" />
            <span :class="['px-2 py-0.5 text-xs font-medium rounded-md border', workingModeClasses]">
              {{ project.workingMode || 'Not specified' }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Right Column -->
      <div class="flex flex-col sm:flex-row items-center gap-4">
        <!-- Location and Working Mode Badge -->
        <div class="hidden md:flex flex-col gap-2">
          <div class="flex items-center">
            <MapPin class="w-4 h-4 mr-2 text-gray-400" />
            <span class="text-sm text-gray-700">{{ project.location || 'Not specified' }}</span>
          </div>
          <div class="flex items-center">
            <Laptop class="w-4 h-4 mr-2 text-gray-400" />
            <span :class="['px-2 py-0.5 text-xs font-medium rounded-md border', workingModeClasses]">
              {{ project.workingMode || 'Not specified' }}
            </span>
          </div>
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
          <button 
            @click="matchProfiles"
            class="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium gap-1">
            <UserSearch class="w-4 h-4" />
            <span class="hidden sm:inline">Find Matches</span>
          </button>
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