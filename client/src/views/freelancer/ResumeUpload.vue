<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient';
import router from '@/router';

const resumeFile = ref(null);
const isUploading = ref(false);
const error = ref(null);
const success = ref(false);
const currentResume = ref(null);
const progress = ref(0);

onMounted(async () => {
  try {
    // Get current user
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push('/auth/login');
      return;
    }
    
    // Check if user already has a resume
    const response = await fetch(`http://localhost:5050/api/freelancer/${session.user.id}/resume`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.resume_url) {
        currentResume.value = data;
      }
    }
  } catch (err) {
    error.value = err.message;
  }
});

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      error.value = 'Please upload a PDF file';
      event.target.value = null;
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      error.value = 'File size should not exceed 5MB';
      event.target.value = null;
      return;
    }
    
    resumeFile.value = file;
    error.value = null;
  }
}

async function uploadResume() {
  if (!resumeFile.value) {
    error.value = 'Please select a file to upload';
    return;
  }
  
  isUploading.value = true;
  error.value = null;
  success.value = false;
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push('/auth/login');
      return;
    }
    
    // Create a FormData object
    const formData = new FormData();
    formData.append('resume', resumeFile.value);
    
    // Upload file with progress tracking
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `http://localhost:5050/api/freelancer/${session.user.id}/resume`);
    xhr.setRequestHeader('Authorization', `Bearer ${session.access_token}`);
    
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        progress.value = Math.round((e.loaded / e.total) * 100);
      }
    };
    
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        success.value = true;
        // Redirect after short delay
        setTimeout(() => {
          router.push('/freelancer/dashboard');
        }, 1500);
      } else {
        try {
          const response = JSON.parse(xhr.responseText);
          error.value = response.message || 'Upload failed';
        } catch (e) {
          error.value = 'Upload failed';
        }
      }
      isUploading.value = false;
    };
    
    xhr.onerror = () => {
      error.value = 'Network error during upload';
      isUploading.value = false;
    };
    
    xhr.send(formData);
  } catch (err) {
    error.value = err.message;
    isUploading.value = false;
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Resume Upload</h1>
    
    <div class="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <div v-if="currentResume" class="mb-6 p-4 bg-blue-50 rounded">
        <h3 class="font-medium text-gray-800 mb-2">Current Resume</h3>
        <p class="text-sm text-gray-600 mb-1">Uploaded on: {{ new Date(currentResume.resume_updated_at).toLocaleDateString() }}</p>
        <p class="text-sm text-gray-600">Filename: {{ currentResume.resume_filename }}</p>
      </div>
      
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>
      
      <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        Resume uploaded successfully!
      </div>
      
      <div class="mb-6">
        <label for="resume" class="block text-sm font-medium text-gray-700 mb-1">
          Upload Resume (PDF only, max 5MB)
        </label>
        <input type="file" id="resume" @change="handleFileChange" accept="application/pdf" 
               class="w-full p-2 border border-gray-300 rounded-lg" :disabled="isUploading">
      </div>
      
      <div v-if="isUploading" class="mb-6">
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="bg-blue-600 h-2.5 rounded-full" :style="`width: ${progress}%`"></div>
        </div>
        <p class="text-center mt-2 text-sm text-gray-600">Uploading... {{ progress }}%</p>
      </div>
      
      <div class="flex justify-end space-x-4">
        <button type="button" @click="router.push('/freelancer/dashboard')" 
                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700" :disabled="isUploading">
          Cancel
        </button>
        <button @click="uploadResume" class="px-4 py-2 bg-blue-600 text-white rounded-lg" 
                :disabled="isUploading || !resumeFile">
          <span v-if="isUploading">Uploading...</span>
          <span v-else>{{ currentResume ? 'Update Resume' : 'Upload Resume' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>