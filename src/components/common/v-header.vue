<template>
  <v-toolbar color="blue darken-3" dark fixed app>
    <v-toolbar-side-icon @click="toggle"></v-toolbar-side-icon>
    <router-link to="/">
      <v-avatar size="24">
        <img src="../../assets/avatar.jpg" alt="avatar.jpg">
      </v-avatar>
    </router-link>
    <v-toolbar-title>Trophy Room</v-toolbar-title>
    <!--<v-spacer></v-spacer>-->
    <!--<v-text-field v-model="keyword" label="搜索商品" color="white" prepend-icon="search" flat light solo clearable></v-text-field>-->
    <!--<v-spacer></v-spacer>-->
    <v-toolbar-items>
      <v-btn flat to="login">
        <v-icon>account_circle</v-icon>
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
        keyword: ''
      }
    },
    methods: {
      toggle() {
        Bus.$emit('toggle-sidebar');
      }
    }
  }
</script>

<style scoped>

</style>
