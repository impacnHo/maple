<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap v-if="hasData">
      <v-product-card v-for="item in list" :key="item.productNum" v-bind="item"></v-product-card>
    </v-layout>
    <v-layout row wrap v-else>
      <v-not-found></v-not-found>
    </v-layout>
    <v-pager :total="totalPages" :current="currentPage" @goPage="goPage"></v-pager>
  </v-container>
</template>

<script>
  import vProductCard from './common/v-productCard'
  import vPager from './common/v-pager'
  import vNotFound from './common/v-notFound'

  export default {
    name: "v-productList",
    components: {vProductCard, vPager, vNotFound},
    data() {
      return {
        // 浏览方式api、数据列表、当前页数、总页数
        api: '/product',
        list: [],
        currentPage: 1,
        totalPages: 1,
        hasData: true,
      }
    },
    methods: {
      getData(pageIndex) {
        let me = this
        this.hasData = true
        // 高亮当前请求页数
        this.currentPage = pageIndex
        // 获取路由中的typeName
        let typeName = this.$route.params.typeName
        let page = pageIndex
        let keyword = this.$route.query.keyword

        // 判断是搜索还是浏览
        if (keyword !== undefined && 'search' === typeName) {
          this.api = 'search?keyword=' + keyword
        } else {
          if ('all' !== typeName) {
            this.api = this.api + '/' + typeName
          }
        }

        // 发送请求
        this.$axios.get(this.api, {
          params: {
            page: page
          }
        }).then(function (response) {
          if (response.data.data.length > 0) {
            me.list = response.data.data
          } else {
            me.hasData = false
          }
          me.currentPage = page
          me.totalPages = response.data.message
          // 还原api，避免参数叠加
          me.api = '/product'
        })
      },
      goPage(index) {
        this.getData(index)
      }
    },
    watch: {
      // 路由变化时，初始当前页为1
      '$route'(to, from) {
        this.getData(1)
      }
    },
    created() {
      // 构建时执行getData获取商品列表，初始当前页页为1
      this.getData(1)
    }
  }
</script>

<style scoped>

</style>
