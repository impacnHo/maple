<template>
  <v-card>
    <v-card-text>
      <ul>
        <li v-for="(item,index) in rule" :key="index">
          {{item}}
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "v-rules",
    data() {
      return {
        rule: [
          '从到货日起计30天内，您可以为某些指定商品办理退货或换货。',
          '商品必须是全新，包装及吊牌齐全 ，而且未经穿着 。我们不会接受违规的商品。',
          '最终清货商品不可以退换 ， 商品清单请见下方。',
          '退货运费由客人承担，我们不会提供回件托运标签或运费退款。',
          '退货包裹被签收前，客人必须承担责任。因此，我们建议您采用可靠又可追踪的运输服务。',
          '如您要求换货，第二次运费将由我们负责。',
          '如您收到错误商品、瑕疵商品或发现包裹不完整，请于签收日起计7天内与我们联络，并提供您的订单号码、商品照片及其他相关详情，我们将竭诚为您解决。',
          '如有任何纠纷，TrophyRoom将保留最终的决定权。'
        ]
      }
    }
  }
</script>

<style scoped>

</style>
