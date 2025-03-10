<script setup>
import { onMounted, ref } from 'vue';
import { supabase } from '@/lib/supabaseClient';
import router from '@/router';

const user = ref(null);

onMounted(() => {
  // Get initial session
  supabase.auth.getSession().then(({ data: { session } }) => {
    user.value = session?.user || null;
  });

  // Set up auth state listener
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user || null;
    
    if (event === 'SIGNED_IN') {
      console.log('User signed in:', session.user);
    } else if (event === 'SIGNED_OUT') {
      console.log('User signed out');
      router.push('/auth/login');
    }
  });

  // Clean up subscription when component unmounts
  return () => {
    subscription.unsubscribe();
  };
});
</script>

<template>
  <RouterView />
</template>
