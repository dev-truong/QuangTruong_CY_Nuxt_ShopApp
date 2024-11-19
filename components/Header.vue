<script setup lang="ts">

import {useCartStore} from "~/store/useCartStore";

const isLogin = computed(() => token.value ? true : false)
const userName = ref('')
const token = useCookie('token')
const showUserMenu = ref(false)
const cartStore = useCartStore()

async function handleUser() {
  showUserMenu.value = !showUserMenu.value
  const res = await $fetch('http://152.42.240.131/api/v1/user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
  console.log('testuser', res)
  userName.value = res.name
}

async function handleLogout() {
  const res = await $fetch('http://152.42.240.131/api/v1/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
  alert(res.message)
  token.value = null
  console.log(res.message)
  navigateTo('/')
}
</script>

<template>
  <header class="bg-white shadow-md py-4 px-8 fixed top-0 w-full z-10">
    <div class="container mx-auto flex justify-between items-center">
      <div
          class="text-3xl font-bold text-blue-600"
      >
        ShopApp
      </div>
      <nav class="flex items-center gap-6">
        <NuxtLink
            :to="{ name: 'index'}"
            class="text-gray-700 hover:text-blue-600 text-xl px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-blue-50"
        >
          Home
        </NuxtLink>
        <NuxtLink
            :to="{ name: 'product'}"
            class="text-gray-700 hover:text-blue-600 text-xl px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-blue-50"
        >
          Product
        </NuxtLink>
      </nav>
      <nav class="flex items-center gap-4">
        <NuxtLink :to="{ name: 'cart'}" class="relative">
          <img
              src="../assets/images/cart.png"
              alt="Cart Image"
              class="w-10 h-10 rounded-lg cursor-pointer"
          >
          <div
              class="flex items-center justify-center w-5 h-5 absolute top-0 right-0 text-white rounded-full bg-red-500">
            {{ cartStore.quantityItem }}
          </div>
        </NuxtLink>
        <NuxtLink
            v-if="!isLogin"
            :to="{ name: 'login'}"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-shadow shadow-lg"
        >
          Login
        </NuxtLink>
        <div v-else class="relative">
          <img
              src="../assets/images/user.png"
              alt="User Image"
              class="w-10 h-10 rounded-lg cursor-pointer"
              @click="handleUser"
          >
          <div v-if="showUserMenu" class="absolute right-0 mt-2 py-2 w-36 bg-white border rounded shadow-xl">
<!--          <div class="font-bold text-purple-500 text-left gap-2 px-6 py-2">{{ userName }}</div>-->
            <NuxtLink
                :to="{ name: 'profile'}"
                class="flex items-center justify-center gap-2 px-4 py-2 text-purple-500 hover:text-purple-700 w-full font-bold cursor-pointer"
            >
              {{ userName }}
              <img src="../assets/images/profile.png" alt="Profile Image" class="w-7 h-7 mr-2">
            </NuxtLink>
            <button
                @click="handleLogout"
                class="flex items-center justify-center gap-2 px-4 py-2 text-purple-500 hover:text-purple-700 w-full font-bold"
            >
              Logout
              <img src="../assets/images/logout.png" alt="Logout Image" class="w-7 h-7 mr-2">
            </button>
          </div>
        </div>
      </nav>
    </div>
  </header>

</template>

<style scoped>

</style>