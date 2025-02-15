<script setup>
import { ref } from 'vue';
import logo from '../assets/hs-text.svg'

const isLogin = ref(true); // Toggle between Sign In and Sign Up
</script>

<template>
  <div class="flex h-screen">
    <!-- Left Side: Auth Form -->
    <div class="w-1/2 flex items-center justify-center bg-white px-10">
      <div class="w-full max-w-md">
        <!-- Toggle Between Sign In & Sign Up -->
        <p class="text-gray-500 text-sm">
          {{ isLogin ? "Don't have an account?" : "Have an account?" }}
          <span @click="isLogin = !isLogin" class="text-blue-500 cursor-pointer">
            {{ isLogin ? "Sign Up" : "Sign In" }}
          </span>
        </p>

        <!-- Title -->
        <h2 class="text-3xl font-bold text-gray-900 mt-4">
          {{ isLogin ? "Welcome Back!" : "Create an Account" }}
        </h2>
        <p class="text-gray-500 text-sm mt-1">
          {{ isLogin ? "Sign in to continue" : "Join us and start your journey" }}
        </p>

        <!-- Auth Form -->
        <form class="mt-6 space-y-4">
          <div v-if="isLogin">
            <!-- LOGIN FORM -->
            <label class="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your username"
              required
            />
            <label class="block text-gray-700 font-medium mt-4 mb-1">Password</label>
            <input
              type="password"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              required
            />
          </div>

          <div v-else>
            <!-- SIGN-UP FORM -->
            <div class="flex space-x-2">
              <div class="w-1/2">
                <label class="block text-gray-700 font-medium">First Name</label>
                <input
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                  placeholder="John"
                  required
                />
              </div>
              <div class="w-1/2">
                <label class="block text-gray-700 font-medium">Last Name</label>
                <input
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <label class="block text-gray-700 font-medium mt-3">E-mail</label>
            <input
              type="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-md invalid:border-pink-500 invalid:text-pink-600 focus:placeholder:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="you@example.com"
              required
            />

            <label class="block text-gray-700 font-medium mt-3">Password</label>
            <input
              type="password"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              placeholder="6+ strong characters"
              required
            />

            <label class="block text-gray-700 font-medium mt-3">Re-enter Password</label>
            <input
              type="password"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              placeholder="Confirm your password"
              required
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition"
          >
            {{ isLogin ? "Sign In" : "Create Account" }}
          </button>
        </form>
      </div>
    </div>

    <!-- Right Side: Branding Section -->
    <div class="w-1/2 bg-blue-300 flex flex-col justify-center items-center text-white text-center p-10">
      <div class="max-w-md">
        <img class="h-auto w-auto" :src=logo alt="">
      </div>
    </div>
  </div>
</template>
