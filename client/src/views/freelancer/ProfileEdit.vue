<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient';
import router from '@/router';

const freelancerProfile = ref({
  first_name: '',
  last_name: '',
  title: '',
  bio: '',
  hourly_rate: null,
  skills: [],
  experience_level: '',
  availability: 'full-time',
  location: '',
});

const newSkill = ref('');
const isLoading = ref(true);
const isSaving = ref(false);
const error = ref(null);
const successMessage = ref('');

const experienceLevels = ['Entry-level', 'Intermediate', 'Advanced', 'Expert'];
const availabilityOptions = ['full-time', 'part-time', 'weekends', 'evenings'];

onMounted(async () => {
  try {
    // Get current user
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push('/auth/login');
      return;
    }
    
    // Fetch freelancer data from your API
    const response = await fetch(`https://hiresphere-m3fd.onrender.com/api/freelancers/${session.user.id}`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      // Populate form with existing data
      Object.keys(freelancerProfile.value).forEach(key => {
        if (data[key] !== undefined) {
          freelancerProfile.value[key] = data[key];
        }
      });

    }
    
    isLoading.value = false;
  } catch (err) {
    error.value = err.message;
    isLoading.value = false;
  }
});

function addSkill() {
  if (newSkill.value.trim() && !freelancerProfile.value.skills.includes(newSkill.value.trim())) {
    freelancerProfile.value.skills.push(newSkill.value.trim());
    newSkill.value = '';
  }
}

function removeSkill(skill) {
  freelancerProfile.value.skills = freelancerProfile.value.skills.filter(s => s !== skill);
}

async function saveProfile() {
  isSaving.value = true;
  error.value = null;
  successMessage.value = '';
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push('/auth/login');
      return;
    }
    
    const response = await fetch(`https://hiresphere-m3fd.onrender.com/api/freelancers/${session.user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(freelancerProfile.value)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
    
    successMessage.value = 'Profile saved successfully!';

    console.log(freelancerProfile.value);
    
    // Redirect after short delay
    setTimeout(() => {
      router.push('/freelancer/dashboard');
    }, 1500);
  } catch (err) {
    error.value = err.message;
  } finally {
    isSaving.value = false;
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Edit Freelancer Profile</h1>
    
    <div v-if="isLoading" class="flex justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
    
    <div v-else>
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>
      
      <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        {{ successMessage }}
      </div>
      
      <form @submit.prevent="saveProfile" class="bg-white p-6 rounded-lg shadow-md">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- First Name -->
          <div>
            <label for="first_name" class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
            <input v-model="freelancerProfile.first_name" type="text" id="first_name" 
                  class="w-full p-2 border border-gray-300 rounded-lg" required>
          </div>
          
          <!-- Last Name -->
          <div>
            <label for="last_name" class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
            <input v-model="freelancerProfile.last_name" type="text" id="last_name" 
                  class="w-full p-2 border border-gray-300 rounded-lg" required>
          </div>
        </div>
        
        <!-- Title -->
        <div class="mb-6">
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Professional Title *</label>
          <input v-model="freelancerProfile.title" type="text" id="title" 
                class="w-full p-2 border border-gray-300 rounded-lg" 
                placeholder="e.g. Full Stack Developer, Graphic Designer" required>
        </div>
        
        <!-- Bio -->
        <div class="mb-6">
          <label for="bio" class="block text-sm font-medium text-gray-700 mb-1">Bio *</label>
          <textarea v-model="freelancerProfile.bio" id="bio" rows="4" 
                    class="w-full p-2 border border-gray-300 rounded-lg" required></textarea>
        </div>
        
        <!-- Skills -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Skills *</label>
          <div class="flex mb-2">
            <input v-model="newSkill" type="text" class="flex-grow p-2 border border-gray-300 rounded-l-lg" 
                  placeholder="Add a skill (e.g. JavaScript, Photoshop)">
            <button type="button" @click="addSkill" 
                    class="bg-blue-600 text-white p-2 rounded-r-lg">Add</button>
          </div>
          <div v-if="freelancerProfile.skills.length > 0" class="flex flex-wrap">
            <div v-for="skill in freelancerProfile.skills" :key="skill" 
                class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
              {{ skill }}
              <button type="button" @click="removeSkill(skill)" class="ml-2 text-blue-800">×</button>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- Hourly Rate -->
          <div>
            <label for="hourly_rate" class="block text-sm font-medium text-gray-700 mb-1">Hourly Rate (USD) *</label>
            <input v-model.number="freelancerProfile.hourly_rate" type="number" id="hourly_rate" 
                  class="w-full p-2 border border-gray-300 rounded-lg" min="1" required>
          </div>
          
          <!-- Experience Level -->
          <div>
            <label for="experience_level" class="block text-sm font-medium text-gray-700 mb-1">Experience Level *</label>
            <select v-model="freelancerProfile.experience_level" id="experience_level" 
                    class="w-full p-2 border border-gray-300 rounded-lg" required>
              <option value="" disabled>Select experience level</option>
              <option v-for="level in experienceLevels" :key="level" :value="level">{{ level }}</option>
            </select>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- Availability -->
          <div>
            <label for="availability" class="block text-sm font-medium text-gray-700 mb-1">Availability *</label>
            <select v-model="freelancerProfile.availability" id="availability" 
                    class="w-full p-2 border border-gray-300 rounded-lg" required>
              <option v-for="option in availabilityOptions" :key="option" :value="option">
                {{ option.charAt(0).toUpperCase() + option.slice(1) }}
              </option>
            </select>
          </div>
          
          <!-- Location -->
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input v-model="freelancerProfile.location" type="text" id="location" 
                  class="w-full p-2 border border-gray-300 rounded-lg" 
                  placeholder="City, Country">
          </div>
        </div>
        
        <div class="flex justify-end space-x-4">
          <button type="button" @click="router.push('/freelancer/dashboard')" 
                  class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg" :disabled="isSaving">
            <span v-if="isSaving">Saving...</span>
            <span v-else>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>