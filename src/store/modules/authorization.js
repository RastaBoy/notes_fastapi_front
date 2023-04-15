export default {
    actions: {
      async login({dispatch}, { email, password }) {
        let response = await dispatch('api_request', {
          endpoint : '/login',
          body : {
            email, password
          }
        })
        await dispatch('set_token', response.token)
      },
      async logout({dispatch}) {
        await dispatch('api_request', {
          endpoint: '/logout'
        })
        await dispatch('set_token', undefined)
      },
    }
  }