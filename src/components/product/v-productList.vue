<template>
  <v-app>
    <v-sidebar></v-sidebar>
    <v-header></v-header>
    <v-content class="bg">
      <v-container grid-list-lg text-center>
        <v-layout row wrap v-if="this.list.length>0">
          <v-product-card class="my-2" v-for="item in list" :key="item.productNum" v-bind="item"></v-product-card>
        </v-layout>
        <v-layout row wrap v-else>
          <v-not-found></v-not-found>
        </v-layout>
        <v-pager :total="totalPages" :current="currentPage" @goPage="goPage"></v-pager>
      </v-container>
    </v-content>
    <v-foot></v-foot>
  </v-app>
</template>

<script>
  import vHeader from '../common/v-header'
  import vFoot from '../common/v-foot'
  import vSidebar from '../common/v-sidebar'
  import vProductCard from './v-productCard'
  import vPager from '../common/v-pager'
  import vNotFound from '../common/v-notFound'
import { mapState } from 'vuex';

  export default {
    name: "v-productList",
    components: {vHeader, vSidebar, vFoot, vProductCard, vPager, vNotFound},
    data() {
      return {
        // 浏览方式api、数据列表、当前页数、总页数
        list: [],
        currentPage: 1,
        totalPages: 1,
      }
    },
    computed: {
      ...mapState(['keyword'])
    },
    methods: {
      getData(pageIndex) {
        // 高亮当前请求页数
        this.currentPage = pageIndex
        // 获取路由中的typeName
        let typeName = this.$route.params.typeName
        let keyword = this.$route.query.keyword
        let api = '/product'

        // 判断是搜索还是浏览
        if (keyword !== undefined && 'search' === typeName) {
          api += '/search?keyword=' + keyword
        } else {
          if ('all' !== typeName) {
            api = api + '/' + typeName
          } else {
            api += '/all'
          }
        }

        // 发送请求
        this.$axios.get(api, {
          params: {
            page: pageIndex
          }
        }).then((response) => {
          if (response.data.data.length > 0) {
            this.list = response.data.data
          } else {
            this.list = []
          }
          this.totalPages = parseInt(response.data.message)
        }).catch((error) => {
          console.log(error)
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
