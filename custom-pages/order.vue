<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useCartStore } from '~/store/useCartStore';

const token = useCookie('token')
const cartStore = useCartStore();
const orders = ref([])

onMounted(async () => {
    const res = await $fetch('http://152.42.240.131/api/v1/orders', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.value}`
      },
    })
    orders.value = res
    console.log('order',res)
  console.log('orders', orders.value);

})


</script>

<template>
  <div class="min-h-screen bg-gray-200 p-6 pt-24">
    <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 class="text-3xl font-bold mb-8 text-center">Order Confirmation</h1>

      <div v-if="orders.length">
        <h2 class="text-xl font-bold mb-4">Thank you for your purchase!</h2>
        <ul>
          <li v-for="item in orders" :key="item.product_id" class="grid grid-cols-3 items-center">
            <img src="https://placehold.co/400" alt="Product Image" class="w-16 h-16 rounded mr-4 mb-2"/>
            <span>{{ item.status }}</span>
            <span>${{ item.total }}</span>
          </li>
        </ul>

        <div class="mt-8 text-center">
          <NuxtLink :to="{ name: 'product' }">

          <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Continue Shopping</button>
          </NuxtLink>
        </div>
      </div>

      <div v-else>
        <p>No order details found.</p>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Your styles here */
</style>