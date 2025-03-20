<script setup>
import { supabase } from '@/lib/supabaseClient';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import MatchCard from '@/components/MatchCard.vue';
import Navbar from '@/components/Navbar.vue';
import ProjectSummary from '@/components/ProjectSummary.vue';
import { ArrowLeft, Filter, SlidersHorizontal, Download } from 'lucide-vue-next';
import router from '@/router';

const route = useRoute();
const project = ref({});
const matches = ref([]);
const freelancers = ref([]);
const filters = ref({
  minRating: 4,
  maxRate: 100,
  skills: [],
  availability: "any"
});
const isLoading = ref(true);
const selectedFilters = ref([]);
const showFilters = ref(false);

const toggleCard = (index) => {
  matches.value[index].isOpen = !matches.value[index].isOpen;
};

const contactFreelancer = (matchId) => {
  console.log('Contacting freelancer:', matchId);
};

const downloadMatches = () => {
  console.log('Downloading matches as CSV or PDF');
};

const fetchProjectDetails = async () => {
  const { data: { session } } = await supabase.auth.getSession();

  try {
    const response = await fetch(`http://localhost:5050/api/projects/${route.params.id}?user_id=${session.user.id}`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }

    const result = await response.json();
    console.log("Data:", result);
    project.value = result.data;
    console.log('Project details:', project.value);

    fetchMatches();
  } catch (error) {
    console.error('Error fetching project:', error.message);  
  }
};

const fetchMatches = async () => {
  if (!project.value.id) {
    console.warn('Project ID not available yet, waiting...');
    return;
  }

  console.log('Fetching matches for project:', project.value.id);
  isLoading.value = true;
  try {
    const { data: matchData, error: matchError } = await supabase
      .from('project_matches')
      .select('*')
      .eq('project_id', project.value.id.toString());

    if (matchError) throw matchError;

    if (!matchData || matchData.length === 0) {
      console.log('No matches found for this project');
      isLoading.value = false;
      return;
    }

    const freelancerIds = matchData.map(match => match.freelancer_id);

    const { data: freelancerData, error: freelancerError } = await supabase
      .from('freelancers')
      .select('*, users(name)')
      .in('id', freelancerIds);

    if (freelancerError) throw freelancerError;

    freelancers.value = freelancerData;

    const combinedMatches = matchData.map(match => {
      const freelancer = freelancerData.find(f => f.id === match.freelancer_id);
      return {
        ...match,
        name: freelancer.users?.name,
        role: freelancer.title,
        skills: freelancer.skills,
        isOpen: false
      };
    });

    matches.value = [...combinedMatches];

  } catch (error) {
    console.error('Error fetching project matches:', error.message);
  } finally {
    isLoading.value = false;
  }
};

watch(() => project.value.id, (newId) => {
  if (newId) {
    console.log("Project ID is now available, fetching matches...");
    fetchMatches();
  }
});

onMounted(() => {
  fetchProjectDetails();
});

function navigateBackToProjects() {
  router.push('/projects');
}
</script>


<template>
  <Navbar />
  
  <div class="container mx-auto p-4 md:p-6 mt-16 md:mt-20">
    <!-- Back button and page title -->
    <div class="flex justify-between items-center mb-6">
      <button @click="navigateBackToProjects" class="flex items-center text-gray-600 hover:text-gray-800">
        <ArrowLeft class="w-5 h-5 mr-2" />
        Back to Projects
      </button>
      <h1 class="text-2xl font-bold text-gray-800">Profile Matches</h1>
      <button 
        @click="downloadMatches"
        class="flex items-center text-gray-600 hover:text-gray-800">
        <Download class="w-5 h-5 mr-2" />
        <span class="hidden sm:inline">Export</span>
      </button>
    </div>
    
    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
    
    <div v-else>
      <!-- Main content -->
      <div class="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4 md:p-6 rounded-xl shadow-md">
        <div class="flex flex-wrap items-center justify-between mb-6">
          <h2 class="text-xl font-semibold">Best Profile Matches</h2>
          
          <!-- Filter toggle button -->
          <button 
            @click="toggleFilters"
            class="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition-colors">
            <SlidersHorizontal class="w-4 h-4 mr-2" />
            Filter Results
          </button>
        </div>
        
        <!-- Filters panel (collapsible) -->
        <div v-if="showFilters" class="bg-gray-700 p-4 rounded-lg mb-6 animate-fadeIn">
          <h3 class="font-medium mb-3">Refine Results</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm mb-1">Minimum Rating</label>
              <select v-model="filters.minRating" class="w-full bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-600">
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
            <div>
              <label class="block text-sm mb-1">Max Hourly Rate</label>
              <select v-model="filters.maxRate" class="w-full bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-600">
                <option value="50">Up to $50/hr</option>
                <option value="75">Up to $75/hr</option>
                <option value="100">Up to $100/hr</option>
                <option value="150">Up to $150/hr</option>
              </select>
            </div>
            <div>
              <label class="block text-sm mb-1">Availability</label>
              <select v-model="filters.availability" class="w-full bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-600">
                <option value="any">Any</option>
                <option value="immediate">Immediate</option>
                <option value="1week">Within 1 week</option>
                <option value="2weeks">Within 2 weeks</option>
              </select>
            </div>
            <div class="flex items-end">
              <button 
                @click="applyFilters"
                class="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
          
          <!-- Active filters -->
          <div v-if="selectedFilters.length > 0" class="mt-4 flex flex-wrap items-center gap-2">
            <span class="text-sm text-gray-300">Active filters:</span>
            <div 
              v-for="(filter, index) in selectedFilters" 
              :key="index"
              class="flex items-center bg-gray-600 px-3 py-1 rounded-full text-sm">
              {{ filter.type }}: {{ filter.value }}
              <button 
                @click="removeFilter(index)"
                class="ml-2 text-gray-400 hover:text-white">
                &times;
              </button>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Project Summary -->
          <ProjectSummary :project="project" class="lg:sticky lg:top-24 self-start" />
          
          <!-- Freelance Matches -->
          <div class="lg:col-span-2 space-y-4">
            
            <MatchCard
              v-for="(match, index) in matches"
              :key="match.id"
              :match="match"
              :isOpen="match.isOpen"
              @toggle="toggleCard(index)"
              @contact="contactFreelancer(match.id)"
            />
            
            <!-- Empty state if no matches found after filtering -->
            <div v-if="matches.length === 0" class="bg-gray-700 rounded-lg p-6 text-center">
              <p class="text-lg font-medium mb-2">No matches found</p>
              <p class="text-gray-300">Try adjusting your filters to see more results</p>
              <button 
                @click="selectedFilters = []"
                class="mt-4 bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg transition-colors">
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>