<script setup>
import { defineProps } from 'vue';
import { ArrowRight } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

defineProps({
  title: {
    type: String,
    default: "Input Title Here"
  },
  subtitle: {
    type: String,
    default: "Input Subtitle Here"
  }
});

const router = useRouter();

const routeToSignupPage = () => {
  router.push('/auth/signup');
}

const routeToLoginPage = () => {
  router.push('/auth/login');
}
</script>

<template>
  <section class="relative py-20 md:py-32 bg-gradient-to-b from-[#16235b] via-[#2b4570] to-[#6eb7ff]">
    <!-- Background pattern for visual interest -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0 bg-grid-white/[0.2]"></div>
    </div>
    
    <div class="relative container mx-auto px-6">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Logo/branding element -->
        <div class="mb-6 inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
          <span class="mr-2 text-white text-xl">🚀</span>
          <span class="text-white font-semibold">HireSphere</span>
        </div>

        <!-- Animated title -->
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-none tracking-tight text-white mb-6">
          Skip <span class="inline-block bg-[#6eb7ff] text-[#16235b] px-3 py-1 rounded-md transform shadow-lg">the Hassle</span>
          <br class="md:block hidden"> Hire the Best in <span class="underline decoration-[#6eb7ff] decoration-4">no time</span>
        </h1>
        
        <p class="text-lg sm:text-xl text-gray-100 mt-6 max-w-2xl mx-auto leading-relaxed">
          {{ subtitle }}
        </p>
        
        <!-- Call-to-action buttons -->
        <div class="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <!-- Get Started Button with subtle animation -->
          <button 
            class="px-8 py-4 bg-[#6eb7ff] text-[#16235b] font-bold rounded-full
            shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 transform hover:scale-105"
            @click="routeToSignupPage"
          >
            Get Started 
          </button>
          
          <!-- Log in Button -->
          <button 
            class="flex items-center justify-center px-8 py-4 border-2 border-white text-white
            rounded-full hover:bg-white hover:text-[#16235b] transition-all duration-300"
            @click="routeToLoginPage"
          >
            Log in
            <ArrowRight class="ml-2 h-5 w-5" />
          </button>
        </div>
        
      </div>
    </div>

    <!-- Wave divider -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg class="w-full h-16 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.2,140.94Z"></path>
      </svg>
    </div>
  </section>
</template>