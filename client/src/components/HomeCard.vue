<script setup>
import Card from './Card.vue';

</script>

<template>
    <section class="py-4">
      <div class="container-xl lg:container m-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card bg="bg-gray-50">
            <h2 class="text-2xl font-bold">For Freelancers</h2>
            <p class="mt-2 mb-4">
              Browse jobs and start your career today
            </p>
            <a
              href="jobs.html"
              class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Browse Jobs
            </a>
          </Card>
          <Card bg="bg-gray-50">
            <h2 class="text-2xl font-bold">For Employers</h2>
            <p class="mt-2 mb-4">
              List your project to find the perfect talent for the role
            </p>
            <a
              href="add-job.html"
              class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Add Project 
            </a>
          </Card>
        </div>
      </div>
    </section>
</template>