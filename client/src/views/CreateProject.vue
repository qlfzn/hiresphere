<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref, computed } from 'vue';
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
    return false;
};

const handleContinue = () => {
    if (isStepValid()) {
        step.value++;
    } else {
        alert("Please fill all required fields!");
    }
};

const addSkill = () => {
    if (newSkill.value.trim() !== '') {
        jobRequirements.value.skills.push(newSkill.value.trim());
        newSkill.value = '';
    } 
};

const removeSkill = (index) => {
    jobRequirements.value.skills.splice(index, 1);
}
const handleModeChange = (event) => {
    preferences.value.mode = event.target.value;
}

</script>

<template>
    <section>
        <Navbar />
    </section>
    <div class="flex h-screen overflow-hidden">
        <!-- Sidebar Navigation -->
        <aside class="w-64 bg-gray-50 p-4 border-r flex flex-col h-full">
            <div>
                <h2 class="text-lg font-semibold mb-8 mt-22">Create New Project</h2>
                <nav class="space-y-2">
                    <p :class="['text-gray-900 font-medium', step === 1 ? '' : 'text-gray-300']">Project Details</p>
                    <p :class="['text-gray-900 font-medium', step === 2 ? '' : 'text-gray-300']">Role & Skills Requirements</p>
                    <p :class="['text-gray-900 font-medium', step === 3 ? '' : 'text-gray-300']">Job Preferences</p>
                    <p :class="['text-gray-900 font-medium', step === 4 ? '' : 'text-gray-300']">Submission</p>
                </nav>
            </div>

            <!-- Step Progress Indicator (pushes to the bottom) -->
            <div class="mt-auto flex items-center space-x-4 ml-4">
                <div v-for="n in 4" :key="n"
                    class="w-8 h-8 flex items-center justify-center rounded-full font-bold"
                    :class="step > n ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'">
                    {{ n }}
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col h-full">
            <!-- Step Content -->
            <div class="flex-1 overflow-y-auto p-6 mt-20">
                <!-- 1st Section: Project Details -->
                <div v-if="step === 1">
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
                </div>

                <!-- 2nd Section: Roles & Skills Requirements -->
                <div v-if="step === 2">
                    <h1 class="text-2xl font-bold mb-6"> Roles & Skills Requirements</h1>
                    <label for="jobTitle" class="text-lg font-bold mb-2">Job Title</label>
                    <input id="jobTitle" v-model="jobRequirements.jobTitle" type="text" placeholder="Job Title"
                            class="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300 mb-4">
                    
                    <label for="input-skills" class="text-lg font-bold mb-3">Skills Required</label>
                    <div class="flex w-full items-center mb-4">
                        <input id="input-skills" v-model="newSkill" type="text" placeholder="Skills Required (Multiple)" 
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
                </div>

                <!-- 3rd Section: Job Preferences -->
                <div v-if="step === 3">
                    <h1 class="text-2xl font-bold mb-6"> Job Preferences </h1>
                    <div class="flex w-full items-start justify-between mb-4">
                        <div class="flex flex-col w-1/2 pr-2">
                            <label for="select-mode" class="text-lg font-bold mb-2.5">Working Mode</label>
                            <select v-model="preferences.mode" @change="handleModeChange" name="workingMode" id="select-mode" class="border rounded-md px-3 py-2 mb-4">
                                <option value="">Choose an option</option>
                                <option value="On-site">On-site</option>
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                        <div class="flex flex-col w-1/2 pl-2">
                            <label for="location" class="text-lg font-bold mb-2">Location Preferences</label>
                            <input v-model="preferences.locationPreferences" id="location" type="text"
                                   class="border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300"> 
                        </div>
                    </div>           
                    <div class="flex w-full items-start justify-between mb-4">
                        <div class="flex flex-col w-1/2 pr-2">
                            <label for="min-compensation" class="text-lg font-bold mb-2">Min Compensation</label>
                            <input v-model="preferences.minCompensation" id="min-compensation" type="number" min="0"
                                   class="border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300"> 
                        </div>
                        <div class="flex flex-col w-1/2 pl-2">
                            <label for="max-compensation" class="text-lg font-bold mb-2">Max Compensation</label>
                            <input v-model="preferences.maxCompensation" id="max-compensation" type="number" min="0"
                                   class="border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300"> 
                        </div>
                    </div>
                </div>


                 <!-- 4th Section: Matching Configuration -->
                <div v-if="step === 4">
                    <h1 class="text-2xl font-bold mb-6"> Matching Configuration </h1>
                    <div class="flex flex-col w-full mb-4">
                        <label for="priorities" class="text-lg font-bold mb-2">Priorities</label>
                        <textarea v-model="matchingConfig.priorities" id="priorities" placeholder="Enter priorities"
                                  class="border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300"></textarea>
                    </div>
                    <div class="flex flex-col w-full mb-4">
                        <label for="additional-requirements" class="text-lg font-bold mb-2">Additional Requirements</label>
                        <textarea v-model="matchingConfig.additionalRequirements" id="additional-requirements" placeholder="Enter additional requirements"
                                  class="border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300"></textarea>
                    </div>
                    <div class="flex flex-col w-full mb-4">
                        <label for="matching-mode" class="text-lg font-bold mb-2">Matching Mode</label>
                        <select v-model="matchingConfig.matchingMode" id="matching-mode" class="border rounded-md px-3 py-2">
                            <option value="">Choose a matching mode</option>
                            <option value="Auto">Auto</option>
                            <option value="Manual">Manual</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Button Container -->
            <div class="flex justify-between w-full p-6 mb-50">
                <button 
                        class="text-gray-500 hover:text-gray-800 ml-2">Cancel</button>
                <div class="flex space-x-4">
                    <button v-if="step > 1" @click="step--"
                            class="text-gray-500 hover:text-gray-800">Previous</button>
                    <button v-if="step < 4" @click="handleContinue"
                            class="bg-[#16235b] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Continue
                    </button>
                    <button v-else
                            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

