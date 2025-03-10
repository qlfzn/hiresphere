<script setup>
import { onMounted } from 'vue';
import { supabase } from './supabaseClient';
import router from '@/router';

onMounted(async() => {
    try{
        const {data: {session}, error} = await supabase.auth.getSession();

        if (error) throw error;

        if (session && session.user) {
            const role = session.user.user_metadata?.role;
            
            await fetch('http://localhost:5050/api/sync-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: session.user.id,
                    email: session.user.email,
                    role: role
                }),
            });

            router.push('/home');
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