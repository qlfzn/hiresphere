<script setup>
import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Plus, Filter, Search, SortAsc, Grid, List } from 'lucide-vue-next';

const projectData = ref({
  activeProjects: []
});

const searchQuery = ref('');
const selectedView = ref('grid');
const selectedStatus = ref('all');
const sortBy = ref('newest');

const statusOptions = [
  { value: 'all', label: 'All Projects' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'on-hold', label: 'On Hold' }
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'a-z', label: 'A-Z' },
  { value: 'z-a', label: 'Z-A' },
  { value: 'progress', label: 'Progress' }
];

const filteredProjects = computed(() => {
  let projects = projectData.value.activeProjects;


  // Filter by search query
  if (searchQuery.value.trim() !== '') {
    const query = searchQuery.value.toLowerCase();
    projects = projects.filter(project => 
      project.title.toLowerCase().includes(query) || 
      project.description.toLowerCase().includes(query) ||
      project.client.toLowerCase().includes(query)
    );
  }

  // Filter by status
  if (selectedStatus.value !== 'all') {
    projects = projects.filter(project => project.status === selectedStatus.value);
  }

  // Sort projects
  if (sortBy.value === 'newest') {
    projects = [...projects].reverse();
  } else if (sortBy.value === 'oldest') {
    // No change needed if already sorted by oldest
  } else if (sortBy.value === 'a-z') {
    projects = [...projects].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy.value === 'z-a') {
    projects = [...projects].sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortBy.value === 'progress') {
    projects = [...projects].sort((a, b) => b.progress - a.progress);
  }

  return projects;
});


const router = useRouter();

const routeToCreateProject = () => {
  router.push('/projects/create');
};

onMounted(async () => {
    try{
        // Fetch projects from API
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            router.push('/auth/login');
            return;
        }
        const response = await fetch(`https://hiresphere-m3fd.onrender.com/api/projects?user_id=${session.user.id}`, {
            headers: {
                'Authorization': `Bearer ${session.access_token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to load projects');
        };

        const result = await response.json();


        projectData.value.activeProjects = result.data;

    } catch (error) {
        console.error(error);
    }
});
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Navbar -->
    <Navbar />
    
    <!-- Header Section -->
    <section class="bg-gradient-to-r from-[#2b4570] to-indigo-400 text-white py-12">
      <div class="container mx-auto max-w-screen-xl px-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold flex items-center gap-2">
              Your Projects
            </h1>
            <p class="text-blue-100 mt-2">
              Manage and track your active projects here.
            </p>
          </div>
          <button
            class="bg-white text-blue-700 px-6 py-3 rounded-lg shadow-lg hover:bg-blue-50 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700 transition-all flex items-center gap-2 font-medium"
            @click.prevent="routeToCreateProject"
          >
            <Plus class="w-5 h-5" />
            New Project
          </button>
        </div>
      </div>
    </section>
    
    <!-- Filter and Search Controls -->
    <div class="bg-white border-b border-gray-200 shadow-sm">
      <div class="container mx-auto max-w-screen-xl px-6 py-4">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div class="flex items-center gap-4 w-full md:w-auto">
            <!-- Search -->
            <div class="relative flex-1 md:w-64">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search class="h-5 w-5 text-gray-400" />
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search projects..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            
            <!-- Status Filter -->
            <div class="relative w-full md:w-auto">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter class="h-4 w-4 text-gray-400" />
              </div>
              <select
                v-model="selectedStatus"
                class="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div class="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <!-- Sort -->
            <div class="relative flex-1 md:w-48">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SortAsc class="h-4 w-4 text-gray-400" />
              </div>
              <select
                v-model="sortBy"
                class="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <!-- View Toggle -->
            <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button 
                @click="selectedView = 'grid'"
                :class="[
                  'p-2 transition-colors',
                  selectedView === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                ]"
              >
                <Grid class="h-5 w-5" />
              </button>
              <button 
                @click="selectedView = 'list'"
                :class="[
                  'p-2 transition-colors',
                  selectedView === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                ]"
              >
                <List class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Project Grid/List -->
    <div class="container mx-auto max-w-screen-xl px-6 py-8">
      <div v-if="filteredProjects.length > 0" 
           :class="[
             selectedView === 'grid' 
               ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
               : 'grid grid-cols-1 gap-4'
           ]">
        <ProjectCard 
          v-for="project in filteredProjects" 
          :key="project.id" 
          :project="project" 
          :view-mode="selectedView"
        />
      </div>
      
      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center text-center text-gray-500 py-16">
        <div class="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-md">
          <div class="text-blue-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 mx-auto">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">No projects found</h3>
          <p class="text-gray-600 mb-6">
            No projects match your current search or filter criteria. Try adjusting your filters or create a new project.
          </p>
          <button
            class="w-full bg-blue-600 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition flex items-center justify-center gap-2"
            @click.prevent="routeToCreateProject"
          >
            <Plus class="w-5 h-5" />
            Start a New Project
          </button>
        </div>
      </div>
    </div>
  </div>
</template>