<template>
  <v-navigation-drawer v-model="drawer" app fixed>
    <v-subheader>商品分类</v-subheader>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-tile v-for="(item,index) in productTypeList" :key="index" @click="view(item.typeName)">
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
          {name: '所有', typeName: '/all'},
          {name: '鞋履', typeName: '/sneaker'},
          {name: '服装', typeName: '/clothes'},
          {name: '配饰', typeName: '/accessory'},
          {name: '箱包', typeName: '/bag'},
          {name: '眼镜', typeName: '/glasses'},
          {name: '生活', typeName: '/life'}
        ]
      }
    },
    methods: {
      view(typeName) {
        Bus.$emit('clear-keyword');
        this.$router.push({path: typeName})
      }
    },
    mounted() {
      let me = this;
      Bus.$on('toggle-sidebar', function () {
        me.drawer = !me.drawer
      })
    }
  }
</script>

<style scoped>

</style>
