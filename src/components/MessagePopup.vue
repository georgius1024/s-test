<template>
  <v-snackbar
    :timeout="3000"
    :top="true"
    :multi-line="true"
    :color="messageColor"
    v-model="active"
  >
    <span v-html="messageText"></span>
    <v-btn icon @click="active = false">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'MessagePopup',
  data() {
    return {
      active: false
    }
  },
  computed: {
    ...mapState(['messageText', 'messageColor'])
  },
  mounted() {
    this.$store.subscribe(mutation => {
      if (mutation.type === 'message') {
        this.active = true
      }
    })
  }
}
</script>
