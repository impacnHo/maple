<template>
  <div class="text-xs-center">
    <v-card class="bg" flat>
      <v-card-text @click="view">
        <v-pagination v-model="page" :length="total"></v-pagination>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: "v-pager",
    props: ['total', 'typeName'],
    data() {
      return {
        page: 1
      }
    },
    methods: {
      view() {
        let api = '/product';
        this.$router.push({path: this.api, query: {page: this.page}});
      }
    },
    watch: {
      '$route'(to,from) {
        this.page = to.query.page;
      }
    }
  }
</script>

<style scoped>
  .bg {
    background-color: whitesmoke;
  }
</style>
