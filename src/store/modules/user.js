
export default {
    state : {
      token : undefined,
      user : {}
    },
    getters : {
      token(state) {
        return state.token
      },
      user(state) {
        return state.user
      }
    },
    mutations : {
      set_token(state, token) {
        state.token = token
        if (token == undefined) {
          localStorage.removeItem('AuthToken')
        } else {
          localStorage.setItem('AuthToken', token)  
        }
      },
      set_user(state, user) {
        state.user = user
      }
    },
    actions : {
      async set_token(ctx, token) {
        if (token != undefined) {
          await ctx.dispatch('load_user', token)
        } else {
          ctx.commit('set_user', {})
        }
  
        ctx.commit('set_token', token)
      },
      set_user(ctx, user) {
        ctx.commit('set_user', user)
      },
      async load_user(ctx, token) {
        // Загрузка данных с сервера
        let response = await ctx.dispatch('api_request', { endpoint: '/get_user', headers : { token }})
        
        ctx.commit('set_user', response) 
      },
      async find_token(ctx) {
        // Загружаем токен из локального хранилища
        let token = localStorage.getItem('AuthToken')
        if (token != undefined) {
          await ctx.dispatch('set_token', token)
        }
      }
      
    }
  }