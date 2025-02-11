<script setup>
const features = [
  {
    title: "AI-Powered Talent Matching",
    description: "Find the perfect fit in seconds with our smart AI matching system.",
    icon: "🧠",
  },
  {
    title: "Seamless Hiring Process",
    description: "Reduce time-to-hire by 50% with our all-in-one recruitment tools.",
    icon: "⚡",
  },
  {
    title: "Smart Insights & Analytics",
    description: "Make data-driven hiring decisions with real-time analytics.",
    icon: "📊",
  },
];
</script>

<template>
  <section class="py-12 ">
    <div class="container mx-auto max-w-6xl text-center">
      <h2 class="text-4xl font-extrabold text-black">Why Choose HireSphere?</h2>
      <p class="text-lg text-gray-500 mt-2">Unlock the future of hiring with our smart platform.</p>

      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="p-6 bg-white outline outline-[#16235b] rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
        >
          <div class="text-5xl">{{ feature.icon }}</div>
          <h3 class="mt-4 text-xl font-semibold text-[#16235b]">{{ feature.title }}</h3>
          <p class="text-gray-600 mt-2">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
