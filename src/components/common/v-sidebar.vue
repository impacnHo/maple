<template>
  <v-navigation-drawer v-model="drawer" app fixed>
    <!--<v-subheader>商品分类</v-subheader>-->
    <!--<v-divider></v-divider>-->
    <!--<v-list dense>-->
    <!--<v-list-tile v-for="(item,index) in productTypeList" :key="index" @click="view(item.typeName)">-->
    <!--<v-list-tile-content>-->
    <!--<v-list-tile-title>{{item.name}}</v-list-tile-title>-->
    <!--</v-list-tile-content>-->
    <!--</v-list-tile>-->
    <!--</v-list>-->
    <v-list>
      <v-list-group v-for="item in items" v-model="item.active" :key="item.title">
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title><span class="ml-1 mr-3"><i :class="item.action"></i></span>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click="view(subItem.to)">
          <v-list-tile-content>
            <v-list-tile-title><span class="mx-3"><i :class="subItem.action"></i></span>{{subItem.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
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
        items: [
          {
            title: '商品分类',
            action: 'fas fa-th',
            active: true,
            items: [
              {title: '所有', to: '/product/all', action: 'fas fa-globe'},
              {title: '鞋履', to: '/product/sneaker', action: 'fas fa-walking'},
              {title: '服装', to: '/product/clothes', action: 'fas fa-tshirt'},
              {title: '配饰', to: '/product/accessory', action: 'fas fa-gem'},
              {title: '箱包', to: '/product/bag', action: 'fas fa-shopping-bag'},
              {title: '眼镜', to: '/product/glasses', action: 'fas fa-glasses'},
              {title: '生活', to: '/product/life', action: 'fas fa-life-ring'}
            ]
          },
          {
            title: '我的商城',
            action: 'fas fa-leaf',
            active: false,
            items: [
              {title: '购物车', to: '/user/cart', action: 'fas fa-shopping-cart'},
              {title: '订单', to: '/user/cart', action: 'fas fa-list-ol'}
            ]
          },
          {
            title: '个人信息',
            action: 'fas fa-user',
            active: false,
            items: [
              {title: '地址簿', to: '/user/address', action: 'fas fa-map-marker-alt'},
              {title: '档案', to: '/user/profile', action: 'fas fa-pen-nib'}
            ]
          },
          {
            title: '服务中心',
            action: 'fas fa-smile-wink',
            active: false,
            items: [
              {title: '关于Maple', to: '/about', action: 'fas fa-info'},
              {title: '退换规则', to: '/about/rule', action: 'fas fa-truck'}
            ]
          }
        ]
      }
    },
    methods: {
      view(src) {
        Bus.$emit('clear-keyword');
        this.$router.push(src)
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
