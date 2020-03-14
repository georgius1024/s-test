<template>
  <v-radio-group :value="value" @change="send" v-if="show.type === '1/N'">
    <v-radio
      v-for="(answer, index) in show.options"
      :key="index"
      :label="answer"
      :value="index"
    />
  </v-radio-group>
  <div v-else-if="show.type === 'M/N'">
    <v-checkbox
      v-for="(answer, index) in show.options"
      :key="index"
      :label="answer"
      :value="index"
      @change="toggle($event, index)"
    />
  </div>
</template>

<script>
export default {
  name: 'QuestionInteraction',
  props: ['show', 'value'],
  methods: {
    toggle(on, value) {
      const opts = this.value
        ? this.value.split(',').filter(e => e !== value)
        : []
      if (on) {
        this.send(opts.concat([value]).join(','))
      } else {
        this.send(opts.join(','))
      }
    },
    send(value) {
      this.$emit('input', value)
    }
  }
}
</script>
