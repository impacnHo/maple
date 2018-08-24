<template>
  <v-card>
    <v-card-text>
      <v-btn flat v-for="(item,index) in message" :key="index">
        <v-icon>{{item.icon}}</v-icon>
        {{item.info}}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "v-contact",
    data() {
      return {
        message: [
          {icon: 'chat', info: '在线解答'},
          {icon: 'mail', info: '电子邮件'},
          {icon: 'call', info: '电话资讯'}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
