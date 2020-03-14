<template>
  <div>
    <h1 class="display-1">
      {{ show.question }}
    </h1>
    <v-img v-if="show.image" contain :src="show.image" height="200" />
  </div>
</template>

<script>
export default {
  name: 'QuestionTest',
  props: ['show']
}
</script>
