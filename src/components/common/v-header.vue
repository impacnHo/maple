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
      <v-btn flat @click="go('/')">
        <v-icon>account_circle</v-icon>
        <span v-if="username !== ''" class="ml-2 hidden-sm-and-down">{{username}}</span>
      </v-btn>
      <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list v-if="logged">
          <v-list-tile v-for="(item,index) in userItems" :key="index" @click="go(item.to)">
            <v-list-tile-title v-text="item.text"></v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-list v-else>
          <v-list-tile v-for="(item,index) in guestItems" :key="index" @click="logout">
            <v-list-tile-title v-text="item.text"></v-list-tile-title>
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
        guestItems: [
          {text: '登录', to: '/user/login'},
          {text: '注册', to: '/user/logup'}
        ],
        userItems: [
          {text: '注销', to: '/user/logout'},
        ]
      }
    },
    methods: {
      go(to) {
        this.$router.push(to)
      },
      logout() {
        console.log('退出')
        sessionStorage.removeItem('access_token')
        sessionStorage.removeItem('username')
        this.$router.push('/')
      },
      toggle() {
        Bus.$emit('toggle-sidebar');
      },
      search() {
        this.$router.push({
          path: 'search',
          query: {
            keyword: this.keyword
          }
        })
      }
    },
    computed: {
      username() {
        return sessionStorage.getItem('username') == null ? '' : sessionStorage.getItem('username')
      },
      logged() {
        return sessionStorage.getItem('username') == null ? false : true
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
