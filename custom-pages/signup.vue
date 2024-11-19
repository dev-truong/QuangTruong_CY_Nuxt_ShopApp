<script setup lang="ts">
import {ref} from 'vue'
import urlImage from "assets/images/background.jpg";

definePageMeta({
  layout: 'auth',
})

const email = ref('')
const password = ref('')
const name = ref('')

const handleSignup = async () => {
  const {data, error} = await useAsyncData(() => $fetch('http://152.42.240.131/api/v1/signup', {
    method: 'POST',
    body: {name: name.value, email: email.value, password: password.value}
  }))

  if (error.value) {
    alert(error.value.data.message);
    return;
  }

  if (data.value?.token) {
    // token.value = data.value.token
    alert("succes signup")
    navigateTo('/login')
  } else {
    alert("have no token")
  }

}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center w-full bg-center bg-cover bg-no-repeat" :style="{ backgroundImage: `url(${urlImage})`}">
      <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg">
        <h2 class="text-2xl font-bold text-center">Sign Up</h2>
        <form @submit.prevent="handleSignup">
          <div class="mb-4">
            <label class="block text-gray-700">Name</label>
            <input
                type="text"
                v-model="name"
                class="w-full p-2 border rounded focus:outline-none focus:ring"
                required
            />
          </div>
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
              class="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>

</template>

<style scoped>

</style>