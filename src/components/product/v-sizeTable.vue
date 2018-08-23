<template>
  <table class="table text-center table-hover table-sm">
    <thead>
    <tr>
      <th v-for="item in headers">{{item}}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in size">
      <td>{{item.us}}</td>
      <td>{{item.eu}}</td>
      <td>{{item.uk}}</td>
      <td>{{item.cm}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "v-table",
    props:['headers','items']
  }
</script>

<style scoped>

</style>
