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
              <!---->
              <v-container text-center>
                <v-divider></v-divider>
                <v-tabs v-model="active" color="white" light slider-color="blue darken-3">
                  <v-tab v-for="item in orderViewRule" :key="item.id" ripple @click="updateOrderViewRule(item.id)">
                    &nbsp;&nbsp;{{item.name}}&nbsp;&nbsp;
                  </v-tab>
                </v-tabs>
                <div v-if="getItemSize > 0" class="mt-3">
                  <v-container mb-5 v-for="item in items" :key="item.id" class="order">
                    <v-layout row wrap align-center class="order" style="background-color: whitesmoke;border: none;">
                      <v-flex lg6 text-left>
                        <h5>订单号：<span class="font-weight-bold">#{{item.id}}</span></h5>
                      </v-flex>
                      <v-flex lg6 text-right>
                        <h6>创建时间：<span class="font-weight-bold">{{getTime(item.createTime)}}</span></h6>
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
                                  <img class="img-fluid" @click="getProduct(subItem.productNum)"
                                       :alt="subItem.productNum"
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
                                  &yen; {{subItem.unitPrice}} &times; {{subItem.quanlity}}
                                </v-flex>
                              </v-layout>
                            </v-container>
                            <v-divider v-if="index < item.orderItems.length-1"></v-divider>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-flex>
                    <v-flex lg3>
                      <p class="font-weight-bold">{{getStatus(item.status)}}</p>
                      <p class="font-weight-bold">&yen; {{item.total}}.00（含配送费用0.00）</p>
                      <p @click="goDatail(item.id)" style="cursor: pointer;">查看详情</p>
                      <!---->
                      <v-dialog v-if="item.status === 0 || item.status === 2" v-model="dialog" width="500px">
                        <v-btn small flat slot="activator">取消订单</v-btn>
                        <v-card>
                          <v-card-title class="headline grey lighten-3">取消订单 - #{{item.id}}</v-card-title>
                          <v-card-text>
                            <p class="font-weight-bold">
                              当前订单状态为【{{getStatus(item.status)}}】，请确认是否取消订单？
                            </p>
                          </v-card-text>
                          <v-divider></v-divider>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat @click="cancelOrder(item.id)">确认</v-btn>
                            <v-btn flat color="blue darken-3" @click="dialog = false">取消</v-btn>
                          </v-card-actions>
                          <v-progress-linear v-if="progress" :indeterminate="true"></v-progress-linear>
                        </v-card>
                      </v-dialog>
                      <!---->
                      <br>
                      <v-pay v-on:flash="getData(currentPage)" v-if="item.status === 0" v-bind:id="item.id"
                             v-bind:total="item.total"></v-pay>
                    </v-flex>
                   </v-layout>
                  </v-container>
                </div>
                <div v-else class="mt-3">
                  <v-no-data></v-no-data>
                </div>
              </v-container>
              <!---->
            </v-container>
          </v-card>
        </v-container>
      </v-container>
      <v-pager v-if="getItemSize > 0" :total="totalPages" :current="currentPage" @goPage="goPage"></v-pager>
    </v-content>
    <v-foot></v-foot>
  </v-app>
</template>

<script>
  import vHeader from '../common/v-header'
  import vFoot from '../common/v-foot'
  import vSidebar from '../common/v-sidebar'
  import vPager from '../common/v-pager'
  import vPay from './v-pay'
  import vNoData from '../common/v-noData.vue'
  import {mapState, mapMutations, mapGetters} from 'vuex'

  export default {
    name: "v-orderList",
    components: {vHeader, vSidebar, vFoot, vPager, vPay, vNoData},
    data() {
      return {
        dialog: false,
        progress: false,
        active: -1,
        items: [],
        currentPage: 1,
        totalPages: 1
      }
    },
    computed: {
      ...mapState(['orderViewRule']),
      ...mapGetters(['getCurrentOrderViewRule']),
      getItemSize() {
        return this.items.length
      }
    },
    methods: {
      ...mapMutations(['updateOrderViewRule']),
      cancelOrder(id) {
        this.progress = true

        // 准备请求
        const options = {
          method: 'DELETE',
          headers: {'access_token': sessionStorage.getItem('access_token')},
          url: this.$axios.defaults.baseURL + '/order/' + id
        }

        // 发送请求
        this.$axios(options).then(response => {
          if(response.data.code === 200) {
            this.progress = false
            this.dialog = false
            this.getData(1, -1)
          } else {
            alert('认证失败')
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getData(pageIndex, status) {
        this.currentPage = pageIndex

        // 准备请求
        const options = {
          method: 'GET',
          headers: {'access_token': sessionStorage.getItem('access_token')},
          params: {
            page: pageIndex,
            status: status
          },
          url: this.$axios.defaults.baseURL + '/order/'
        }

        // 发送请求
        this.$axios(options).then(response => {
          if (response.data.code === 200) {
            this.items = response.data.data
            this.totalPages = parseInt(response.data.message)
          } else {
            console.log('认证失败')
          }
        }).catch(error => {
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
      goPage(index) {
        this.getData(index)
      },
      getProduct(productNum) {
        this.$router.push('/product/p/' + productNum)
      },
      getTime(ms) {
        // toLocaleString
        return new Date(ms).toLocaleString()
      },
      goDatail(id) {
        this.$router.push('/order/' + id)
      },
      pay(id) {
        this.$router.push('/order/pay/' + id)
      }
    },
    watch: {
      active: function() {
        this.getData(1, this.getCurrentOrderViewRule[0].id)
      }
    },
    created() {
      this.getData(1, -1)
    }
  }
</script>

<style scoped>
  .bg {
    background-color: whitesmoke;
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

  img:hover {
    cursor: pointer;
  }
</style>
