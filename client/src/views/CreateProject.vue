<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref } from 'vue';
import { X } from 'lucide-vue-next';

const step = ref(1);

const projectDetails = ref({
    title: '',
    companyName: '',
    industry: '',
    description: '',
    startDate: '',
    endDate: ''
});
    
const jobRequirements = ref({
    jobTitle: '',
    skills: [],
    yearOfExperience: '',
});

const preferences = ref({
    mode: '',
    locationPreferences: '',
    minCompensation: '',
    maxCompensation: ''
});

const matchingConfig = ref({
    priorities: '',
    additionalRequirements: '',
    matchingMode: '',
});

const newSkill = ref('');

const isValueFilled = (obj) => {
    return Object.values(obj).every(value => {
        if (typeof value === 'string') return value.trim() !== '';
        if (Array.isArray(value)) return value.length > 0;
        return true; 
    });
};

const isStepValid = () => {
    if (step.value === 1) {
        return isValueFilled(projectDetails.value);
    } else if (step.value === 2) {
        return isValueFilled(jobRequirements.value);
    } else if (step.value === 3) {
        return isValueFilled(preferences.value);
    } else if (step.value === 4) {
        return isValueFilled(matchingConfig.value);
    }

};

const handleContinue = () => {
    if (isStepValid()) {
        step.value++;
    } else {
        alert("Please fill all required fields!");
    }
};

const addSkill = () => {
    if (newSkill.value.trim !== '') {
        jobRequirements.value.skills.push(newSkill.value.trim());
        newSkill.value = '';
    } 
};

const removeSkill = (index) => {
    jobRequirements.value.skills.splice(index, 1);
}
const handleModeChange = (event) => {
    preferences.mode.value = event.target.value;
}

</script>


<template>
    <section>
        <Navbar />
    </section>
    
    <div class="flex h-screen">
        <!-- Sidebar Navigation -->
        <aside class="w-64 bg-gray-50 p-6 border-r">
            <h2 class="text-lg font-semibold mb-4 mt-4">Create New Project</h2>
            <nav class="space-y-2">
                <p class="text-gray-900 font-medium">Project Details</p>
                <p class="text-gray-500">Role & Skills Requirements</p>
                <p class="text-gray-500">Job Preferences</p>
                <p class="text-gray-500">Submission</p>
            </nav>
        </aside>

        <!-- 1st Section: Basic Information  -->
        <div v-if="step === 1" class="flex-1 flex flex-col items-start justify-start p-10">
                <h1 class="text-2xl font-bold mb-6">Project Details</h1>
                <input v-model="projectDetails.title" type="text" placeholder="Project Name" 
                        class="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300 mb-4">
                <input v-model="projectDetails.companyName" type="text" placeholder="Company Name" 
                        class="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300 mb-4">
                <input v-model="projectDetails.industry" type="text" placeholder="Industry" 
                        class="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300 mb-4">
                <textarea v-model="projectDetails.description" placeholder="Project Description"
                            class="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300 mb-4"></textarea>
                <div class="flex gap-4 mb-4">
                    <input v-model="projectDetails.startDate" type="date" 
                            class="w-1/2 border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300">
                    <input v-model="projectDetails.endDate" type="date" 
                            class="w-1/2 border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300">
                </div>
                
                <div class="flex justify-between mt-6 w-full">
                    <button class="text-gray-500 hover:text-gray-800 pr-4">Cancel</button>
                    <div>
                        <button @click="handleContinue" class="bg-[#16235b] text-white px-4 py-2 rounded-lg 
                                                        hover:bg-blue-700 transition">Continue</button>
                    </div>
                </div>
        </div>

        <!-- 2nd Section: Requirements -->
        <div v-if="step === 2" class="flex-1 flex flex-col items-start justify-start p-10">
            <h1 class="text-2xl font-bold mb-6"> Roles & Skills Requirements</h1>
            <input v-model="jobRequirements.jobTitle" type="text" placeholder="Job Title"
                    class="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300 mb-4">
            <div class="flex w-full items-center mb-4">
                <input v-model="newSkill" type="text" placeholder="Skills Required (Multiple)" 
                    class="flex-grow border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300 mr-2">
                <button @click.prevent="addSkill" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Add
                </button>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
                <div v-for="(skill, index) in jobRequirements.skills" :key="index" class="bg-gray-100 px-2 py-1 rounded-md flex items-center">
                    <span>{{ skill }}</span>
                    <button @click="removeSkill(index)" class="ml-2 text-red-500">
                        <X class="size-5"/>
                    </button>
                </div>
            </div>
            <input v-model="jobRequirements.yearOfExperience" type="number" min="0" placeholder="Year(s) of Experience" 
                    class="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300 mb-4">
            
            <div class="flex justify-between mt-6 w-full">
                <button class="text-gray-500 hover:text-gray-800 pr-4">Cancel</button>
                <div>
                    <button @click="step--" class="text-gray-400 hover:text-gray-800 mr-4">Previous</button>
                    <button @click="handleContinue" class="bg-[#16235b] text-white px-4 py-2 rounded-lg 
                                                    hover:bg-blue-700 transition">Continue</button>
                </div>
            </div>
        </div>

        <!-- 3rd Section: Job Preferences -->
        <div v-if="step === 3" class="flex-1 flex flex-col items-start justify-start p-10">
            <h1 class="text-2xl font-bold mb-6"> Job Preferences </h1>
            <label for="select-mode" class="text-lg font-bold mb-2">Working Mode</label>
            <select v-model="preferences.mode" @change="handleModeChange" name="workingMode" id="select-mode" class="border rounded-md px-3 py-1 mb-4">
                <option value=""></option>
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
            </select>
            <label for=""></label>
            <input type="text"> 
        </div>
    </div>
</template>