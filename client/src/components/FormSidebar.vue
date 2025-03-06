<script setup>
  import { ref } from "vue";
  
  const steps = ref(["Project Details", "Budget & Timeline", "Review & Submit"]);
  const activeStep = ref(1);
</script>

<template>
    <div class="w-64 bg-white shadow-md p-6 rounded-lg pt-25">
      <div class="flex flex-col gap-6">
        <!-- Step 1 (Active) -->
        <div class="relative flex items-center gap-4">
          <div class="flex items-center">
            <div class="w-8 h-8 flex items-center justify-center border-2 border-gray-800 rounded-full font-bold text-gray-800">
              1
            </div>
          </div>
          <span class="font-bold text-gray-800">Project Details</span>
        </div>

        <!-- Step 2 -->
        <div class="relative flex items-center gap-4">
          <div class="flex items-center">
            <div class="w-8 h-8 flex items-center justify-center border-2 border-gray-400 rounded-full text-gray-500">
              2
            </div>
          </div>
          <span class="text-gray-500">2nd Step</span>
        </div>

        <!-- Step 3 -->
        <div class="relative flex items-center gap-4">
          <div class="flex items-center">
            <div class="w-8 h-8 flex items-center justify-center border-2 border-gray-400 rounded-full text-gray-500">
              3
            </div>
          </div>
          <span class="text-gray-500">3rd Step</span>
        </div>
      </div>
    </div>
</template>
