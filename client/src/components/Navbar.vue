<script setup>
import logo from '@/assets/logo.svg';
import { ref, defineProps } from 'vue'

const navTitle = ref("HireSphere");

const navigation = [
  { name: 'dashboard', display: 'Dashboard', href: '#' },
  { name: 'project', display: 'Project', href: '#' },
  { name: 'profile', display: 'Profile', href: '#' }
]

defineProps({
    hover: {
        type: String,
        default: ""
    }
})

</script>

<template>
    <nav class="bg-[#2B4570] border-b ">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="flex h-20 items-center justify-between">
          <div
            class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            <!-- Logo -->
            <a class="flex flex-shrink-0 items-center mr-4" href="index.html">
              <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
              <span class="hidden md:block text-white text-2xl font-bold ml-2"
                >{{ navTitle }}</span
              >
            </a>
            <div class="md:ml-auto">
              <div class="flex space-x-2">
                <a
                  href="index.html"
                  class="text-white hover:bg-[#16235b] hover:text-white rounded-md px-3 py-2"
                  >Dashboard</a
                >
                <a
                  href="jobs.html"
                  class="text-white hover:bg-[#16235b] hover:text-white rounded-md px-3 py-2"
                  >Project</a
                >
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