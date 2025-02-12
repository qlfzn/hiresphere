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
})

const router = useRouter();

const routeToHomePage = () => {
    router.push('/home');
}

const routeToAuthPage = () => {
    router.push('/auth');
}

</script>


<template>
    <section class="relative text-center py-24 bg-gradient-to-b from-[#16235b] via-[#2b4570] via-80% via-[#6eb7ff] via-20% to-white">

        <div class="relative container mx-auto px-6">
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-wide 
                       text-white drop-shadow-md transition-all duration-300">
                Skip <span class="bg-[#6eb7ff] text-[#16235b] px-2 rounded-md">the Hassle</span>
                <br> Hire the Best in <span class="underline decoration-4">no time</span>
            </h1>
            <p class="text-lg sm:text-xl text-gray-300 mt-3">{{ subtitle }}</p>

            <!-- Call-to-action buttons -->
            <div class="mt-6 flex justify-center space-x-4">
                <!-- Get Started Button -->
                <button class="px-6 py-3 bg-[#6eb7ff] text-[#16235b] font-semibold rounded-full 
                               shadow-lg hover:bg-[#2B4570] hover:text-white transition"
                               @click="routeToHomePage">
                    Get Started
                </button>

                <!-- Log in Button -->
                <button class="flex items-center px-6 py-3 border border-gray-300 text-white 
                               rounded-full shadow-md hover:bg-white hover:text-[#16235b] transition"
                               @click="routeToAuthPage">
                    Log in
                    <ArrowRight class="ml-2" />
                </button>
            </div>
        </div>
    </section>
</template>