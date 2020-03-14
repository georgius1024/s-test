<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        Базовый тест по силуэтной стрельбе
      </v-toolbar-title>
    </v-app-bar>
    <v-snackbar
      v-model="messageActive"
      :color="messageColor"
      :timeout="1000"
      top
    >
      {{ messageText }}
      <v-btn text @click="messageActive = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer dark>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }} ЮрЮрыч@Уралшутер</div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data: () => ({
    messageActive: false
  }),
  computed: {
    ...mapState(['messageText', 'messageColor'])
  },
  mounted() {
    this.$store.subscribe(mutation => {
      switch (mutation.type) {
        case 'message':
          this.messageActive = true
          break
      }
    })
  }
}
</script>
