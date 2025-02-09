<script setup>
  import Navbar from './components/Navbar.vue';
  import Hero from './components/Hero.vue';
  import HomeCard from './components/HomeCard.vue';
  import { RouterView } from 'vue-router';

</script>

<template>
  <Navbar />
  <Hero headline="Hire Faster with Us!" subheader="Expedite project success with our AI-driven profile matching to find the right talents for your project"/>
  <HomeCard />
  <!-- <RouterView /> -->
</template>
