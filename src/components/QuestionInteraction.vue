<template>
  <div v-if="show.type === '1/N'">
    <p class="subtitle-1">
      Выберите один правильный ответ
    </p>
    <v-radio-group :value="value" @change="send">
      <v-radio
        v-for="item in mixedOptions"
        :key="item.index"
        :label="item.option"
        :value="item.index"
        color="primary"
      />
    </v-radio-group>
  </div>
  <div v-else-if="show.type === 'M/N'">
    <p class="subtitle-1">
      Выберите один или несколько правильных ответов
    </p>
    <v-checkbox
      v-for="item in mixedOptions"
      :key="item.index"
      :label="item.option"
      :value="item.index"
      :input-value="checked(item.index)"
      hide-details
      color="primary"
      @change="toggle($event, item.index)"
    />
  </div>
  <div v-else-if="show.type === 'sort'">
    <p class="subtitle-1">
      Расставьте в правильном порядке
    </p>
    <draggable
      :value="sortedOptions"
      @input="sorted"
      :options="sortableOptions"
    >
      <div v-for="item in sortedOptions" :key="item.id">
        <v-list-item>
          <v-list-item-icon>
            <v-icon v-text="'mdi-menu'" class="sort-handle"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.option" />
          </v-list-item-content>
        </v-list-item>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'QuestionInteraction',
  components: {
    draggable
  },
  props: ['show', 'value'],
  computed: {
    mixedOptions() {
      return [...this.show.options]
        .map((e, index) => {
          return {
            option: e,
            index: String(index)
          }
        })
        .sort(() => Math.random() - 0.5)
    },
    sortedOptions() {
      const value = this.value
        ? this.value.split(',')
        : this.show.options.map((e, index) => index)
      return value.map(index => {
        const e = this.show.options[index]
        return {
          option: e,
          index: String(index)
        }
      })
    },
    sortableOptions() {
      return {
        handle: '.sort-handle'
      }
    }
  },
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
    sorted(list) {
      this.send(list.map(e => e.index).join(','))
    },
    send(value) {
      this.$emit('input', value)
    }
  }
}
</script>
<style scoped>
.sort-handle {
  cursor: pointer;
}
</style>
