<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-card>
        <v-card-title class="headline mb-1">
            Приветствие
        </v-card-title>
        <v-card-text>
          <p>
            Приглашаем Вас пройти этот короткий тест на знание основ правил силуэтной стрельбы
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" :to="{name: 'Test'}">
            Начать тест
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'root'
}
</script>
