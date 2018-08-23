<template>
  <v-container grod-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex lg12 md12 sm12 xs12>
        <v-pd-main></v-pd-main>
      </v-flex>
      <v-flex lg6 md6 sm12 xs12>
        <v-pd-left></v-pd-left>
      </v-flex>
      <v-flex lg6 md6 sm12 xs12>
        <v-pd-right></v-pd-right>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import vPdLeft from './product/v-pd-left'
  import vPdRight from './product/v-pd-right'
  import vPdMain from './product/v-product'

  export default {
    name: "v-productDetail",
    components: {vPdLeft, vPdRight, vPdMain},
    data() {
      return {
        item: {
          brand: 'nike',
          productNum: 'test',
          price: '$99',
          launchDate: '2018'
        }
      }
    }
  }
</script>

<style scoped>

</style>
