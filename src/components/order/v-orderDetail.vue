<template>
  <v-app>
    <v-sidebar></v-sidebar>
    <v-header></v-header>
    <v-content class="bg">
      <v-container grid-list-xl fluid>
        <v-container>
          <v-card>
            <v-container>
              <h3>订单详情 - #{{item.id}}</h3>
              <v-divider></v-divider>
              <v-container>
                <h4>订单状态</h4>
                <v-card flat class="mydiv">
                  <v-container text-left>
                    <v-layout row wrap align-center>
                      <v-flex lg6 md6 sm12 xs12>
                        订单状态：<span class="font-weight-bold">{{getStatus(item.status)}}</span>
                        <v-btn v-if="item.status === 0" small color="blue darken-3" class="white--text" @click="pay(item.id)">为订单支付</v-btn>
                      </v-flex>
                      <v-flex lg6 md6 sm12 xs12>
                        创建时间：<span class="font-weight-bold">{{getTime(item.createTime)}}</span>
                      </v-flex>
                      <v-flex lg6 md6 sm12 xs12>
                        支付方式：<span class="font-weight-bold">{{getPayment(item.payment)}}</span>
                      </v-flex>
                      <v-flex lg6 md6 sm12 xs12>
                        支付账户：
                        <span class="font-weight-bold" v-if="item.account == null">-</span>
                        <span class="font-weight-bold" v-else>{{item.account}}</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-container>
              <v-container>
                <h4>配送信息</h4>
                <v-card flat class="mydiv">
                  <v-container text-left>
                    <v-layout row wrap align-center>
                      <v-flex lg12>
                        <ul>
                          <li><span class="font-weight-bold">收货人：</span>{{item.name}}</li>
                          <li><span class="font-weight-bold">收货地址：</span>{{item.address}}</li>
                          <li><span class="font-weight-bold">联系电话：</span>{{item.tel}}</li>
                        </ul>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-container>
              <v-container>
                <h4>订单商品</h4>
                <v-card flat class="mydiv">
                  <v-container text-center>
                    <v-layout>
                      <v-flex lg6 md3 sm3 xs3>商品</v-flex>
                      <v-flex lg2 md3 sm3 xs3>属性</v-flex>
                      <v-flex lg2 md3 sm3 xs3>数量</v-flex>
                      <v-flex lg2 md3 sm3 xs3>单价</v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout class="mylayout" v-for="orderItem in item.orderItemDTOS" :key="orderItem.id" row wrap align-center>
                      <v-flex lg2 md2 sm2 xs2>
                        <img class="img-fluid" @click="getProduct(orderItem.productNum)"
                             :src="'http://pbw790ert.bkt.clouddn.com/product/' + orderItem.productNum +'.jpg'">
                      </v-flex>
                      <v-flex lg4 md4 sm4 xs4>
                        <span class="productName">{{orderItem.name}} {{orderItem.subName}}</span>
                      </v-flex>
                      <v-flex lg2 md2 sm2 xs2>
                        <span class="sizeName">{{orderItem.stockName}}</span>
                      </v-flex>
                      <v-flex lg2 md2 sm2 xs2>
                        <span class="sizeName">{{orderItem.quanlity}}</span>
                      </v-flex>
                      <v-flex lg2 md2 sm2 xs2>
                        <span class="unitPrice">&yen;{{orderItem.unitPrice}}</span>
                      </v-flex>
                    </v-layout>
                    <v-layout text-right>
                      <v-flex lg12 md12 sm12 xs12>
                        <h6 class="checkOutInfo">支付金额： &yen;{{item.total}}.00（已包含配送费用）</h6>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-container>
            </v-container>
          </v-card>
        </v-container>
      </v-container>
    </v-content>
    <v-foot></v-foot>
  </v-app>
</template>

<script>
  import vHeader from '../common/v-header'
  import vFoot from '../common/v-foot'
  import vSidebar from '../common/v-sidebar'

  export default {
    name: "v-orderDetail",
    components: {vHeader, vSidebar, vFoot},
    data() {
      return {
        item:[]
      }
    },
    methods: {
      getData() {
        // 获取订单号
        let id = this.$route.params.id
        let me = this

        // 准备请求
        const options = {
          method: 'GET',
          headers: {'access_token':sessionStorage.getItem('access_token')},
          url: this.$axios.defaults.baseURL + '/order/' + id
        }

        // 发送请求
        this.$axios(options).then(function (response) {
          if(response.data.code === 200) {
            me.item = response.data.data
          } else {
            console.log('认证失败')
            me.$router.push('/login')
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      getStatus(code) {
        let status
        switch (code) {
          case 0:
            status = '待付款'
            break
          case 1:
            status = '已取消'
            break
          case 2:
            status = '待发货'
            break
          case 3:
            status = '已发货'
            break
          case 4:
            status = '待确认'
            break
          case 5:
            status = '交易完成'
            break
          default:
            status = '未知状态：' + code
        }
        return status
      },
      getPayment(type) {
        if(type === 1)
          return '微信'
        else if(type === 2)
          return '支付宝'
        else
          return '-'
      },
      getProduct(productNum) {
        this.$router.push('/product/p/' + productNum)
      },
      getTime(ms) {
        // toLocaleString
        return new Date(ms).toLocaleString()
      },
      pay(id) {
        this.$router.push('/order/pay/' + id)
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped>
  .bg{
    background-color: whitesmoke;
  }

  .mydiv {
    border: 1px solid lightgrey;
    border-radius: 5px;
  }

  .mylayout {
    border-bottom: 1px solid lightgrey;
  }

  .checkOutInfo {
    color: red;
  }

  img:hover {
    cursor: pointer;
  }
</style>
