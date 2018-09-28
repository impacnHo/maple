<template>
  <v-toolbar color="blue darken-3" dark fixed app>
    <v-toolbar-side-icon @click="toggle"></v-toolbar-side-icon>
    <!-- <router-link to="/">
      <v-avatar size="24" class="ml-1 mr-2">
        <img src="../../assets/avatar.jpg" alt="avatar.jpg">
      </v-avatar>
    </router-link> -->
    <v-toolbar-title class="index" @click="go('/')">Maple</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-flex hidden-xs-only>
      <v-text-field @keyup.enter="search()" class="mt-2" v-model="keyword" color="white" label="搜索商品" prepend-icon="search" clearable></v-text-field>
    </v-flex>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <!-- <v-btn flat @click="go('/order')">
        <v-icon>account_circle</v-icon>
        <span class="ml-2 hidden-sm-and-down">{{username}}</span>
      </v-btn> -->
      <!---->
      <v-menu offset-y bottom open-on-hover origin="center center" transition="scale-transition">
      <v-btn slot="activator" flat @click="go('/order/')">
        <v-icon>account_circle</v-icon>
        <span class="ml-2 hidden-sm-and-down">{{username}}</span>
      </v-btn>
      <v-list v-if="loginState">
        <v-list-tile @click="logout">
          <v-list-tile-title>
            <span align-center class="list-item">
              <i class="fas fa-power-off"></i>&nbsp;&nbsp;退出
            </span>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-btn flat @click="go('/user/cart')">
      <v-badge color="red darken-2">
        <span slot="badge" v-if="cartListSize>0">{{cartListSize}}</span>
        <span slot="badge" v-else-if="cookieCartSize !== undefined">{{cookieCartSize}}</span>
        <v-icon>shopping_cart</v-icon>
      </v-badge>
    </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import Bus from '../bus'
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "v-header",
    data() {
      return {
        keyword: this.$route.query.keyword,
        cookieCartSize: $.cookie('cartListSize')
      }
    },
    computed: {
      ...mapGetters(['cartListSize', 'loginState']),
      ...mapState(['username'])
    },
    methods: {
      ...mapMutations(['updateLoginState', 'updateCartList', 'updateProfile']),
      go(name) {
        this.$router.push(name)
      },
      logout() {
        // 保存购物车数量到cookie
        $.cookie('cartListSize', this.cartListSize)
        // 在sessionStorage中删除
        sessionStorage.removeItem('access_token')
        sessionStorage.removeItem('username')
        // 在vuex中删除
        this.updateLoginState(null)
        this.updateCartList(null)
        this.$router.push('/login')
      },
      toggle() {
        // 切换sideBar状态
        Bus.$emit('toggle-sidebar');
      },
      search() {
        this.$router.push({
          path: '/product/search',
          query: {
            keyword: this.keyword
          }
        })
      }
    },
    created() {
      if(this.loginState === false) {
        this.updateLoginState({
          username: sessionStorage.getItem('username'),
          token: sessionStorage.getItem('access_token')
        })
      }
    }
  }
</script>

<style scoped>
  .index:hover {
    cursor: pointer;
  }

  .list-item:hover {
    color: #1565C0;
  }
</style>
