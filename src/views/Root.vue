<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-card>
        <v-card-title class="headline mb-1">
          Приветствие
        </v-card-title>
        <v-card-text>
          <p>
            Приглашаем Вас пройти этот короткий тест на знание основ правил
            силуэтной стрельбы
          </p>
        </v-card-text>
        <v-card-actions>
          <TestingButton caption="Начать тест" />
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import TestingButton from '../components/TestingButton'
export default {
  name: 'root',
  components: {
    TestingButton
  }
}
</script>
