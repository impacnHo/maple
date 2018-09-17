<template>
  <v-card>
    <v-card-text>
      <table class="table text-center table-hover table-sm">
        <thead>
        <tr>
          <th v-for="item in headers" :key="item.index">{{item}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in size" :key="item.index">
          <td>{{item.us}}</td>
          <td>{{item.eu}}</td>
          <td>{{item.uk}}</td>
          <td>{{item.cm}}</td>
        </tr>
        </tbody>
      </table>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "v-table",
    data() {
      return {
        headers: ['US', 'EU', 'UK', 'CM'],
        size: [
          {us: 7, eu: 40, uk: 6, cm: 25},
          {us: 7.5, eu: 40.5, uk: 6.5, cm: 25.5},
          {us: 8, eu: 41, uk: 7, cm: 26},
          {us: 8.5, eu: 42, uk: 7.5, cm: 26.5},
          {us: 9, eu: 42.5, uk: 8, cm: 27},
          {us: 9.5, eu: 43, uk: 8.5, cm: 27.5},
          {us: 10, eu: 44, uk: 9, cm: 28},
          {us: 10.5, eu: 44.5, uk: 9.5, cm: 28.5},
          {us: 11, eu: 45, uk: 10, cm: 29},
          {us: 12, eu: 46, uk: 11, cm: 30},
        ]
      }
    }
  }
</script>

<style scoped>

</style>
