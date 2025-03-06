<script setup>
import logo from '@/assets/hs-no-text.svg';
import { ref } from 'vue'
import { RouterLink } from 'vue-router';

const navTitle = ref("HireSphere");
const isMobileMenuOpen = ref(false);
</script>

<template>
  <nav class="bg-[#2B4570] fixed top-0 left-0 right-0 w-full h-16 z-50 shadow-md">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo & Title -->
        <RouterLink class="flex items-center" to="/home">
          <img class="h-10 w-auto" :src="logo" alt="HireSphere" />
          <span class="hidden md:block text-white text-2xl font-bold ml-2">
            {{ navTitle }}
          </span>
        </RouterLink>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-4">
          <RouterLink to="/" class="text-white hover:bg-[#16235b] rounded-md px-4 py-2 transition">
            Dashboard
          </RouterLink>
          <RouterLink to="/projects" class="text-white hover:bg-[#16235b] rounded-md px-4 py-2 transition">
            Project
          </RouterLink>
          <RouterLink to="/profile" class="text-white hover:bg-[#16235b] rounded-md px-4 py-2 transition">
            Profile
          </RouterLink>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden text-white focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-[#2B4570] absolute w-full top-16 left-0 shadow-lg">
      <RouterLink to="/" class="block px-4 py-3 text-white hover:bg-[#16235b] transition">Dashboard</RouterLink>
      <RouterLink to="/projects" class="block px-4 py-3 text-white hover:bg-[#16235b] transition">Project</RouterLink>
      <RouterLink to="/profile" class="block px-4 py-3 text-white hover:bg-[#16235b] transition">Profile</RouterLink>
    </div>
  </nav>
</template>
