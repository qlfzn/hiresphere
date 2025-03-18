<script setup>
import { ref } from 'vue';
import { supabase } from '@/lib/supabaseClient';
import router from '@/router';

const email = ref('');
const name = ref('');
const role = ref('');
const password = ref('');

async function signUpWithEmail() {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;

    await fetch('https://hiresphere-m3fd.onrender.com/api/users/sync-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id : data.user.id,
        email: data.user.email,
        name: name.value,
        role: role.value,
      }),
    });

    alert('Signup successful! Please check your email to confirm your account.');
    router.push('/home');
  } catch (error) {
    alert(error.message);
  }
};

async function signUpWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        data: {
          name: name.value,
          role: role.value
        }
      },
    });

    if (error) throw error;

    await fetch('https://hiresphere-m3fd.onrender.com/api/sync-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id : data.user.id,
        email: data.user.email,
        name: name.value,
        role: role.value 
      }),
    });

    alert('Signup with Google successful!');
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
          <li class="flex items-start"><span class="text-blue-500 font-bold mr-2">🚀 </span>Get started effortlessly in just a few steps</li>
          <li class="flex items-start"><span class="text-blue-500 font-bold mr-2">💼</span>Designed for seamless hiring and collaboration.</li>
          <li class="flex items-start"><span class="text-blue-500 font-bold mr-2">🌎</span>Join a growing network of top businesses and professionals.</li>
        </ul>
      </div>
      
      <!-- Right Side (Form) -->
      <div class="w-1/2 p-8 bg-gray-50">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Create your Account</h2>
        
        <form class="space-y-4">
          <div class="flex space-x-4">
            <div class="w-full">
              <label for="email" class="text-sm font-medium text-gray-900">Email</label>
              <input v-model="email" type="email" id="email" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="email@example.com" required>
            </div>
          </div>
          <div class="flex space-x-4">
            <div class="w-full">
              <label for="name" class="text-sm font-medium text-gray-900">Name</label>
              <input v-model="name" type="text" id="name" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="Your Name" required>
            </div>
          </div>
          <div>
            <label for="country" class="text-sm font-medium text-gray-900">Role</label>
            <select v-model="role" id="role" class="w-full p-2 border border-gray-300 rounded-lg" required>
              <option>Choose a role</option>
              <option>Client</option>
              <option>Freelancer</option>
            </select>
          </div>
          <div>
            <label for="password" class="text-sm font-medium text-gray-900">Password</label>
            <input v-model="password" type="password" id="password" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="••••••••" required>
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg" @click.prevent="signUpWithEmail">Create an account</button>
        </form>
        
        <div class="my-4 text-center text-gray-500">or</div>
        
        <div class="flex space-x-2">
          <button @click.prevent="signUpWithGoogle" class="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center">Sign up with Google</button>
        </div>
        
        <p class="text-sm text-gray-600 mt-4">
          Already have an account? 
          <a href="#" class="text-blue-500" @click.prevent="$emit('toggle')">Sign in here</a>
        </p>
      </div>
    </div>
  </div>
</template>