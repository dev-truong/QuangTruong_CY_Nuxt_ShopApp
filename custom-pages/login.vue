<script setup lang="ts">
import {ref} from 'vue'
import urlImage from '@/assets/images/background.jpg'

definePageMeta({
  layout: 'auth',
})

const email = ref('')
const password = ref('')
const token = useCookie('token')

const handleLogin = async () => {
  const { data, error } = await useAsyncData(() => $fetch('http://152.42.240.131/api/v1/login', {
    method: 'POST',
    body: {email: email.value, password: password.value}
  }))

  if (data.value?.token) {
    token.value = data.value.token
    alert("Success Login")
    navigateTo('/product')

  } else {
    alert('Login failed')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center w-full bg-center bg-cover bg-no-repeat" :style="{ backgroundImage: `url(${urlImage})`}">
    <div class="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-bold text-center">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input
              type="email"
              v-model="email"
              class="w-full p-2 border rounded focus:outline-none focus:ring"
              required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700">Password</label>
          <input
              type="password"
              v-model="password"
              class="w-full p-2 border rounded focus:outline-none focus:ring"
              required
          />
        </div>
        <button
            type="submit"
            class="w-full bg-green-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <div class="hover:text-orange-500 text-gray-700 cursor-pointer text-right underline">
        <NuxtLink :to="{name: 'signup'}">Don't have an account? Sign Up</NuxtLink>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>