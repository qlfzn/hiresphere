<script setup>
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';
import { Pin } from 'lucide-vue-next';
import { SearchCode } from 'lucide-vue-next';
import { Waypoints } from 'lucide-vue-next';
import { Handshake } from 'lucide-vue-next';

const steps = [
  {icon: Pin, title: "Post a job", description: "Clients list projects with clear requirements."},
  {icon: SearchCode, title: "AI Talent Matching", description: "Our AI suggests the best freelancers for the job"},
  {icon: Waypoints, title: "Collaboration", description: "Hire, communicate, and track progress smoothly."},
  {icon: Handshake, title: "Deliver & Get Paid", description:"Secure payments after successful project completion."}
];
</script>

<template>
  <div class="bg-stone-100 min-h-screen">
    <Navbar />
    
    <Hero 
      headline="Hire Faster with Us!" 
      subheader="Expedite project success with our AI-driven profile matching to find the right talents for your project." 
    />

    <!-- Steps Section -->
    <section class="py-8">
      <div class="container mx-auto px-4 text-center">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div 
            v-for="(step, index) in steps" 
            :key="index" 
            class="relative bg-white rounded-lg shadow-lg p-6 overflow-hidden text-center"
          >
            <!-- Static Color Bar -->
            <div class="absolute top-0 left-0 w-full h-1 bg-[#2b4570]"></div>

            <h3 class="text-xl font-bold text-gray-800 mt-4">
              <component :is="step.icon" class="inline-block w-8 h-8 text-[#6eb7ff]"/>
            </h3>
            <h3 class="text-xl font-semibold text-[#16235b] mt-3">Step {{ index + 1 }}: {{ step.title }}</h3>
            <p class="text-gray-500 text-md mt-2 mx-auto">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>