<script setup>
import { CheckCircle } from 'lucide-vue-next';
import router from '@/router';

const features = [
  {
    title: "AI-Powered Talent Matching",
    description: "Find the perfect fit in seconds with our smart AI matching system that considers skills, culture fit, and growth potential.",
    icon: "🧠",
    benefits: ["70% faster candidate sourcing", "92% better skill alignment", "Reduces unconscious bias"]
  },
  {
    title: "Seamless Hiring Process",
    description: "Reduce time-to-hire by 50% with our all-in-one recruitment tools designed for modern teams.",
    icon: "⚡",
    benefits: ["Automated interview scheduling", "Collaborative hiring tools", "Integrated offer management"]
  },
  {
    title: "Smart Insights & Analytics",
    description: "Make data-driven hiring decisions with real-time analytics that help you optimize your talent acquisition.",
    icon: "📊",
    benefits: ["Custom recruitment dashboards", "Predictive hiring metrics", "ROI tracking"]
  },
];

const routeToSignupPage = () => {
  router.push('/auth/signup');
}
</script>

<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-6 max-w-6xl">
      <div class="text-center mb-16">
        <span class="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">Features</span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose HireSphere?</h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">Unlock the future of hiring with our intelligent platform designed for modern recruitment teams.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-8 transition-all duration-300 hover:shadow-xl hover:border-blue-200"
        >
          <!-- Feature icon with gradient background -->
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#16235b] to-[#6eb7ff] text-white mb-6">
            <span class="text-3xl">{{ feature.icon }}</span>
          </div>
          
          <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#2b4570]">{{ feature.title }}</h3>
          <p class="text-gray-600 mb-6">{{ feature.description }}</p>
          
          <!-- Feature benefits list -->
          <ul class="space-y-2">
            <li 
              v-for="benefit in feature.benefits" 
              :key="benefit"
              class="flex items-start"
            >
              <CheckCircle class="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span class="text-sm text-gray-700">{{ benefit }}</span>
            </li>
          </ul>
          
          <!-- Visual accent element -->
          <div class="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>
      
      <!-- Additional feature highlight -->
      <div class="mt-16 p-8 bg-gradient-to-r from-[#16235b] to-[#2b4570] rounded-2xl text-white">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h3 class="text-2xl font-bold mb-3">Ready to transform your hiring process?</h3>
            <p class="text-blue-100">HireSphere's AI-powered platform helps you find better candidates in less time, with features designed for modern recruitment teams.</p>
          </div>
          <div class="md:w-1/3 flex justify-center">
            <button @click="routeToSignupPage" class="bg-white text-[#16235b] px-6 py-3 rounded-full font-bold hover:bg-blue-100 transition-colors">
              See it in action
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>