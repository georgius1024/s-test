<template>
  <v-container>
    <v-row justify="center" class="pt-5">
      <v-col lg="4" md="6" sm="12" cols="12">
        <v-card width="100%">
          <v-card-title>Итоги тестирования </v-card-title>
          <v-card-text> Ваш результат: {{ score }} / {{ length }} </v-card-text>
          <v-card-actions>
            <TestingButton caption="Повторить тест" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import TestingButton from '../components/TestingButton'
export default {
  name: 'Outcome',
  components: {
    TestingButton
  },
  computed: {
    ...mapState(['test', 'position', 'score']),
    length() {
      return this.test.length
    }
  }
}
</script>
