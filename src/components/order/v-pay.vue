<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-btn small color="blue darken-3" class="white--text" slot="activator">为订单支付</v-btn>
    <v-card>
      <v-card-title class="headline">为您的订单支付 #{{id}}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-tabs centered color="white" light icons-and-text>
            <v-tabs-slider color="blue darken-3"></v-tabs-slider>
            <v-tab href="#tab-1">微信</v-tab>
            <v-tab href="#tab-2">支付宝</v-tab>
            <v-tab-item v-for="i in 2" :id="'tab-' + i" :key="i">
              <v-card flat class="text-center my-2">
                <img class="img-fluid text-center" src="http://pbw790ert.bkt.clouddn.com/index.png">
                <p>
                  总计<span class="font-weight-bold">&yen;{{total}}</span>（已包含配送费&yen;0.00）
                </p>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-3" flat @click="pay">提交</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import qs from 'qs'

  export default {
    name: "v-pay",
    props: ['id', 'total'],
    data() {
      return {
        dialog: false,
        payment: 1,
        account: 'testAccount'
      }
    },
    methods: {
      pay() {
        let me = this
        // 准备数据
        const data = {
          payment: this.payment,
          account: this.account
        }
        //准备请求
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access_token': sessionStorage.getItem('access_token')
          },
          url: this.$axios.defaults.baseURL + '/order/' + this.id,
          data: qs.stringify(data)
        }
        // 发送请求
        this.$axios(options).then(function (response) {
          if (response.data.code === 200) {
            alert('支付成功')
            me.$emit('flash')
          } else {
            console.log('认证失败');
            me.$axios.push('/login')
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>
</style>
