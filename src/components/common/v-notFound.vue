<template>
  <v-jumbotron>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex class="left">
          <h3 class="display-3">暂无数据</h3>
          <span class="subheading">
            抱歉，关于您输入的关键字，我们暂时查找不到对应的数据，请搜寻其他关键字或浏览商品分类。
          </span>
          <v-divider class="my-3"></v-divider>
          <v-btn class="mx-0" color="primary" large>
            返回首页
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
  export default {
    name: "v-notFound",
    methods: {
      goHome() {
        this.$router.push('/');
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
