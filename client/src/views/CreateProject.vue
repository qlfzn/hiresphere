<script setup>
import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar.vue';
import { ref, computed } from 'vue';
import { X, CheckCircle } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import axios from 'axios';

const step = ref(1);
const totalSteps = 4;

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
const showSkillsError = ref(false);
const isSubmitting = ref(false);

const stepLabels = [
    "Project Details", 
    "Roles & Skills", 
    "Job Preferences", 
    "Matching Configuration"
];

const isValueFilled = (obj) => {
    return Object.values(obj).every(value => {
        if (typeof value === 'string') return value.trim() !== '';
        if (Array.isArray(value)) return value.length > 0;
        return true; 
    });
};

const stepCompletion = computed(() => {
    return [
        isValueFilled(projectDetails.value),
        isValueFilled(jobRequirements.value),
        isValueFilled(preferences.value),
        isValueFilled(matchingConfig.value)
    ];
});

const isStepValid = () => {
    if (step.value === 1) {
        return isValueFilled(projectDetails.value);
    } else if (step.value === 2) {
        if (jobRequirements.value.skills.length === 0) {
            showSkillsError.value = true;
            return false;
        }
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
        showSkillsError.value = false;
    } 
};

const addSkill = () => {
    if (newSkill.value.trim() !== '') {
        jobRequirements.value.skills.push(newSkill.value.trim());
        newSkill.value = '';
        showSkillsError.value = false;
    } 
};

const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addSkill();
    }
};

const removeSkill = (index) => {
    jobRequirements.value.skills.splice(index, 1);
}

const handleModeChange = (event) => {
    preferences.value.mode = event.target.value;
}

const router = useRouter();

const submitFormValues = async () => {
    if (!isStepValid()) return;
    
    isSubmitting.value = true;
    
    const projectSubmit = {
        title: projectDetails.value.title,
        description: projectDetails.value.description,
        job_title: jobRequirements.value.jobTitle,
        skills_required: jobRequirements.value.skills,
        working_mode: preferences.value.mode,
        location: preferences.value.locationPreferences,
        budget: preferences.value.maxCompensation,
        is_active: true,
        due_date: projectDetails.value.endDate
    };

    try {
        // Get current user
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
            router.push('/auth/login');
            return;
        }

        const response = await fetch('http://localhost:5050/api/projects/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                projectSubmit, 
                user_id: session.user.id 
            })
        });

        console.log(response);
        
        router.push({
            path: '/projects/',
        });
    } catch (error) {
        console.error(error);
        isSubmitting.value = false;
        // Would add proper error handling UI here
    }
}
</script>

<template>
    <section>
        <Navbar />
    </section>
    
    <div class="flex min-h-screen bg-gray-50">
        
        <!-- Main Content -->
        <div class="flex-1 flex flex-col h-full max-w-5xl mx-auto w-full px-4">
            <!-- Progress Tracker -->
            <div class="pt-10 pb-8 px-6">
                <div class="flex items-center justify-between">
                    <div v-for="(label, index) in stepLabels" :key="index" class="flex flex-col items-center flex-1 relative">
                        <!-- Circle -->
                        <div :class="[
                                'flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300',
                                step === index+1 ? 'border-blue-500 bg-blue-100 text-blue-700 font-bold' :
                                step > index+1 ? 'border-green-500 bg-green-100 text-green-600' :
                                'border-gray-300 bg-white text-gray-400'
                            ]">
                            <span v-if="step > index+1">
                                <CheckCircle class="w-5 h-5" />
                            </span>
                            <span v-else>{{ index + 1 }}</span>
                        </div>
                        
                        <!-- Label -->
                        <span :class="[
                                'mt-2 text-sm font-medium transition-all duration-300',
                                step === index+1 ? 'text-blue-700' :
                                step > index+1 ? 'text-green-600' :
                                'text-gray-500'
                            ]">
                            {{ label }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Step Content -->
            <div class="flex-1 overflow-y-auto p-6 bg-white rounded-lg shadow mx-6 mb-6">
                <!-- 1st Section: Project Details -->
                <div v-if="step === 1" class="space-y-6">
                    <h1 class="text-2xl font-bold text-gray-800">Project Details</h1>
                    
                    <div class="space-y-4">
                        <div>
                            <label for="projectTitle" class="block text-sm font-medium text-gray-700 mb-1">
                                Project Title <span class="text-red-500">*</span>
                            </label>
                            <input v-model="projectDetails.title" id="projectTitle" type="text" 
                                class="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                placeholder="Enter project title">
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="companyName" class="block text-sm font-medium text-gray-700 mb-1">
                                    Company Name <span class="text-red-500">*</span>
                                </label>
                                <input v-model="projectDetails.companyName" id="companyName" type="text" 
                                    class="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    placeholder="Company name">
                            </div>
                            
                            <div>
                                <label for="industry" class="block text-sm font-medium text-gray-700 mb-1">
                                    Industry <span class="text-red-500">*</span>
                                </label>
                                <input v-model="projectDetails.industry" id="industry" type="text" 
                                    class="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    placeholder="e.g. Technology, Healthcare">
                            </div>
                        </div>
                        
                        <div>
                            <label for="projectDescription" class="block text-sm font-medium text-gray-700 mb-1">
                                Project Description <span class="text-red-500">*</span>
                            </label>
                            <textarea v-model="projectDetails.description" id="projectDescription" rows="4"
                                class="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                placeholder="Describe the project and its objectives"></textarea>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Project Duration <span class="text-red-500">*</span>
                            </label>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label for="startDate" class="block text-xs text-gray-500 mb-1">Start Date</label>
                                    <input v-model="projectDetails.startDate" id="startDate" type="date" 
                                        class="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                                </div>
                                <div>
                                    <label for="endDate" class="block text-xs text-gray-500 mb-1">End Date</label>
                                    <input v-model="projectDetails.endDate" id="endDate" type="date" 
                                        class="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 2nd Section: Roles & Skills Requirements -->
                <div v-if="step === 2" class="space-y-6">
                    <h1 class="text-2xl font-bold text-gray-800">Roles & Skills Requirements</h1>
                    
                    <div class="space-y-4">
                        <div>
                            <label for="jobTitle" class="block text-sm font-medium text-gray-700 mb-1">
                                Job Title <span class="text-red-500">*</span>
                            </label>
                            <input id="jobTitle" v-model="jobRequirements.jobTitle" type="text"
                                class="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                placeholder="e.g. Frontend Developer, Project Manager">
                        </div>
                        
                        <div>
                            <label for="input-skills" class="block text-sm font-medium text-gray-700 mb-1">
                                Skills Required <span class="text-red-500">*</span>
                            </label>
                            <div class="flex w-full items-center">
                                <input id="input-skills" v-model="newSkill" type="text" 
                                    @keydown="handleKeyDown"
                                    class="flex-grow border border-gray-300 px-4 py-3 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    placeholder="Type a skill and press Enter or Add">
                                <button @click.prevent="addSkill" 
                                    class="bg-blue-500 text-white px-4 py-3 rounded-r-lg hover:bg-blue-600 transition duration-200 font-medium">
                                    Add
                                </button>
                            </div>
                            <p v-if="showSkillsError" class="mt-1 text-sm text-red-500">
                                Please add at least one skill
                            </p>
                            
                            <div class="flex flex-wrap gap-2 mt-3">
                                <div v-for="(skill, index) in jobRequirements.skills" :key="index" 
                                    class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center border border-blue-200">
                                    <span class="text-sm">{{ skill }}</span>
                                    <button @click="removeSkill(index)" class="ml-2 text-blue-500 hover:text-blue-700">
                                        <X class="w-4 h-4"/>
                                    </button>
                                </div>
                            </div>
                            <p class="mt-2 text-xs text-gray-500">Press Enter or click "Add" to add multiple skills</p>
                        </div>
                        
                        <div>
                            <label for="yearsOfExperience" class="block text-sm font-medium text-gray-700 mb-1">
                                Years of Experience <span class="text-red-500">*</span>
                            </label>
                            <input v-model="jobRequirements.yearOfExperience" id="yearsOfExperience" type="number" min="0" 
                                class="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                placeholder="e.g. 3">
                            <p class="mt-1 text-xs text-gray-500">Enter minimum required years of experience</p>
                        </div>
                    </div>
                </div>

                <!-- 3rd Section: Job Preferences -->
                <div v-if="step === 3" class="space-y-6">
                    <h1 class="text-2xl font-bold text-gray-800">Job Preferences</h1>
                    
                    <div class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="select-mode" class="block text-sm font-medium text-gray-700 mb-1">
                                    Working Mode <span class="text-red-500">*</span>
                                </label>
                                <select v-model="preferences.mode" @change="handleModeChange" id="select-mode" 
                                    class="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white">
                                    <option value="" disabled>Choose an option</option>
                                    <option value="On-site">On-site</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                            
                            <div>
                                <label for="location" class="block text-sm font-medium text-gray-700 mb-1">
                                    Location Preferences <span class="text-red-500">*</span>
                                </label>
                                <input v-model="preferences.locationPreferences" id="location" type="text"
                                    class="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    placeholder="e.g. New York, Remote - US only"> 
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-3">
                                Compensation Range <span class="text-red-500">*</span>
                            </label>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label for="min-compensation" class="block text-xs text-gray-500 mb-1">Minimum ($)</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span class="text-gray-500">$</span>
                                        </div>
                                        <input v-model="preferences.minCompensation" id="min-compensation" type="number" min="0"
                                            class="w-full border border-gray-300 pl-8 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                            placeholder="0"> 
                                    </div>
                                </div>
                                
                                <div>
                                    <label for="max-compensation" class="block text-xs text-gray-500 mb-1">Maximum ($)</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span class="text-gray-500">$</span>
                                        </div>
                                        <input v-model="preferences.maxCompensation" id="max-compensation" type="number" min="0"
                                            class="w-full border border-gray-300 pl-8 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                            placeholder="0"> 
                                    </div>
                                </div>
                            </div>
                            <p class="mt-2 text-xs text-gray-500">Enter the compensation range for this position</p>
                        </div>
                    </div>
                </div>

                <!-- 4th Section: Matching Configuration -->
                <div v-if="step === 4" class="space-y-6">
                    <h1 class="text-2xl font-bold text-gray-800">Matching Configuration</h1>
                    
                    <div class="space-y-4">
                        <div>
                            <label for="priorities" class="block text-sm font-medium text-gray-700 mb-1">
                                Priorities <span class="text-red-500">*</span>
                            </label>
                            <textarea v-model="matchingConfig.priorities" id="priorities" rows="3"
                                class="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                placeholder="Enter what's most important in your candidate search"></textarea>
                            <p class="mt-1 text-xs text-gray-500">List your main priorities for matching candidates</p>
                        </div>
                        
                        <div>
                            <label for="additional-requirements" class="block text-sm font-medium text-gray-700 mb-1">
                                Additional Requirements <span class="text-red-500">*</span>
                            </label>
                            <textarea v-model="matchingConfig.additionalRequirements" id="additional-requirements" rows="3"
                                class="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                placeholder="Enter any additional requirements or preferences"></textarea>
                        </div>
                        
                        <div>
                            <label for="matching-mode" class="block text-sm font-medium text-gray-700 mb-1">
                                Matching Mode <span class="text-red-500">*</span>
                            </label>
                            <select v-model="matchingConfig.matchingMode" id="matching-mode" 
                                class="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white">
                                <option value="" disabled>Choose a matching mode</option>
                                <option value="Strict">Strict</option>
                                <option value="Flexible">Flexible</option>
                            </select>
                            <p class="mt-1 text-xs text-gray-500">Select how you would like to match with candidates</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Button Container -->
            <div class="flex justify-between items-center w-full p-6">
                <button class="text-gray-600 hover:text-gray-900 font-medium transition duration-200">
                    Cancel
                </button>
                
                <div class="flex space-x-4">
                    <button v-if="step > 1" @click="step--"
                        class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition duration-200">
                        Previous
                    </button>
                    <button v-if="step < totalSteps" @click="handleContinue"
                        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition duration-200">
                        Continue
                    </button>
                    <button v-else
                        @click="submitFormValues"    
                        :class="['px-6 py-2 rounded-lg font-medium transition duration-200', 
                                isSubmitting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white']"
                        :disabled="isSubmitting">
                        <span v-if="isSubmitting">Submitting...</span>
                        <span v-else>Submit Project</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>