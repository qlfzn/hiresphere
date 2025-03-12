<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient';
import router from '@/router';

const freelancerProfile = ref(null);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    // Get current user
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push('/auth/login');
      return;
    }
    
    // Fetch freelancer data from your API
    const response = await fetch(`http://localhost:5050/api/freelancers/${session.user.id}`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to load freelancer profile');
    }
    
    freelancerProfile.value = await response.json();
    isLoading.value = false;
  } catch (err) {
    error.value = err.message;
    isLoading.value = false;
  }
});

function navigateToEditProfile() {
  router.push('/freelancer/profile/edit');
}

function navigateToResumeUpload() {
  router.push('/freelancer/resume/upload');
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Freelancer Dashboard</h1>
    
    <div v-if="isLoading" class="flex justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Profile Summary Card -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Profile Summary</h2>
        <div v-if="freelancerProfile.profile_complete" class="mb-4">
          <div class="flex items-center mb-2">
            <span class="font-medium w-1/3">Name:</span>
            <span>{{ freelancerProfile.first_name }} {{ freelancerProfile.last_name }}</span>
          </div>
          <div class="flex items-center mb-2">
            <span class="font-medium w-1/3">Title:</span>
            <span>{{ freelancerProfile.title || 'Not set' }}</span>
          </div>
          <div class="flex items-center mb-2">
            <span class="font-medium w-1/3">Skills:</span>
            <div v-if="freelancerProfile.skills && freelancerProfile.skills.length">
              <span v-for="skill in freelancerProfile.skills" :key="skill" 
                    class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                {{ skill }}
              </span>
            </div>
            <span v-else>Not set</span>
          </div>
        </div>
        <div v-else class="text-amber-600 mb-4">
          Please complete your profile to start getting matched with projects.
        </div>
        <button @click="navigateToEditProfile" 
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg">
          {{ freelancerProfile.profile_complete ? 'Edit Profile' : 'Complete Profile' }}
        </button>
      </div>
      
      <!-- Resume Card -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Resume</h2>
        <div v-if="freelancerProfile.resume_url" class="mb-4">
          <p class="text-green-600 mb-2">✓ Resume uploaded</p>
          <p class="text-sm text-gray-500">
            Last updated: {{ new Date(freelancerProfile.resume_updated_at).toLocaleDateString() }}
          </p>
        </div>
        <div v-else class="text-amber-600 mb-4">
          Upload your resume to improve matching and visibility to clients.
        </div>
        <button @click="navigateToResumeUpload" 
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg">
          {{ freelancerProfile.resume_url ? 'Update Resume' : 'Upload Resume' }}
        </button>
      </div>
      
      <!-- Project Matches Card -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Project Matches</h2>
        <div v-if="freelancerProfile.matches && freelancerProfile.matches.length" class="mb-4">
          <p>You have {{ freelancerProfile.matches.length }} potential project matches.</p>
        </div>
        <div v-else class="text-gray-500 mb-4">
          No project matches yet. Complete your profile to improve matching.
        </div>
        <button @click="router.push('/freelancer/matches')" 
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg">
          View Matches
        </button>
      </div>
    </div>
  </div>
</template>