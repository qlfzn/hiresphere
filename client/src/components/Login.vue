<script setup>
import { ref } from 'vue';
import { supabase } from '@/lib/supabaseClient';
import router from '@/router';

const email = ref('');
const password = ref('');

async function loginWithEmail() {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;

    if (data.user) {
      alert('Login successful!');
      router.push('/home');
    }

  } catch (error) {
    alert(error.message);
  }
};

async function loginWithGoogle() {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) throw error;

    alert('Login with Google successful!');
    router.push('/home');
  } catch (error) {
    alert(error.message);
  }
};
</script>

<template>
  <div class="flex h-screen items-center justify-center bg-gray-100">
    <div class="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Left Side -->
      <div class="w-1/2 p-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">HireSphere</h1>
        <ul class="space-y-4 text-gray-700">
          <li class="flex items-start"><span class="text-blue-500 font-bold mr-2">✔</span> Get started quickly with easy steps.</li>
          <li class="flex items-start"><span class="text-blue-500 font-bold mr-2">✔</span> Native.</li>
          <li class="flex items-start"><span class="text-blue-500 font-bold mr-2">✔</span> Join millions of businesses using Flowbite.</li>
        </ul>
      </div>
      
      <!-- Right Side (Form) -->
      <div class="w-1/2 p-8 bg-gray-50">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Login to your Account</h2>
        
        <form class="space-y-4">
          <div class="flex space-x-4">
            <div class="w-full">
              <label for="email" class="text-sm font-medium text-gray-900">Email</label>
              <input v-model="email" type="email" id="email" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="email@example.com" required>
            </div>
          </div>
          <div>
            <label for="password" class="text-sm font-medium text-gray-900">Password</label>
            <input v-model="password" type="password" id="password" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="••••••••" required>
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg" @click.prevent="loginWithEmail">Login</button>
        </form>
        
        <div class="my-4 text-center text-gray-500">or</div>
        
        <div class="flex space-x-2">
          <button @click.prevent="loginWithGoogle" class="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center">Login with Google</button>
        </div>
        
        <p class="text-sm text-gray-600 mt-4">
          Don't have an account? 
          <a href="#" class="text-blue-500" @click.prevent="$emit('toggle')">Sign up here</a>
        </p>
      </div>
    </div>
  </div>
</template>