<template>
  <v-card flat>
    <v-card-title primary-title>
      <ul>
        <li class="mb-4">
          <span class="mx-2" v-for="(item,index) in tip1" :key="index"><v-icon>{{item.icon}}</v-icon> {{item.message}}</span>
        </li>
        <li class="my-4"><span class="mx-2">预计送达时间</span></li>
        <li class="my-2"><span class="mx-4">{{tip2}}</span></li>
        <li class="my-2" v-for="(item,index) in tip3" :key="index">
          <span class="mx-4"><v-icon>{{item.icon}}</v-icon>{{item.message}}</span>
        </li>
      </ul>
    </v-card-title>
  </v-card>
</template>

<script>
  export default {
    name: "v-tips",
    data() {
      return {
        tip1: [
          {icon: 'remove_red_eye', message: '新品上市'},
          {icon: 'date_range', message: '30天内退换'}
        ],
        tip2: '于18:00前提交订单，您将于3天内收到货物',
        tip3: [
          {icon: 'info', message: '此商品不参与促销活动'},
          {icon: 'info', message: '此商品不提供免费送货服务'}
        ]
      }
    }
  }
</script>

<style scoped>
  ul {
    text-align: left;
  }

  li {
    list-style-type: none;
  }
</style>
