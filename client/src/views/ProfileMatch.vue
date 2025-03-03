<script setup>
import { ref } from 'vue';
import MatchCard from '@/components/MatchCard.vue';
import Navbar from '@/components/Navbar.vue';
import ProjectSummary from '@/components/ProjectSummary.vue';

const project = ref({
  title: "AI-powered Talent Matching System",
  description: "This project aims to leverage AI algorithms to match clients with the best freelance talent."
});

const matches = ref([
  { name: "John Doe", role: "Best Overall", image: "https://via.placeholder.com/50", rating: 5, isOpen: false },
  { name: "Jane Smith", role: "Best Rate", image: "https://via.placeholder.com/50", rating: 4.5, isOpen: false },
  { name: "Alex Johnson", role: "Best Availability", image: "https://via.placeholder.com/50", rating: 4, isOpen: false }
]);

const toggleCard = (index) => {
  matches.value[index].isOpen = !matches.value[index].isOpen;
};
</script>

<template>
    <Navbar />
    <div class="container mx-auto p-6 mt-20">
      <div class="bg-gray-800 text-white p-6 rounded-xl shadow-md">
        <h2 class="text-xl font-semibold mb-4">Best Profile Matches</h2>
        
        <div class="grid grid-cols-3 gap-6">
          <!-- Project Summary -->
          <ProjectSummary :project="project" />
          
          <!-- Freelance Matches -->
          <div class="col-span-2 space-y-4">
            <MatchCard 
              v-for="(match, index) in matches" 
              :key="index" 
              :match="match"
              :isOpen="match.isOpen"
              @toggle="toggleCard(index)"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
