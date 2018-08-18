<template>
  <v-app id="inspire">
    <!-- 左侧工具栏 -->
    <v-navigation-drawer v-model="drawer" app fixed>
      <v-subheader>商品分类</v-subheader>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-tile v-for="(item,index) in productTypeList" :key="index" :to="item.src">
          <v-list-tile-content>
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!-- 顶部导航栏 -->
    <v-toolbar color="blue darken-3" dark fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <router-link to="/">
        <v-avatar size="24">
          <img src="../assets/avatar.jpg" alt="avatar.jpg">
        </v-avatar>
      </router-link>
      <v-toolbar-title>Trophy Room</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="login">
          <v-icon>account_circle</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- 中间内容 -->
    <v-content>
      <v-container grid-list-xl fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <!-- 底部 -->
    <v-footer color="blue darken-3">
      <v-spacer></v-spacer>
      <p class="white--text my-4">Made By @ GorillA</p>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: "maple-header",
    data() {
      return {
        drawer: false,
        productTypeList: [
          {name: '所有', src: 'all'},
          {name: '鞋履', src: 'sneaker'},
          {name: '服装', src: 'clothes'},
          {name: '配饰', src: 'accessories'},
          {name: '箱包', src: 'bag'},
          {name: '眼镜', src: 'glasses'},
          {name: '生活', src: 'life'}
        ],
        expandList: [
          {icon: 'star', content: '收藏', src: 'baidu.com'},
          {icon: 'bug_report', content: '发现漏洞', src: 'qq.com'}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
