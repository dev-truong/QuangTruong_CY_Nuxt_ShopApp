<script setup lang="ts">
import {useCartStore} from "~/store/useCartStore";

const cartStore = useCartStore()
console.log(cartStore)
function increaseQuantity(item) {
  if (item.quantity === item.stock) {
    alert('This product is out of stock')
    return
  }
  item.quantity++
}
function decreaseQuantity(item) {
  if (item.quantity === 1) {
    cartStore.removeFromCart(item.product_id)
    return
  }
  item.quantity--
}

</script>

<template>
  <div class="min-h-screen bg-gray-200 p-6 pt-24">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 class="text-3xl font-bold mb-8 text-center">Shopping Cart</h1>

      <ul class="divide-y divide-gray-200">
        <li v-for="item in cartStore.cartItem" :key="item.product_id" class="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-4">
          <div class="flex items-center">
            <img :src="item.img_path" alt="Product Image" class="w-16 h-16 rounded mr-4"/>
            <div>
              <h2 class="text-lg font-bold">{{ item.name }}</h2>
              <p class="text-gray-500">Price: ${{ item.price }}</p>
            </div>
          </div>
          <div class="flex items-center">
            <div class="flex items-center border rounded-lg">
              <button @click="decreaseQuantity(item)" class="w-8 h-8 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-l-lg">
                -
              </button>
              <input type="number" v-model.number="item.quantity" class="w-12 text-center border-none"/>
              <button @click="increaseQuantity(item)" class="w-8 h-8 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-r-lg">
                +
              </button>
            </div>
            <span class=" font-bold min-w-[80px] text-xl text-right">${{ item.price * item.quantity }}</span>
            <button @click="cartStore.removeFromCart(item.product_id)" class="ml-4 bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700">Delete</button>
          </div>
        </li>
      </ul>

      <div class="flex justify-between items-center mt-8">
        <span class="text-xl font-bold">Total:</span>
        <span class="text-2xl font-bold text-orange-600">${{ cartStore.totalPrice }}</span>
      </div>
      <div class="mt-8 text-center">
        <NuxtLink :to="{ name: 'checkout' }">
          <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Checkout</button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>