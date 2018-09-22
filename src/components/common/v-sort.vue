<template>
    <v-menu offset-y bottom origin="center center" transition="scale-transition">
      <v-btn slot="activator" color="blue darken-2" dark round outline>
        <v-icon>{{this.getCurrentOrderRule[0].icon}}</v-icon>{{this.getCurrentOrderRule[0].name}}
      </v-btn>
      <v-list>
        <v-list-tile v-for="item in getOtherOrderRule" :key="item.id" @click="updateOrderRule(item.id)">
          <v-list-tile-title>{{item.name}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'

export default {
    computed: {
        ...mapGetters(['getCurrentOrderRule','getOtherOrderRule'])
    },
    methods: {
        ...mapMutations(['updateOrderRule'])
    }
}
</script>
<style scoped>
</style>

