<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-product-card v-for="item in list" :key="item.productNum" v-bind="item"></v-product-card>
    </v-layout>
    <v-pager :total="totalPages" :current="currentPage" @goPage="goPage"></v-pager>
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
      getData(pageIndex) {
        let me = this;
        // 高亮当前请求页数
        this.currentPage = pageIndex;
        // 获取路由中的typeName
        let typeName = this.$route.params.typeName;
        let page = pageIndex;

        if ('all' !== typeName) {
          this.api = this.api + '/' + typeName;
        }

        this.$axios.get(this.api, {
          params: {
            page: page
          }
        }).then(function (response) {
          me.list = response.data.data;
          me.currentPage = page;
          me.totalPages = response.data.message;
          // 还原api，避免参数叠加
          me.api = '/product';
        })
      },
      goPage(index) {
        this.getData(index);
      }
    },
    watch: {
      // 路由变化时，初始当前页为1
      '$route'(to, from) {
        this.getData(1);
      }
    },
    created() {
      // 构建时执行getData获取商品列表，初始当前页页为1
      this.getData(1);
    }
  }
</script>

<style scoped>

</style>
