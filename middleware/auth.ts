export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie('token').value
    if(token) {
        try {
            const res = await $fetch('http://152.42.240.131/api/v1/user', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            return to.path = '/login'
        }
    } else {
        return to.path = '/login'
    }
})