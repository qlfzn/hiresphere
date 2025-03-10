<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SignUp from '@/components/SignUp.vue';
import Login from '@/components/Login.vue';

const route = useRoute();
const isLogin = computed(() => route.name === 'login') ;
const router = useRouter();

const toggleForm = () => {
  if (isLogin.value) {
    router.push('/auth/signup')
  } else {
    router.push('/auth/login')
  }
};
</script>

<template>
  <div>
    <SignUp v-if="!isLogin" @toggle="toggleForm" />
    <Login v-else @toggle="toggleForm" />
  </div>
</template>