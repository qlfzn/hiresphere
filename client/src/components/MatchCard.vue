<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    match: {
        type: Object,
        required: true
    },
    isOpen: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['toggle']);
</script>

<template>
  <div class="bg-gray-700 p-4 rounded-lg shadow-md">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <img :src="match.image" alt="Profile" class="w-12 h-12 rounded-full border-2 border-gray-500">
        <div>
          <p class="text-lg font-semibold">{{ match.name }}</p>
          <p class="text-gray-400 text-sm">{{ match.role }}</p>
        </div>
      </div>
      <button 
        class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        @click="$emit('toggle')"
      >
        {{ isOpen ? 'Collapse' : 'Expand' }}
      </button>
    </div>

    <div v-if="isOpen" class="mt-4">
      <p class="text-gray-300">
        <!-- Add more details here, e.g., skills, experience, etc. -->
        More details about {{ match.name }}...
      </p>
    </div>
  </div>
</template>
