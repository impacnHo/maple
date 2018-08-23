<template>
  <v-layout row offset-sm3>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h4>描述</h4>
            <hr>
          </div>
        </v-card-title>
        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>visibility</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>品牌：{{this.brand}}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>code</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>商品编号：{{this.productNum}}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>trending_up</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>价格：{{this.price}}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>date_range</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>上市日期：{{this.launchDate}}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "v-desc",
    props: ['brand', 'productNum', 'price', 'launchDate']

  }
</script>

<style scoped>

</style>
