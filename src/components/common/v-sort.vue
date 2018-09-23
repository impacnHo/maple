<template>
    <v-menu offset-y bottom origin="center center" transition="scale-transition">
      <v-btn slot="activator" color="blue darken-2" dark round outline>
        <v-icon>{{this.getCurrentProductSortRule[0].icon}}</v-icon>{{this.getCurrentProductSortRule[0].name}}
      </v-btn>
      <v-list>
        <v-list-tile v-for="item in getOtherProductSortRule" :key="item.id" @click="updateProductSortRule(item.id)">
          <v-list-tile-title>{{item.name}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'

export default {
    computed: {
        ...mapGetters(['getCurrentProductSortRule','getOtherProductSortRule'])
    },
    methods: {
        ...mapMutations(['updateProductSortRule'])
    }
}
</script>
<style scoped>
</style>

