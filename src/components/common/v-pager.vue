<template>
  <div class="text-xs-center">
    <v-card class="bg" flat>
      <v-card-text @click="view()">
        <v-pagination v-model="page" :length="total"></v-pagination>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: "v-pager",
    props: ['total', 'current'],
    data() {
      return {
        page: 1
      }
    },
    methods: {
      view() {
        this.$emit('goPage', this.page)
      }
    },
    watch: {
      // 统一父组件传入参数与data
      current: function () {
        this.page = this.current
      }
    }
  }
</script>

<style scoped>
  .bg {
    background-color: whitesmoke;
  }
</style>
