<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <h4>其他</h4>
        <hr>
      </div>
      <v-expansion-panel class="mt-4" popout>
        <v-expansion-panel-content>
          <div slot="header">尺码对照</div>
          <v-size-table></v-size-table>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <div slot="header">退换细则</div>
          <v-rules></v-rules>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <div slot="header">其他问题</div>
          <v-contact></v-contact>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card-title>
  </v-card>
</template>

<script>
  import vSizeTable from './v-sizeTable'
  import vRules from './v-rules'
  import vContact from './v-contact'

  export default {
    name: "v-pd-right",
    components: {vSizeTable, vRules, vContact},
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
