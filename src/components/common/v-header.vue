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
      <v-text-field @keyup.enter="search" class="mt-4" v-model="keyword" color="white" label="搜索商品" prepend-icon="search" clearable></v-text-field>
    </v-flex>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat @click="go()">
        <v-icon>account_circle</v-icon>
        <span class="ml-2 hidden-sm-and-down">{{username}}</span>
      </v-btn>
      <v-btn flat @click="logout">
        <v-icon>power_settings_new</v-icon>
      </v-btn>
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
        username: '',
      }
    },
    methods: {
      getData() {
        this.username = this.$store.getters.username
      },
      go() {
        if(this.$store.getters.loginStatus === false) {
          this.$router.push('/login')
        } else {
          this.$router.push('/order/')
        }
      },
      logout() {
        // 在sessionStorage中删除
        sessionStorage.removeItem('access_token')
        sessionStorage.removeItem('username')
        // 在vuex中删除
        this.$store.dispatch('updateLoginStatus', null)
        this.$router.push('/login')
      },
      toggle() {
        // 切换sideBar状态
        Bus.$emit('toggle-sidebar');
        // console.log('点击切换')
        // this.$store.dispatch('toggleSideBarStatus')
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
      if(sessionStorage.getItem('username') && sessionStorage.getItem('access_token')) {
        this.$store.commit('loginStatus', {
          username: sessionStorage.getItem('username'),
          token: sessionStorage.getItem('access_token')
        })
      } else {
        this.$store.commit('loginStatus', null)
      }
      this.getData()
    },
    mounted() {
      let me = this
      Bus.$on('clear-keyword', function () {
        me.keyword = ''
      })
    }
  }
</script>

<style scoped>
</style>
