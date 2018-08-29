<template>
    <v-list-tile-content>
      <v-list-tile-title><span class="name">{{name}}</span></v-list-tile-title>
      <v-list-tile-sub-title class="mt-2">
        <span class="address"><v-icon class="hidden-sm-and-down">local_shipping</v-icon> {{address}}</span>
        <span class="tel"><v-icon class="hidden-sm-and-down">phone</v-icon> {{tel}}</span></v-list-tile-sub-title>
    </v-list-tile-content>
</template>

<script>
  export default {
    name: "v-address",
    props: ['id', 'name', 'address', 'tel'],
    methods: {
      goUpdate(id) {
        alert(id)
      },
      delete(id) {
        alert(id)
      }
    }
  }
</script>

<style scoped>
  .name {
    font-weight: bold;
    font-size: large;
  }

  .address {
    color: black;
  }

  .tel {
    color: black;
    font-style: italic;
    font-weight: bolder;
  }
</style>
