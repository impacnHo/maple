<template>
  <v-container>
    <v-layout row wrap v-for="item in items" :key="item.id">
      <v-flex lg2 style="border: 1px solid black;">
        <v-radio color="blue darken-3" label="全选"></v-radio>
      </v-flex>
      <v-flex lg5 style="border: 1px solid black;">
        <img class="card-img-top" src="http://pbw790ert.bkt.clouddn.com/product/142334.jpg" :alt="item.productNum">
      </v-flex>
      <v-flex lg2 style="border: 1px solid black;">{{item.stockName}}</v-flex>
      <v-flex lg2 style="border: 1px solid black;">数量</v-flex>
      <v-flex lg1 style="border: 1px solid black;">
        <v-btn outline small fab color="red" @click="remove(item.id)">
          <v-icon dark>delete</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "v-cardItem",
  props: ["productNum", "name", "subName", "stockId", "quanlity"]
};
</script>

<style scoped>
</style>
