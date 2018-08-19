<template>
  <v-flex lg6 md4 sm12>
    <v-parallax :src="this.poster">
      <v-layout align-center column justify-center>
        <h1 class="slogen">{{this.slogen}}</h1>
        <v-btn outline large color="white" class="btn-content" :to="this.to">选购{{this.type}}</v-btn>
      </v-layout>
    </v-parallax>
  </v-flex>
</template>

<script>
  export default {
    name: "v-banner",
    props: ['poster', 'slogen', 'to', 'type']
  }
</script>

<style scoped>
  .slogen {
    text-align: center;
    font-family: "Times New Roman";
    font-weight: inherit;
  }
</style>
