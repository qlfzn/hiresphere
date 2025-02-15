<script setup>
import Card from './Card.vue';
import { defineProps } from 'vue';

defineProps({
  cardTitle: {
    type: String, 
    default: "Card title here"
  },
  cardSubtitle: {
    type: String, 
    default: "Card subtitle here"
  },
  buttonText: {
    type: String, 
    default: "Click here"
  }
}) 
</script>

<template>
    <Card class="bg-gray-100">
      <h2 class="text-2xl font-bold">{{ cardTitle }}</h2>
      <p class="mt-2 mb-4">
        {{ cardSubtitle }}
      </p>
      <a
        class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
      >
        {{ buttonText }}
      </a>
    </Card>
</template>