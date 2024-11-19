<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted, watch} from 'vue'
import {useCartStore} from "~/store/useCartStore";

definePageMeta({
  middleware: 'auth',
})

const currentPage = ref(1)
const productListElement = ref(null)
const productContainer = ref([])
const token = useCookie('token');
const tokenValue = token.value;
const cartStore = useCartStore()
const route = useRoute()
const router = useRouter()

const filterCatagory = ref({
  name: route.query.name || '',
  min_price: route.query.min_price || 0,
  max_price: route.query.max_price || 0,
  category_id: route.query.category_id || 0
})

const {data: productList, status, refresh: refreshProducts} = await useAsyncData(
    'products',
    () =>
        $fetch('http://152.42.240.131/api/v1/products', {
          method: 'GET',
          query: {
            page: currentPage.value,
            name: filterCatagory.value.name,
            min_price: filterCatagory.value.min_price,
            max_price: filterCatagory.value.max_price,
            category_id: filterCatagory.value.category_id
          },
          headers: {
            Authorization: `Bearer ${tokenValue}`
          }
        }), {
      watch: [currentPage, filterCatagory],
    }
)

const {data: catagory} = await useAsyncData(
    'catagory',
    () =>
        $fetch('http://152.42.240.131/api/v1/categories', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${tokenValue}`
          }
        })
)
console.log("catagory",catagory);

const isPending = computed(() => status.value === 'pending')

function handleScroll() {
  if (isPending.value) return;
  const element = productListElement.value
  if (element?.getBoundingClientRect().bottom <= window.innerHeight) {
    console.log('scroll')
    currentPage.value++
  }
}

function filterProducts() {
  currentPage.value = 1;
  productContainer.value = [];
  const query = {}
  if(filterCatagory.value.name) query.name = filterCatagory.value.name
  if(filterCatagory.value.min_price) query.min_price = filterCatagory.value.min_price
  if(filterCatagory.value.max_price) query.max_price = filterCatagory.value.max_price
  if(filterCatagory.value.category_id) query.category_id = filterCatagory.value.category_id
  router.push({query})
  refreshProducts();
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  productContainer.value = productList.value?.data
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(() => productList.value, (newValue) => {
  if (newValue?.length !== 0 && newValue) {
    productContainer.value.push(...newValue?.data)
  }
}, {deep: true, immediate: true})

function addToCart(product) {
  cartStore.addToCart({
    product_id: product.id,
    quantity: 1,
    price: product.price,
    name: product.name,
    img_path: product.preview_img_path,
    stock: product.stock,
  })
}
</script>

<template>
  <div class="min-h-screen p-6 pt-24 bg-gray-100">
    <div class="mb-6">
      <form @submit.prevent="filterProducts">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label for="productName" class="block font-medium">Product Name:</label>
            <input v-model="filterCatagory.name" id="productName" type="text" class="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label for="category" class="block font-medium">Category:</label>
            <select v-model="filterCatagory.category_id" id="category" class="w-full px-3 py-2 border rounded">
              <option value="0">All Categories</option>
              <option v-for="cat in catagory.data" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
          <div>
            <label for="minPrice" class="block font-medium">Min Price:</label>
            <input v-model.number="filterCatagory.min_price" id="minPrice" type="number" class="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label for="maxPrice" class="block font-medium">Max Price:</label>
            <input v-model.number="filterCatagory.max_price" id="maxPrice" type="number" class="w-full px-3 py-2 border rounded" />
          </div>
        </div>
        <button type="submit" class="mt-4 bg-[#00cebe] text-white font-semibold py-2 px-4 rounded">Filter</button>
      </form>
    </div>
    <div v-if="isPending"
         class="mx-auto size-20 border-4 border-gray-300 rounded-full border-t-amber-600 grid place-items-center animate-spin"></div>

    <div ref="productListElement" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
          v-for="product in productContainer"
          :key="product?.id"
          class="bg-white p-4 rounded-lg shadow-lg group relative flex flex-col"
      >
        <img
            :src="product?.preview_img_path"
            alt="Product Image"
            class="w-full h-40 object-cover rounded-md mb-4"
        />
        <h2 class="text-xl font-semibold">{{ product?.name }}</h2>
        <p class="text-lg font-bold mb-2 text-[#0099cc] mt-auto">Price: ${{ product?.price }}</p>
        <button
            class="absolute bottom-2 right-2 bg-[#00cebe] text-white font-semibold py-2 px-4 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            @click="addToCart(product)"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>