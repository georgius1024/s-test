<template>
  <v-container v-if="current">
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
          <v-btn
            block
            large
            color="primary"
            @click="commit"
            :disabled="!choice"
          >
            Готово
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-dialog
      v-model="outcome.show"
      max-width="80vw"
      midth="600px"
      @click:outside="seen"
    >
      <v-alert
        prominent
        tile
        :color="outcome.color"
        class="no-bottom-margin"
        @input="seen"
      >
        <v-btn icon @click="seen" class="float-right">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <h2 class="title">{{ outcome.message }}</h2>
        <div v-for="line in outcome.proof" :key="line" v-html="line" />
        <v-btn block text @click="seen">
          Закрыть
        </v-btn>
      </v-alert>
    </v-dialog>
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
      choice: '',
      outcome: {
        show: false,
        color: '',
        message: '',
        proof: []
      }
    }
  },
  computed: {
    ...mapState(['position', 'score']),
    ...mapGetters([
      'current',
      'completed',
      'defaultChoice',
      'rightChoice',
      'length'
    ])
  },
  mounted() {
    this.restore()
    this.choice = this.defaultChoice
  },
  methods: {
    commit() {
      this.post(this.choice)
      if (this.choice === this.rightChoice) {
        this.outcome.message = 'Правильно'
        this.outcome.color = 'success'
      } else {
        this.outcome.message = 'Неправильно'
        this.outcome.color = 'error'
      }
      if (Array.isArray(this.current.proof)) {
        this.outcome.proof = this.current.proof
      } else if (typeof this.current.proof === 'string') {
        this.outcome.proof = [this.current.proof]
      } else {
        this.outcome.proof = []
      }

      this.outcome.show = true
    },
    seen() {
      this.outcome.show = false
      this.next()
      this.choice = this.defaultChoice
      if (this.completed) {
        this.$router.push({ name: 'Outcome' })
      }
    },
    ...mapMutations(['next', 'post', 'reset', 'restore', 'message'])
  }
}
</script>
<style scoped>
.no-bottom-margin {
  margin-bottom: 0 !important;
}
</style>
