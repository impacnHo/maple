<template>
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
</template>

<script>
  import Bus from '../bus'

  export default {
    name: "v-sidebar",
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
        ]
      }
    },
    mounted() {
      let me = this;
      Bus.$on('toggle-sidebar', function () {
        me.drawer = !me.drawer;
      })
    }
  }
</script>

<style scoped>

</style>
