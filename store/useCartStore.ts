export const useCartStore = defineStore('cartStore', () => {
        const cartItem = reactive([])
        const quantityItem = computed(() => cartItem.length)
        const totalPrice = computed(() => {
            return cartItem.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        })

    const checkoutcartItems = computed(() => {
        return cartItem.map(item => {
            return {
                product_id: item.product_id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            }
        })
    })

        const addToCart = (product) => {
            const findItem = cartItem.find(item => item.product_id === product.product_id)
            if (findItem) {
                if (findItem.quantity === product.stock) {
                    alert("out of stock")
                    return
                }
                findItem.quantity++
                return
            }
            cartItem.push(product)
        }
        const removeFromCart = (id) => {
            const findIndex = cartItem.findIndex(item => item.product_id === id)
            cartItem.splice(findIndex, 1)
        }

    const removeAllItems = () => {
        cartItem.splice(0, cartItem.length);
    }

        return {
            cartItem,
            quantityItem,
            addToCart,
            totalPrice,
            removeFromCart,
            checkoutcartItems,
            removeAllItems
        }
    },
)