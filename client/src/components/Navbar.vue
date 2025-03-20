<script setup>
import logo from '@/assets/hs-no-text.svg';
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const navTitle = ref("HireSphere");
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
const route = useRoute();

const handleClickOutside = (event) => {
  const nav = document.getElementById('mobile-menu-container');
  if (nav && !nav.contains(event.target) && !event.target.closest('button')) {
    isMobileMenuOpen.value = false;
  }
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial scroll position
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav :class="[
    'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300',
    isScrolled ? 'bg-[#2B4570] shadow-lg h-14' : 'bg-[#2B4570]/95 h-16'
  ]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
      <div class="flex h-full items-center justify-between">
        <!-- Logo & Title -->
        <RouterLink class="flex items-center group" to="/home" aria-label="Home">
          <div class="relative overflow-hidden">
            <img 
              class="h-9 w-auto transition-transform duration-300 transform group-hover:scale-110" 
              :src="logo" 
              alt="HireSphere Logo" 
            />
          </div>
          <span class="hidden md:block text-white text-xl font-bold ml-2 transition-colors duration-300 group-hover:text-[#A5D8FF]">
            {{ navTitle }}
          </span>
        </RouterLink>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-1">
          <RouterLink 
            v-for="(item, index) in [
              { name: 'Dashboard', path: '/' },
              { name: 'Projects', path: '/projects' },
              { name: 'Profile', path: '/profile' }
            ]" 
            :key="index"
            :to="item.path" 
            :class="[
              'text-white px-4 py-2 rounded-md transition-all duration-200 relative font-medium text-sm',
              'hover:bg-white/10 hover:text-[#A5D8FF]',
              route.path === item.path ? 'text-[#A5D8FF] bg-white/10' : ''
            ]"
          >
            {{ item.name }}
            <span 
              v-if="route.path === item.path" 
              class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-[#A5D8FF] rounded-t-full"
            ></span>
          </RouterLink>
          
          <!-- User Avatar -->
          <button class="ml-4 relative group">
            <div class="w-8 h-8 rounded-full bg-[#A5D8FF] text-[#2B4570] flex items-center justify-center font-bold text-sm border-2 border-transparent group-hover:border-white transition-all">
              JS
            </div>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen" 
          class="md:hidden text-white focus:outline-none p-2 rounded-md hover:bg-white/10 transition"
          aria-label="Toggle mobile menu"
          :aria-expanded="isMobileMenuOpen"
        >
          <svg 
            class="w-6 h-6 transition-transform duration-300" 
            :class="{ 'rotate-90': isMobileMenuOpen }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              v-if="!isMobileMenuOpen"
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
            <path 
              v-else
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div 
      id="mobile-menu-container"
      v-if="isMobileMenuOpen" 
      class="md:hidden absolute w-full top-full left-0 bg-[#203655] shadow-lg rounded-b-lg overflow-hidden"
      @click.stop
    >
      <div class="max-h-[70vh] overflow-y-auto py-2">
        <RouterLink 
          v-for="(item, index) in [
            { name: 'Dashboard', path: '/projects' },
            { name: 'Projects', path: '/projects' },
            { name: 'Profile', path: '/profile' }
          ]" 
          :key="index"
          :to="item.path" 
          @click="closeMobileMenu"
          :class="[
            'block px-4 py-3 text-white transition-all duration-200',
            'hover:bg-[#16235b] flex items-center',
            route.path === item.path ? 'bg-[#16235b]/50 border-l-4 border-[#A5D8FF] pl-3' : ''
          ]"
        >
          {{ item.name }}
        </RouterLink>
        
        <!-- Mobile User Profile -->
        <div class="mt-2 pt-2 border-t border-white/10">
          <div class="px-4 py-3 flex items-center">
            <div class="w-8 h-8 rounded-full bg-[#A5D8FF] text-[#2B4570] flex items-center justify-center font-bold text-sm">
              JS
            </div>
            <span class="ml-3 text-white font-medium">John Smith</span>
          </div>
          <button class="w-full text-left px-4 py-3 text-white hover:bg-[#16235b] transition-all duration-200 text-sm">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </nav>
  
  <!-- Spacer to prevent content from being hidden under fixed navbar -->
  <div class="h-16"></div>
</template>