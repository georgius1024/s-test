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
      :value="String(index)"
      :input-value="checked(index)"
      @change="toggle($event, index)"
    />
  </div>
</template>

<script>
export default {
  name: 'QuestionInteraction',
  props: ['show', 'value'],
  methods: {
    checked(value) {
      return this.value.split(',').find(e => e === String(value))
    },
    toggle(on, value) {
      const opts = this.value
        ? this.value.split(',').filter(e => e !== String(value))
        : []
      if (on) {
        this.send(
          opts
            .concat([value])
            .sort()
            .join(',')
        )
      } else {
        this.send(opts.sort().join(','))
      }
    },
    send(value) {
      this.$emit('input', value)
    }
  }
}
</script>
