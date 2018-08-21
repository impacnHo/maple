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
      <v-form>
        <v-text-field @keyup.enter="search" class="mt-4" v-model="keyword" color="white" label="搜索商品" prepend-icon="search" clearable></v-text-field>
      </v-form>
    </v-flex>
    <v-spacer></v-spacer>
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
      },
      search() {

      }
    }
  }
</script>

<style scoped>

</style>
