<template>
  <v-toolbar color="blue darken-3" dark fixed app>
    <v-toolbar-side-icon @click="toggle"></v-toolbar-side-icon>
    <router-link to="/">
      <v-avatar size="24" class="ml-1 mr-2">
        <img src="../../assets/avatar.jpg" alt="avatar.jpg">
      </v-avatar>
    </router-link>
    <v-toolbar-title class="hidden-sm-and-down">Trophy Room</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-flex>
      <v-text-field @keyup.enter="search" class="mt-4" v-model="keyword" color="white" label="搜索商品"
                    prepend-icon="search" clearable></v-text-field>
    </v-flex>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat>
        <v-icon>account_circle</v-icon>
        <span class="ml-2 hidden-sm-and-down">{{username}}</span>
      </v-btn>
      <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list v-if="logged">
          <v-list-tile @click="go('/login')">
            <v-list-tile-title><i class="fas fa-sign-in-alt mr-2"></i>登录</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="go('/logup')">
            <v-list-tile-title><i class="fas fa-user-plus mr-2"></i>注册</v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-list v-else>
          <v-list-tile @click="logout">
            <v-list-tile-title><i class="fas fa-sign-out-alt mr-2"></i>注销</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import Bus from '../bus'

  export default {
    name: "v-header",
    data() {
      return {
        keyword: '',
        username: sessionStorage.getItem('username'),
      }
    },
    methods: {
      go(to) {
        this.$router.push(to)
      },
      logout() {
        sessionStorage.removeItem('access_token')
        sessionStorage.removeItem('username')
        this.$router.push('/login')
      },
      toggle() {
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
    computed: {
      logged() {
        return sessionStorage.getItem('username') == null ? true : false
      }
    },
    mounted() {
      let me = this;
      Bus.$on('clear-keyword', function () {
        me.keyword = ''
      })
    }
  }
</script>

<style scoped>

</style>
