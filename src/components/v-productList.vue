<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-product-card v-for="item in list" :key="item.productNum" v-bind="item"></v-product-card>
    </v-layout>
    <v-pager :total="totalPages"></v-pager>
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
        // 浏览方式api、数据列表、当前页数、总页数
        api: '/product',
        list: [],
        currentPage: 1,
        totalPages: 1
      }
    },
    methods: {
      getData() {
        let me = this;
        // 获取路由中的typeName和page值
        let typeName = this.$route.params.typeName;
        let targetPage = this.$route.query.page === undefined ? 1 : this.$route.query.page;
        console.log('xxx: ' + targetPage);
        if ('all' !== typeName)
          this.api = this.api + '/' + typeName;
        // 向api发送get请求
        this.$axios.get(this.api, {
          params: {
            page: targetPage
          }
        }).then(function (response) {
          me.list = response.data.data;
          me.api = '/product';
          console.log('typeL ' + typeof  targetPage);
          me.currentPage = targetPage;
          me.totalPages = response.data.message;
        })
      }
    },
    watch: {
      '$route'(to, from) {
        this.getData()
      }
    },
    created() {
      this.getData();
    }
  }
</script>

<style scoped>

</style>
