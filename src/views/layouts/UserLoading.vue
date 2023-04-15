<template>
  <v-app id="inspire">
    <v-container fluid fill-height class="items-center justify-center">
      <Loader />
    </v-container>
  </v-app>
</template>

<script>
import Loader from '../../components/ui/Loader.vue'

export default {
  components:{
    Loader
  }
}
</script>