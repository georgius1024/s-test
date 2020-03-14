<template>
  <v-btn color="primary" @click="go" block>
    {{ caption }}
  </v-btn>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'TestingButton',
  props: ['caption'],
  methods: {
    go() {
      this.reset()
      this.$router.push({ name: 'Test' })
    },
    ...mapMutations(['reset'])
  }
}
</script>
