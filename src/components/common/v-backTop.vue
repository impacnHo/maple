<template>
    <v-btn id="mybtn" fab color="red darken-2" dark small @click="go()">
        <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
</template>

<script>
    export default {
        methods: {
            go() {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
            }
        }
    }
</script>

<style scoped>
    #mybtn {
        position: fixed;
        right: 1.5rem;
        bottom: 1.5rem;
        z-index: 99;
    }
</style>
