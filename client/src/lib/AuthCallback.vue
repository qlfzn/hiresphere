<script setup>
import { onMounted } from 'vue';
import { supabase } from '@lib/supabaseClient';
import router from '@/router';

onMounted(async() => {
    try{
        const {data: {session}, error} = await supabase.auth.getSession();

        if (error) throw error;

        if (session && session.user) {
            try {
                const userResponse = await fetch(`http://localhost:5050/api/user/${session.user.id}`, {
                headers: {
                    'Authorization': `Bearer ${session.access_token}`
                }
                });
                
                if (!userResponse.ok) {
                throw new Error('Failed to fetch user data');
                }
                
                const userData = await userResponse.json();
                
                // Redirect based on role
                if (userData.role === 'Client') {
                    router.push('/client/dashboard');
                } else if (userData.role === 'Freelancer') {
                    router.push('/freelancer/dashboard');
                } else {
                    router.push('/home');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                router.push('/home');
            }
        } else {
            router.push('/auth/login');
        }
    } catch (error) {
        console.error('Error in auth callback: ', error);
        alert('Authentication error: ', error.message);
        router.push('/auth/login');
    } 
});
</script>

<template>
    <div class="flex h-screen items-center justify-center">
      <div class="text-center">
        <h2 class="text-xl font-bold mb-4">Processing your authentication...</h2>
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  </template>