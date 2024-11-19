<script setup lang="ts">
import {useCartStore} from "~/store/useCartStore";

definePageMeta({
  middleware: "auth",
})

const cartStore = useCartStore();
const address = ref('');
const phone = ref('')
const token = useCookie('token')

async function handleSubmit() {
  const res = await $fetch('http://152.42.240.131/api/v1/order', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.value}`
    },
    body: {
      address: address.value,
      phone: phone.value,
      cart_item: cartStore.checkoutcartItems
    }
  })
  alert('Payment successful!');
  cartStore.removeAllItems()
  navigateTo('/order')
}
</script>

<template>
  <div class="min-h-screen bg-gray-200 p-6 pt-24">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 class="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="address" class="block text-lg font-medium text-gray-700">Address</label>
          <input id="address" v-model="address" type="text" required
                 class="mt-1 h-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"/>
          <label for="phone" class="block text-lg font-medium text-gray-700">Phone</label>
          <input id="phone" v-model="phone" type="text" required
                 class="mt-1 h-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"/>
        </div>

        <div class="mb-4">
          <h2 class="text-xl font-bold mb-2">Product Details</h2>
          <ul>
            <li v-for="item in cartStore.cartItem" :key="item.product_id" class="flex justify-between items-center">
              <img :src="item.img_path" alt="Product Image" class="w-16 h-16 rounded mr-4 mb-2"/>
              <span>{{ item.name }} (x{{ item.quantity }})</span>
              <span>${{ item.price * item.quantity }}</span>
            </li>
          </ul>
        </div>

        <div class="flex justify-between items-center mt-8">
          <span class="text-xl font-bold">Total:</span>
          <span class="text-2xl font-bold text-orange-600">${{ cartStore.totalPrice }}</span>
        </div>

        <div class="mt-8 text-center">

            <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Pay Now
            </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>