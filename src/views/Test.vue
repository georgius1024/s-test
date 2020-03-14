<template>
  <v-container>
    <v-row justify="center" class="pt-5">
      <v-card width="100%">
        <v-card-title>
          <div>
            Идет тестирование: вопрос {{ position + 1 }} из {{ length }}
          </div>
        </v-card-title>
        <v-card-text>
          <QuestionText :show="current" />
          <QuestionInteraction :show="current" v-model="choice" />
        </v-card-text>
        <v-card-actions>
          <v-btn block large color="primary" @click="commit">Готово</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import QuestionText from '../components/QuestionText'
import QuestionInteraction from '../components/QuestionInteraction'
export default {
  name: 'Test',
  components: {
    QuestionText,
    QuestionInteraction
  },
  data() {
    return {
      choice: ''
    }
  },
  computed: {
    ...mapState(['test', 'position', 'score']),
    ...mapGetters(['current', 'completed']),
    length() {
      return this.test.length
    }
  },
  methods: {
    commit() {
      this.post(this.choice)
      this.next()
      this.choice = ''
      if (this.completed) {
        this.reset()
        alert(this.score)
      }
    },
    ...mapMutations(['next', 'post', 'reset'])
  }
}
</script>
