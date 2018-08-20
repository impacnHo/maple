<template>
  <div class="text-xs-center">
    <v-card class="bg" flat>
      <v-card-text>
        <v-pagination
          v-model="page"
          :length="15"
        ></v-pagination>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: "v-pager",
    data() {
      return {
        page: 2
      }
    }
  }
</script>

<style scoped>
  .bg{
    background-color: whitesmoke;
  }
</style>
