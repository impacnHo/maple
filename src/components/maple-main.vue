<template>
  <v-app id="inspire">
    <!-- 左侧工具栏 -->
    <v-sidebar></v-sidebar>
    <!-- 顶部导航栏 -->
    <v-header></v-header>
    <!-- 中间内容 -->
    <v-content>
      <v-container grid-list-xl fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <!-- 底部 -->
    <v-foot></v-foot>
  </v-app>
</template>

<script>
  import vHeader from './common/v-header'
  import vFoot from './common/v-foot'
  import vSidebar from './common/v-sidebar'

  export default {
    name: "maple-header",
    components: {vHeader, vSidebar, vFoot}
  }
</script>

<style scoped>

</style>
