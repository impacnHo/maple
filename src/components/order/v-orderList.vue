<template>
  <v-app>
    <v-sidebar></v-sidebar>
    <v-header></v-header>
    <v-content class="bg">
      <v-container grid-list-xl fluid>
        <v-container>
          <v-card>
            <v-container>
              <h3>我的订单</h3>
              <v-divider></v-divider>
              <v-container text-center>
                <v-container mb-5 v-for="item in items" :key="item.id" class="order">
                  <v-layout row wrap>
                    <v-flex lg12 text-left>
                      <h5>订单号：#{{item.id}}</h5>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout align-center>
                    <v-flex lg9 class="right">
                      <v-container>
                        <v-layout v-for="(subItem,index) in item.orderItems" :key="item.id + '-' +index">
                          <v-flex lg12>
                            <v-container>
                              <v-layout align-center>
                                <v-flex lg3>
                                  <img class="img-fluid" @click="getProduct(subItem.productNum)" :alt="subItem.productNum"
                                       :src="'http://pbw790ert.bkt.clouddn.com/product/' + subItem.productNum +'.jpg'">
                                </v-flex>
                                <v-flex>
                                  <p class="productName">
                                    {{subItem.name}} {{subItem.subName}}
                                  </p>
                                  <p class="sizeName">
                                    {{subItem.stockName}}
                                  </p>
                                </v-flex>
                                <v-flex>
                                  &yen; {{subItem.unitPrice}} &times {{subItem.quanlity}}
                                </v-flex>
                              </v-layout>
                            </v-container>
                            <v-divider v-if="index < item.orderItems.length-1"></v-divider>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-flex>
                    <v-flex lg3>
                      <p class="status">{{getStatus(item.status)}}</p>
                      <p>&yen; {{item.total}}.00（含配送费用0.00）</p>
                      <v-btn color="blue darken-3" class="white--text">查看详情</v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
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
    name: "v-orderList",
    components: {vHeader, vSidebar, vFoot},
    data() {
      return {
        items: []
      }
    },
    methods: {
      getData() {
        let me = this
        // 准备请求
        const options = {
          method: 'GET',
          headers: {'access_token': sessionStorage.getItem('access_token')},
          url: this.$axios.defaults.baseURL + '/order/'
        }

        // 发送请求
        this.$axios(options).then(function (response) {
          if (response.data.code === 200) {
            me.items = response.data.data
          } else {
            console.log('认证失败')
            me.$router.push('/login')
          }
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
      getProduct(productNum) {
        this.$router.push('/product/p/' + productNum)
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped>
  .bg {
    background-color: whitesmoke;
  }

  .status {
    font-weight: bold;
  }

  .productName {
    font-style: italic;
    font-size: large;
  }

  .sizeName {
    font-weight: bold;
    font-size: medium;
  }

  .order {
    border: 1px solid lightgrey;
    border-radius: 5px;
  }

  .right {
    border-right: 1px solid lightgrey;
  }

  img {
    cursor: pointer;
  }
</style>
