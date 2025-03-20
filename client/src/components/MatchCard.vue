<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { User, Mail, Phone } from 'lucide-vue-next';

const props = defineProps({
  match: {
    type: Object,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['toggle', 'contact']);

// Parse the skills string into an array of skills
const skillsArray = computed(() => {
  try {
    return JSON.parse(props.match.skills);
  } catch (e) {
    // Handle the case where skills might not be a valid JSON string
    return props.match.skills?.split(',') || [];
  }
});

// Contact handling functions
const handleEmailContact = () => {
  // You can replace this with actual logic to contact via email
  const email = props.match.email || 'contact@example.com';
  window.location.href = `mailto:${email}`;
};

const handlePhoneContact = () => {
  // You can replace this with actual logic to contact via phone
  const phone = props.match.phone || '+1234567890';
  window.location.href = `tel:${phone}`;
};
</script>

<template>
  <div class="bg-gray-700 p-4 rounded-lg shadow-md">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <User class="w-8 h-8 text-white" />
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
      <p class="text-gray-300 mb-3">{{ match.location }}</p>
      
      <div class="skills-container mb-4">
        <p class="text-gray-200 font-semibold mb-2">Skills:</p>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="(skill, index) in skillsArray" 
            :key="index"
            class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
          >
            {{ skill }}
          </span>
        </div>
      </div>
      
      <!-- Contact section -->
      <div class="mt-5 border-t border-gray-600 pt-4">
        <p class="text-gray-200 font-semibold mb-3">Contact {{ match.name.split(' ')[0] }}:</p>
        <div class="flex gap-3">
          <button
            @click="handleEmailContact"
            class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Mail class="w-4 h-4" />
            Email
          </button>
          <button
            @click="handlePhoneContact"
            class="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Phone class="w-4 h-4" />
            Call
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skills-container {
  margin-top: 8px;
}
</style>