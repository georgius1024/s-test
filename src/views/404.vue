<template>
  <v-container fill-height>
    <v-row align="center">
      <v-col
        class="text-center"
        cols="12"
        offset-md="3"
        md="6"
        offset-sm="1"
        sm="10"
      >
        <v-card>
          <v-card-title>
            <h1 class="display-3 primary--text mb-4">
              Ошибка 404
            </h1>
          </v-card-title>
          <v-card-text>
            <p class="ma-4">
              Переход по неправильному адресу
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn to="/" color="primary">
              Вернуться на главную
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
