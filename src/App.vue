<template>
  <div id="app">
    <component :is="layout" />
  </div>
</template>


<script>


import Login from './views/layouts/Login'
import UserLoading from './views/layouts/UserLoading'

import {mapGetters} from 'vuex'

export default {
    name: 'App',
    components: {
      Login, UserLoading
    },
    data: () => ({
      //
      user_loading : true,
    }),
    computed: {
      ...mapGetters(['token', 'user']), 

      layout() {
        if (this.user_loading) {
          return 'UserLoading'
        } else if (this.token == undefined) {
          return 'Login'
        } else {
          if (this.user.is_admin) {
            return 'Admin'
          } else {
            return 'User'
          }
        }
      }
    },
    async mounted() {
      try {
        await this.$store.dispatch('find_token')
      }
      catch(e) {
        console.error(e.message)
      }
      this.user_loading = false
    }
  };
</script>
