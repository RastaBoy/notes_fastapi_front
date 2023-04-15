<template>
    <div id="app">
        <v-app id="inspire">
            <v-main style="background-color: rgb(250, 250, 250);">
                <v-container fluid fill-height class="justify-center items-center">
                <!-- <v-row justify="center">
                    <v-col md="4" sm="8" cols="12"> -->
                    <v-card elevation="12" width="30%" min-width="300px" height="300px" v-if="!forgot_password">
                        <v-toolbar
                        color="blue"
                        dark
                        flat
                        >
                        <v-toolbar-title >
                            Notes FastAPI
                        </v-toolbar-title>
                        </v-toolbar>
                        <div v-if="loading" class="d-flex justify-center align-center fill-height">
                        <Loader v-if="loading" />
                        </div>
                        <v-form v-else @submit.prevent="submit">
                        <v-card-text style="height: 70%;">
                            <v-text-field
                            label="E-mail"
                            persistent-placeholder
                            placeholder="Введите E-Mail"
                            prepend-icon="mdi-account"
                            type="email"
                            v-model="email"
                            color="blue"
                            required
                            ></v-text-field>
                            <v-text-field
                            label="Пароль"
                            persistent-placeholder
                            placeholder="Введите пароль"
                            prepend-icon="mdi-lock"
                            type="password"
                            v-model="password"
                            color="blue"
                            required
                            ></v-text-field>
                            <v-snackbar
                            v-model="error"
                            color="red"
                            >
                            <v-icon>mdi-alert-circle-outline</v-icon>
                            {{ error_text }}
                            </v-snackbar>
                        </v-card-text>
                        <v-card-actions class="pa-4" v-if="!loading">
                            <v-spacer/>
                            <v-btn type="submit" color="blue" dark text large>
                            Войти
                            </v-btn>
                        </v-card-actions> 
                        </v-form>
                    </v-card>
                    <!-- </v-col>
                
                </v-row> -->
                </v-container>
            </v-main>
        </v-app>
    </div>
</template>

<style scoped>

</style>


<script>

import Loader from '../../components/ui/Loader.vue'

export default {
    name: 'Login',
    data: () => ({
      email : undefined,
      password : undefined,
      loading: false,
      error : false,
      error_text: '',
      forgot_password: false
    }),
    components: {
        Loader
    },
    methods: {
      async submit() {
        this.loading = true
        // await this.$store.dispatch('set_token', '1')
        try {
          await this.$store.dispatch('login', {email : this.email, password : this.password})
        } 
        catch(e) {
          this.error = true
          this.error_text = e.message
          this.password = ''
        }
        this.loading = false
      },
      async get_mail() {
        this.loading = true
        try {
          await this.$store.dispatch('get_new_password', this.email)
        } catch(e) {
          this.error = true
          this.error_text = e.message
        }
        this.loading = false
      },
    },
    computed: {
      rules() {
        return {
          required: value => !!value || 'Необходимо заполнить'
        }
      }
    }
}
</script>
