<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        Подготовительный тест по силуэтной стрельбе
      </v-toolbar-title>
    </v-app-bar>
    <MessagePopup />
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
import MessagePopup from './components/MessagePopup'
export default {
  name: 'App',
  components: {
    MessagePopup
  },
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
