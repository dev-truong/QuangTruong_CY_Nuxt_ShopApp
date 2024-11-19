<script setup lang="ts">

</script>

<template>
  <div class="flex-grow pt-20">
    <main class="container mx-auto text-center">

      <section class="mb-8 mt-14">
        <div
            class="bg-[#f8f0ea] h-full w-full rounded-primary relative flex flex-col gap-y-8 lg:p-24 pt-8 pb-0"
        >
          <img
              src="../assets/images/model1.png"
              alt="model"
              class="lg:absolute bottom-0 right-0 order-2 lg:w-[500px] h-[872] lg:ml-0 md:ml-auto"
          />
          <div class="flex flex-col px-8">
            <div class="flex flex-col gap-y-8 max-w-lg mr-auto">
              <h1 class="md:text-6xl text-4xl">
                Sports Equipment Collection.
              </h1>

              <NuxtLink :to="{ name: 'product'}">
                <button class="bg-purple-500 text-white text-2xl px-4 py-2 rounded-lg transition animate-blink">Buy Now</button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
      <section class="grid md:grid-cols-2 gap-8 mb-8">
        <div class="bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 class="text-2xl font-semibold text-yellow-700 mb-2">Flash Sale</h3>
          <p class="text-gray-700 mb-4">Up to 50% off on selected items!</p>
        </div>

        <div class="bg-red-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 class="text-2xl font-semibold text-red-700 mb-2">Limited Offer</h3>
          <p class="text-gray-700 mb-4">Free shipping on orders over $100!</p>
        </div>
      </section>

      <section class="bg-gray-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h3 class="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h3>
        <div class="flex flex-col md:flex-row gap-4">
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <p class="text-gray-700">"ShopApp always delivers the best products with amazing deals!"</p>
            <span class="block text-blue-600 mt-2">- Alex J.</span>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <p class="text-gray-700">"Fast shipping and high quality items. Love this store!"</p>
            <span class="block text-blue-600 mt-2">- Maria K.</span>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <p class="text-gray-700">"Great customer service and amazing products!"</p>
            <span class="block text-blue-600 mt-2">- Sam P.</span>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<style scoped>
@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-blink {
  animation: blink 1s ease-in-out infinite;
}
</style>