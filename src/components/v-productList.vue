<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-product-card v-for="item in list" :key="item.productNum" v-bind="item"></v-product-card>
    </v-layout>
    <v-pager></v-pager>
  </v-container>
</template>

<script>
  import vProductCard from './common/v-productCard'
  import vPager from './common/v-pager'

  export default {
    name: "v-productList",
    components: {vProductCard, vPager},
    data() {
      return {
        list: []
      }
    },
    created: function () {
      let me = this;
      let typeName = this.$route.params.typeName;
      let api = '/product';
      switch (typeName) {
        case 'sneaker':
          api += '/鞋履';
          break;
        case 'clothes':
          api += '/服装';
          break;
        case 'accessories':
          api += '/配饰';
          break;
        case 'bag':
          api += '/箱包';
          break;
        case 'glasses':
          api += '/眼镜';
          break;
        case 'life':
          api += '/生活';
          break;
        default:
          api = '/product';
      }
      console.log('api: ' + api);
      this.$axios.get(api, {
        page: 1
      }).then(function (response) {
        me.list = response.data.data;
      })
    }
  }
</script>

<style scoped>

</style>
