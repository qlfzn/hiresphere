<script setup>
import logo from '@/assets/hs-no-text.svg';
import { ref, defineProps } from 'vue'
import { RouterLink } from 'vue-router';

const navTitle = ref("HireSphere");

defineProps({
    hover: {
        type: String,
        default: ""
    }
});

</script>

<template>
  <nav class="bg-[#2B4570] border-b fixed top-0 left-0 right-0 w-full h-20 z-50">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/home">
            <img class="h-10 w-auto" :src="logo" alt="HireSphere" />
            <span class="hidden md:block text-white text-2xl font-bold ml-2">
              {{ navTitle }}
            </span>
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <a
                href="index.html"
                class="text-white hover:bg-[#16235b] hover:text-white rounded-md px-3 py-2"
                >Dashboard</a
              >
              <RouterLink
                to="/projects"
                class="text-white hover:bg-[#16235b] hover:text-white rounded-md px-3 py-2"
                >Project </RouterLink>
              <a
                href="add-job.html"
                class="text-white hover:bg-[#16235b] hover:text-white rounded-md px-3 py-2"
                >Profile</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
