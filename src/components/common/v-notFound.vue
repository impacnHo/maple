<template>
  <v-responsive>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex class="left">
          <h3 class="display-3">暂无数据</h3>
          <span class="subheading">
            抱歉，关于您输入的关键字，我们暂时查找不到对应的数据，请搜寻其他关键字或浏览商品分类。
          </span>
          <v-divider class="my-3"></v-divider>
          <router-link to="/">
            <v-btn class="mx-0" color="primary" large @click="clearKeyword">
              返回首页
            </v-btn>
          </router-link>
        </v-flex>
      </v-layout>
    </v-container>
  </v-responsive>
</template>

<script>
  import Bus from '../bus'
  export default {
    name: "v-notFound",
    components:{Bus},
    methods: {
      goHome() {
        this.$router.push('/')
      },
      clearKeyword() {
        Bus.$emit('clear-keyword')
      }
    }
  }
</script>

<style scoped>
  .left{
    text-align: left;
  }
  @media ( max-width: 935px) {
    h3 {
      font-size: 1.3rem;
    }
  }

  @media ( max-width: 480px) {
    h3 {
      font-size: 1.1rem;
    }
  }
</style>
