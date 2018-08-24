<template>
    <v-container>
      <h6 class="font-weight-light">{{brandName}}</h6>
      <h4 class="font-italic">{{name}} {{subName}}</h4>
      <h6><span class="badge badge-dark">CNY</span> {{price}}</h6>
    </v-container>
</template>

<script>
  export default {
    name: "v-oprt-top",
    props: ['brandName', 'name', 'subName', 'price']
  }
</script>

<style scoped>
</style>
