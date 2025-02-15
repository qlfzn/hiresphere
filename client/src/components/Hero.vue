<script setup>
import { defineProps } from 'vue';

defineProps({
headline: {
    type: String,
    default: "Welcome!"
},
subheader: {
    type: String,
    default: "This is subheader"
}
})
</script>

<template>
    <section class="pt-20 pb-5 mb-4">
        <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
        >
        <div class="text-center">
            <h1
            class="text-4xl font-extrabold text-black sm:text-5xl md:text-6xl"
            > {{ headline }}
        </h1>
            <p class="my-4 text-xl text-black">
            {{ subheader }}
        </p>
        </div>
        </div>
    </section>
</template>